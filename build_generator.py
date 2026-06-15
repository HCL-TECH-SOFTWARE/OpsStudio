import os
import ast

# Define where your original Python files are
FILES_TO_SCAN = [
    "main.py",
    "backend/server.py",
    "backend/config.py",
    "backend/qna_engine.py",
    "backend/ai_handler.py"
]

def get_all_imports(filepath):
    imports = set()
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            tree = ast.parse(f.read())
            
            for node in ast.walk(tree):
                # Catches: import os, import json
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        imports.add(alias.name)
                
                # Catches: from cryptography.fernet import Fernet
                elif isinstance(node, ast.ImportFrom):
                    if node.module:
                        imports.add(node.module)
                        # Also grab the deep sub-modules to be safe
                        for alias in node.names:
                            imports.add(f"{node.module}.{alias.name}")
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        
    return imports

# Gather every unique import across all files
all_hidden_imports = set()
for file in FILES_TO_SCAN:
    if os.path.exists(file):
        all_hidden_imports.update(get_all_imports(file))

# Clean up the list (remove local internal files, we will add them manually)
internal_modules = [m for m in all_hidden_imports if m.startswith('backend')]
external_modules = [m for m in all_hidden_imports if not m.startswith('backend')]

# Format them into PyInstaller flags
hidden_import_flags = " ".join([f"--hidden-import {mod}" for mod in external_modules])
internal_import_flags = " ".join([f"--hidden-import {mod}" for mod in internal_modules])

# Build the final command
base_command = (
    'pyinstaller --name "BigFix Ops Studio" '
    '--icon="../../bigfix-logo.ico" '
    '--add-data "../../frontend;frontend" '
    '--add-data "../../library.enc;." '
    '--add-data "../../inspectors.enc;." '
    '--exclude-module torch '
    '--exclude-module scipy '
    '--collect-all chromadb '
    '--collect-all onnxruntime '
    '--collect-all tokenizers'
)

final_command = f"{base_command} {hidden_import_flags} {internal_import_flags} main.py"

print("\n" + "="*80)
print("SUCCESS! COPY AND RUN THIS EXACT COMMAND IN YOUR 'dist/obfuscated' FOLDER:")
print("="*80 + "\n")
print(final_command)
print("\n" + "="*80)