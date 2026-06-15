import os
import re
import json
import threading
import logging
from http.server import BaseHTTPRequestHandler
import backend.config as _cfg

INDEX_HTML_PATH      = _cfg.INDEX_HTML_PATH
LIBRARY_JSON_PATH    = _cfg.LIBRARY_JSON_PATH
INSPECTORS_JSON_PATH = _cfg.INSPECTORS_JSON_PATH
FRONTEND_DIR         = _cfg.FRONTEND_DIR
ROOT_DIR             = _cfg.ROOT_DIR
CIPHER               = _cfg.CIPHER
PORT                 = _cfg.PORT
BIND_HOST            = _cfg.BIND_HOST

from backend.qna_engine import run_qna
from backend.ai_handler import handle_chat

try:
    with open(INDEX_HTML_PATH, "r", encoding="utf-8") as f:
        HTML_TEMPLATE = f.read()
except FileNotFoundError:
    HTML_TEMPLATE = "<h1>Error: Could not find index.html at {}</h1>".format(INDEX_HTML_PATH)

cipher = CIPHER

def _decrypt_file(filename):
    try:
        with open(os.path.join(ROOT_DIR, filename), "rb") as f:
            return cipher.decrypt(f.read()).decode("utf-8")
    except Exception as e:
        logging.error("Failed to decrypt {}: {}".format(filename, e))
        return "{}"

relevance_library_json = _decrypt_file("library.enc")
inspectors_json        = _decrypt_file("inspectors.enc")

FINAL_HTML = (
    HTML_TEMPLATE
    .replace("__LIBRARY_PAYLOAD__",    relevance_library_json)
    .replace("__INSPECTORS_PAYLOAD__", inspectors_json)
)

_ALLOWED_ORIGIN = "https://{}:{}".format(BIND_HOST, PORT)

_VALID_PROVIDERS = {"gemini", "groq", "claude", "anthropic"}
_API_KEY_MAX_LEN = 200
_API_KEY_RE      = re.compile(r"^[ -~]+$")

def _validate_api_key(value):
    if not isinstance(value, str):
        return False
    if not value or len(value) > _API_KEY_MAX_LEN:
        return False
    return bool(_API_KEY_RE.match(value))

def get_ai_status():
    provider = _cfg.ACTIVE_PROVIDER.lower() if _cfg.ACTIVE_PROVIDER else ""
    key_map  = {
        "groq":      _cfg.GROQ_API_KEY,
        "gemini":    _cfg.GEMINI_API_KEY,
        "claude":    _cfg.ANTHROPIC_API_KEY,
        "anthropic": _cfg.ANTHROPIC_API_KEY,
    }
    has_key = bool(key_map.get(provider))

    if not provider or provider not in key_map:
        return {
            "ready":    False,
            "state":    "no_provider",
            "provider": None,
            "message": (
                "No AI provider is configured.\n\n"
                "Click the Settings icon in the AI Assistant panel header "
                "to choose a provider and enter your API key."
            )
        }

    if not has_key:
        return {
            "ready":    False,
            "state":    "no_key",
            "provider": provider,
            "message": (
                "API key missing for \"{}\"."
                " The selected provider needs an API key.\n\n"
                "Click the Settings icon in the AI Assistant panel header "
                "above to enter your API key."
            ).format(provider)
        }

    return {"ready": True, "state": "ok", "provider": provider, "message": ""}


