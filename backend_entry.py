import cryptography
import cryptography.fernet
import cryptography.hazmat.primitives
import cryptography.hazmat.backends
import _cffi_backend
import os
import sys
import ssl
import socket
import datetime
import ipaddress
from http.server import ThreadingHTTPServer
from backend.server import Handler
from backend.config import PORT, BIND_HOST

def _get_hostname():
    try:
        fqdn = socket.getfqdn()
        if fqdn and fqdn != 'localhost':
            return fqdn
    except Exception:
        pass
    try:
        return socket.gethostname()
    except Exception:
        return 'localhost'

def _generate_and_persist_cert(cert_path, key_path):
    from cryptography import x509
    from cryptography.x509.oid import NameOID
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import rsa

    hostname = _get_hostname()

    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)

    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COMMON_NAME, hostname),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, 'BigFix Ops Studio'),
    ])

    now = datetime.datetime.now(datetime.timezone.utc)

    san_entries = [
        x509.DNSName('localhost'),
        x509.IPAddress(ipaddress.IPv4Address('127.0.0.1')),
    ]
    if hostname != 'localhost':
        san_entries.insert(0, x509.DNSName(hostname))

    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(now)
        .not_valid_after(now + datetime.timedelta(days=3650))
        .add_extension(
            x509.SubjectAlternativeName(san_entries),
            critical=False,
        )
        .sign(key, hashes.SHA256())
    )

    cert_pem = cert.public_bytes(serialization.Encoding.PEM)
    key_pem  = key.private_bytes(
        serialization.Encoding.PEM,
        serialization.PrivateFormat.TraditionalOpenSSL,
        serialization.NoEncryption(),
    )

    cert_dir = os.path.dirname(cert_path)
    os.makedirs(cert_dir, exist_ok=True)

    with open(cert_path, 'wb') as f:
        f.write(cert_pem)
    try:
        os.chmod(cert_path, 0o644)
    except Exception:
        pass

    with open(key_path, 'wb') as f:
        f.write(key_pem)
    try:
        os.chmod(key_path, 0o600)
    except Exception:
        pass


if __name__ == '__main__':
    cert_path      = ''
    key_path       = ''
    generate_only  = False

    for arg in sys.argv[1:]:
        if arg.startswith('--tls-cert='):
            cert_path = arg[len('--tls-cert='):]
        elif arg.startswith('--tls-key='):
            key_path = arg[len('--tls-key='):]
        elif arg == '--generate-cert-only':
            generate_only = True

    if not cert_path or not key_path:
        msg = 'Missing required --tls-cert= and --tls-key= arguments.'
        try:
            print(msg, file=sys.stderr, flush=True)
        except Exception:
            pass
        sys.exit(1)

    cert_exists = os.path.isfile(cert_path)
    key_exists  = os.path.isfile(key_path)

    if not cert_exists or not key_exists:
        try:
            _generate_and_persist_cert(cert_path, key_path)
        except Exception as e:
            msg = 'TLS certificate generation failed: {}'.format(e)
            try:
                print(msg, file=sys.stderr, flush=True)
            except Exception:
                pass
            sys.exit(1)

    if generate_only:
        sys.exit(0)

    try:
        ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        ctx.load_cert_chain(cert_path, key_path)
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
    except ssl.SSLError as e:
        msg = 'TLS setup failed: {}'.format(e)
        try:
            print(msg, file=sys.stderr, flush=True)
        except Exception:
            pass
        sys.exit(1)

    try:
        server = ThreadingHTTPServer((BIND_HOST, PORT), Handler)
        server.socket = ctx.wrap_socket(server.socket, server_side=True)
    except OSError as e:
        msg = (
            'Cannot bind to {}:{}: {}\n'
            'Check that port {} is not already in use and the host address is valid.'
        ).format(BIND_HOST, PORT, e, PORT)
        try:
            print(msg, file=sys.stderr, flush=True)
        except Exception:
            pass
        sys.exit(1)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    except Exception:
        pass
    finally:
        server.server_close()