import os
import subprocess
import platform
from backend.config import EXE_DIR

def get_windows_qna_path(fallback_dir):
    import winreg
    target_value_name = "EnterpriseClientFolder"
    keys_to_check = [
        r"SOFTWARE\WOW6432Node\BigFix\EnterpriseClient",
        r"SOFTWARE\BigFix\EnterpriseClient"
    ]
    for key_path in keys_to_check:
        try:
            with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, key_path) as key:
                install_dir, _ = winreg.QueryValueEx(key, target_value_name)
                qna_target = os.path.join(install_dir, "qna.exe")
                if os.path.exists(qna_target):
                    return qna_target
        except Exception:
            continue

    common_paths = [
        r"C:\Program Files (x86)\BigFix Enterprise\BES Client\qna.exe",
        r"C:\Program Files\BigFix Enterprise\BES Client\qna.exe"
    ]
    for p in common_paths:
        if os.path.exists(p):
            return p

    return os.path.abspath(os.path.join(fallback_dir, "qna.exe"))

if platform.system() == "Windows":
    QNA_PATH = get_windows_qna_path(EXE_DIR)
else:
    QNA_PATH = os.path.abspath(os.path.join(EXE_DIR, "QnA"))

def run_qna(expressions: list[str]) -> list[dict]:
    stdin_input = "\n".join(expressions) + "\n"
    cmd_args = [QNA_PATH]

    run_kwargs = {
        "capture_output": True,
        "text": True,
        "timeout": 45
    }

    if platform.system() == "Windows":
        run_kwargs["creationflags"] = 0x08000000

    try:
        proc = subprocess.run(cmd_args, input=stdin_input, **run_kwargs)
        raw_output = proc.stdout
    except FileNotFoundError:
        return [{"expr": e, "answers": [], "time_us": 0, "error": f"Engine not found at: {cmd_args[0]}"} for e in expressions]
    except subprocess.TimeoutExpired:
        return [{"expr": e, "answers": [], "time_us": 0, "error": "Timeout"} for e in expressions]
    except Exception as ex:
        return [{"expr": e, "answers": [], "time_us": 0, "error": str(ex)} for e in expressions]

    results = []
    current_answers = []
    current_error = None
    current_time = 0
    expr_index = 0

    out = raw_output.replace("Q: A:", "A:").replace("Q: E:", "E:")

    for line in out.splitlines():
        line = line.strip()
        if not line or line == "Q:":
            continue

        if line.startswith("Q:"):
            remainder = line[2:].strip()
            if remainder.startswith("A:") or remainder.startswith("E:"):
                line = remainder
            else:
                continue

        if line.startswith("A:"):
            current_answers.append(line[2:].strip())
        elif line.startswith("E:"):
            current_error = line[2:].strip()
        elif line.startswith("T:"):
            try:
                current_time = int(line[2:].strip())
            except ValueError:
                pass

            if expr_index < len(expressions):
                results.append({
                    "expr": expressions[expr_index],
                    "answers": current_answers,
                    "time_us": current_time,
                    "error": current_error
                })
                expr_index += 1

            current_answers = []
            current_error = None
            current_time = 0

    while expr_index < len(expressions):
        results.append({
            "expr": expressions[expr_index],
            "answers": current_answers or [],
            "time_us": current_time,
            "error": current_error or ("No output returned." if not current_answers else None)
        })
        current_answers = []
        current_error = None
        expr_index += 1

    return results