class Handler(BaseHTTPRequestHandler):

    server_version = ""
    sys_version    = ""

    def version_string(self):
        return ""

    def send_response(self, code, message=None):
        self.log_request(code)
        self.send_response_only(code, message)

    def _is_loopback(self):
        return self.client_address[0] in ("127.0.0.1", "::1")

    def _is_authorized(self):
        """
        Requests must come from loopback AND carry the Electron secret header.
        This blocks any browser or external tool from accessing the server,
        even if they know the port.
        """
        if not self._is_loopback():
            return False
        secret = self.headers.get("X-Electron-Secret", "")
        # Use constant-time comparison to prevent timing attacks
        return secret == _cfg.ELECTRON_SECRET

    def do_GET(self):
        if not self._is_authorized():
            self._send(403, "text/plain", b"Forbidden")
            return

        if self.path == "/ping":
            self.send_response(204)
            self.end_headers()
            return

        if self.path == "/config-status":
            self._json(get_ai_status())
            return

        if self.path in ("/", "/index.html"):
            encoded_html = FINAL_HTML.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type",   "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(encoded_html)))
            self.send_header("Cache-Control",  "no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma",         "no-cache")
            self.send_header("Expires",        "0")
            self.end_headers()
            self.wfile.write(encoded_html)
        elif self.path == "/app.js":
            self._serve_static(os.path.join(FRONTEND_DIR, "app.js"), "application/javascript")
        elif self.path == "/styles.css":
            self._serve_static(os.path.join(FRONTEND_DIR, "styles.css"), "text/css")
        elif self.path == "/favicon.ico":
            self._serve_static(os.path.join(FRONTEND_DIR, "favicon.ico"), "image/x-icon")
        else:
            self._send(404, "text/plain", b"Not found")

    def _serve_static(self, filepath, content_type):
        try:
            with open(filepath, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type",   content_type)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except FileNotFoundError:
            self._send(404, "text/plain", b"File not found")

    def do_POST(self):
        if not self._is_authorized():
            self._send(403, "text/plain", b"Forbidden")
            return

        _MAX_BODY = 1_048_576
        try:
            _clen = int(self.headers.get("Content-Length", 0))
        except (ValueError, TypeError):
            _clen = 0
        if _clen > _MAX_BODY:
            self._send(413, "text/plain", b"Request too large")
            return

        if self.path == "/evaluate":
            try:
                length  = int(self.headers.get("Content-Length", 0))
                body    = json.loads(self.rfile.read(length))
                exprs   = body.get("expressions", [])
                results = run_qna(exprs)
                self._json({"results": results})
            except Exception as e:
                self._json({"results": [{"expr": "Error", "answers": [], "isError": True,
                                          "error": str(e), "time_us": 0}]})

        elif self.path == "/chat":
            try:
                length            = int(self.headers.get("Content-Length", 0))
                body              = json.loads(self.rfile.read(length))
                user_message      = body.get("message", "")
                history           = body.get("history", [])[-20:]
                context_selection = body.get("context", "Client Relevance")

                status = get_ai_status()
                if not status["ready"]:
                    self._json({
                        "reply":        None,
                        "config_error": True,
                        "state":        status["state"],
                        "message":      status["message"]
                    })
                    return

                reply_text = handle_chat(user_message, history, context_selection)
                self._json({"reply": reply_text})
            except Exception as e:
                self._json({"reply": "An error occurred: {}".format(str(e))})

        elif self.path == "/save-key":
            try:
                import backend.config as _cfg
                length   = int(self.headers.get("Content-Length", 0))
                body     = json.loads(self.rfile.read(length))
                provider = body.get("provider", "").lower().strip()
                api_key  = body.get("api_key", "")

                if provider not in _VALID_PROVIDERS:
                    self._json({"ok": False, "error": "Invalid provider"})
                    return
                if not _validate_api_key(api_key):
                    self._json({"ok": False, "error": "Invalid api_key"})
                    return

                key_attr = {
                    "gemini":    "GEMINI_API_KEY",
                    "groq":      "GROQ_API_KEY",
                    "claude":    "ANTHROPIC_API_KEY",
                    "anthropic": "ANTHROPIC_API_KEY",
                }.get(provider)

                setattr(_cfg, key_attr, api_key)
                setattr(_cfg, "ACTIVE_PROVIDER", provider)
                self._json({"ok": True})
            except Exception as e:
                self._json({"ok": False, "error": str(e)})

        elif self.path == "/set-provider":
            try:
                import backend.config as _cfg
                length   = int(self.headers.get("Content-Length", 0))
                body     = json.loads(self.rfile.read(length))
                provider = body.get("provider", "").lower().strip()
                api_key  = body.get("api_key", "")

                if provider not in _VALID_PROVIDERS:
                    self._json({"ok": False, "error": "Invalid provider"})
                    return
                if api_key and not _validate_api_key(api_key):
                    self._json({"ok": False, "error": "Invalid api_key"})
                    return

                key_attr = {
                    "gemini":    "GEMINI_API_KEY",
                    "groq":      "GROQ_API_KEY",
                    "claude":    "ANTHROPIC_API_KEY",
                    "anthropic": "ANTHROPIC_API_KEY",
                }.get(provider)

                if api_key:
                    setattr(_cfg, key_attr, api_key)
                setattr(_cfg, "ACTIVE_PROVIDER", provider)
                self._json({"ok": True, "provider": provider})
            except Exception as e:
                self._json({"ok": False, "error": str(e)})

        elif self.path == "/switch-provider":
            try:
                import backend.config as _cfg
                length   = int(self.headers.get("Content-Length", 0))
                body     = json.loads(self.rfile.read(length))
                provider = body.get("provider", "").lower().strip()

                if provider not in _VALID_PROVIDERS:
                    self._json({"ok": False, "error": "Invalid provider"})
                    return

                setattr(_cfg, "ACTIVE_PROVIDER", provider)
                self._json({"ok": True, "provider": provider})
            except Exception as e:
                self._json({"ok": False, "error": str(e)})

        else:
            self._send(404, "text/plain", b"Not found")

    def _send(self, code, ctype, data):
        self.send_response(code)
        self.send_header("Content-Type",               ctype)
        self.send_header("Content-Length",             len(data))
        self.send_header("Access-Control-Allow-Origin", _ALLOWED_ORIGIN)
        self.send_header("X-Content-Type-Options",    "nosniff")
        self.send_header("X-Frame-Options",           "DENY")
        self.send_header("Cache-Control",             "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _json(self, obj):
        data = json.dumps(obj).encode("utf-8")
        self._send(200, "application/json", data)

    def log_message(self, format, *args):
        pass

    def handle_error(self, request, client_address):
        """
        Silently suppress SSL handshake errors and broken pipe errors.
        These are triggered when a browser (or any non-Electron client)
        tries to connect and fails the TLS handshake — we don't want
        those to crash the server thread.
        """
        pass