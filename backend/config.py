import os
import sys
import json
import secrets
import logging
from cryptography.fernet import Fernet
from pathlib import Path

if getattr(sys, 'frozen', False):
    ROOT_DIR = sys._MEIPASS
    EXE_DIR  = os.path.dirname(sys.executable)
else:
    ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    EXE_DIR  = ROOT_DIR

_ROOT = Path(ROOT_DIR).resolve()

FRONTEND_DIR         = str((_ROOT / 'frontend').resolve())
INDEX_HTML_PATH      = str((_ROOT / 'frontend' / 'index.html').resolve())
LIBRARY_JSON_PATH    = str((_ROOT / 'library.enc').resolve())
INSPECTORS_JSON_PATH = str((_ROOT / 'inspectors.enc').resolve())

def _get_arg(prefix):
    for arg in sys.argv[1:]:
        if arg.startswith(prefix):
            return arg[len(prefix):]
    return ''

PORT      = 5055
BIND_HOST = _get_arg('--host=').strip() or '127.0.0.1'

# --- Electron secret: generated fresh every process start ---
# Electron reads this via --electron-secret=<value> CLI arg (injected by main.js).
# Any request without this header is rejected with 403.
_SECRET_ARG   = _get_arg('--electron-secret=').strip()
ELECTRON_SECRET = _SECRET_ARG if _SECRET_ARG else secrets.token_hex(32)

_PROVIDER_ARG = _get_arg('--provider=').lower().strip()
_GEMINI_ARG   = _get_arg('--gemini-api-key=').strip()
_GROQ_ARG     = _get_arg('--groq-api-key=').strip()
_CLAUDE_ARG   = _get_arg('--claude-api-key=').strip()
_KEY_FILE_ARG = _get_arg('--key-file=').strip()

_key_file_keys = {}
if _KEY_FILE_ARG:
    try:
        with open(_KEY_FILE_ARG, 'r', encoding='utf-8') as _kf:
            _loaded = json.load(_kf)
        if isinstance(_loaded, dict):
            _key_file_keys = _loaded
    except Exception as _e:
        logging.warning('[config] Could not read key file: %s', _e)

def _resolve_key(env_name, cli_value):
    return _key_file_keys.get(env_name) or cli_value or ''

GEMINI_API_KEY    = _resolve_key('GEMINI_API_KEY',    _GEMINI_ARG)
GROQ_API_KEY      = _resolve_key('GROQ_API_KEY',      _GROQ_ARG)
ANTHROPIC_API_KEY = _resolve_key('ANTHROPIC_API_KEY', _CLAUDE_ARG)

ACTIVE_PROVIDER = _key_file_keys.get('ACTIVE_PROVIDER') or _PROVIDER_ARG or ''

_KEY_BIN_PATH = str((_ROOT / 'key.bin').resolve())
try:
    with open(_KEY_BIN_PATH, 'rb') as _kbf:
        _fernet_key = _kbf.read().strip()
    CIPHER = Fernet(_fernet_key)
    logging.info('[config] key.bin loaded successfully.')
except FileNotFoundError:
    CIPHER = None
except Exception as _e:
    logging.error('[config] Failed to load key.bin: %s', _e)
    CIPHER = None