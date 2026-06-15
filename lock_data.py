"""
lock_data.py  —  BigFix Ops Studio  |  Build-time encryption utility
=====================================================================
Run this script ONCE whenever library.json or inspectors.json changes.

What it does:
  1. Generates a fresh Fernet key and writes it to  key.bin
  2. Encrypts library.json    →  library.enc
  3. Encrypts inspectors.json →  inspectors.enc

The three output files (key.bin, library.enc, inspectors.enc) are all
bundled into server.exe by build.ps1 via PyInstaller --add-data flags.

IMPORTANT:
  - key.bin must NEVER be committed to source control.
    Add it to .gitignore immediately after generation.
  - The key is read at runtime from key.bin inside the bundle.
    There is NO hardcoded key anywhere in the Python source.
  - Re-run this script every time you update the JSON data files.
    A new key is generated each run, keeping the key fresh.

Usage:
  python lock_data.py
"""

import os
import sys
from cryptography.fernet import Fernet

# ── Paths (script lives in project root, same as the json files) ──────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

KEY_FILE        = os.path.join(BASE_DIR, "key.bin")
LIBRARY_JSON    = os.path.join(BASE_DIR, "library.json")
INSPECTORS_JSON = os.path.join(BASE_DIR, "inspectors.json")
LIBRARY_ENC     = os.path.join(BASE_DIR, "library.enc")
INSPECTORS_ENC  = os.path.join(BASE_DIR, "inspectors.enc")

# ── Validate inputs exist ─────────────────────────────────────────────────────
for path in (LIBRARY_JSON, INSPECTORS_JSON):
    if not os.path.exists(path):
        print(f"[ERROR] File not found: {path}")
        sys.exit(1)

# ── Generate a fresh key every run ───────────────────────────────────────────
key    = Fernet.generate_key()          # 32-byte URL-safe base64 key
cipher = Fernet(key)

# Write key.bin (raw bytes — NOT base64 text)
with open(KEY_FILE, "wb") as f:
    f.write(key)

# ── Encrypt library.json ──────────────────────────────────────────────────────
with open(LIBRARY_JSON, "rb") as f:
    encrypted_lib = cipher.encrypt(f.read())
with open(LIBRARY_ENC, "wb") as f:
    f.write(encrypted_lib)
print(f"[OK] Encrypted:               library.json  →  library.enc")

# ── Encrypt inspectors.json ───────────────────────────────────────────────────
with open(INSPECTORS_JSON, "rb") as f:
    encrypted_ins = cipher.encrypt(f.read())
with open(INSPECTORS_ENC, "wb") as f:
    f.write(encrypted_ins)
print(f"[OK] Encrypted:               inspectors.json  →  inspectors.enc")

print()
print("Done. Now run build.ps1 to bundle key.bin + *.enc into server.exe.")