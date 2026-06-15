# BigFix Ops Studio

BigFix Ops Studio is a localized, AI-powered IDE designed specifically for IT and Security professionals managing BigFix environments. It provides a seamless interface for writing, evaluating, and debugging endpoint management scripts with built-in, context-aware AI assistance.

The studio is organized into three core workspaces:

- **Client Relevance Studio** — Query endpoint properties locally
- **Session Relevance Studio** — Session-based queries for the BigFix Console
- **Action Script Studio** — Write and reference BigFix Action Script snippets

---

## ✨ Key Features

- **Local Evaluation Engine:** Safely evaluate complex relevance expressions locally without sending infrastructure queries to the cloud.
- **Semantic RAG Engine:** Uses a local ChromaDB Vector Database to mathematically match your question to the most relevant snippets in the knowledge base, ensuring accurate answers while minimising token consumption.
- **Multi-Provider AI Assistant:** Connect to your preferred AI provider to generate scripts, debug errors, and answer BigFix-specific questions. Supports **Groq**, **Google Gemini**, and **Anthropic Claude**.
- **Rate-Limit Resilience:** Built-in cascading fallback logic automatically switches to secondary AI models if the primary model hits an API rate limit, ensuring uninterrupted workflow.
- **SmartSense Code Explanation:** Highlight any complex relevance statement and instantly generate a plain-English explanation of exactly how it works.
- **Standalone Desktop App:** Runs completely natively on Windows via an Electron wrapper — no Python or Node.js installation required on end-user machines.

---

## 🚀 Getting Started

### Prerequisites

- Windows OS (required for local BigFix evaluation and Registry key storage)
- Python 3.8+ *(for developers building from source)*
- An API key from one of the supported AI providers (Groq, Google Gemini, or Anthropic Claude)

### Installation

Download the latest release. The release contains:

- **`BigFix Ops Studio Setup.exe`** — Windows installer
- **`How_to_Use_BigFix_Ops_Studio.docx`** — User guide

Run the installer and follow the on-screen prompts. No Python or Node.js installation is required on end-user machines.

> **Note:** On first launch, the AI knowledge base syncs in the background. The application window appears immediately — full AI capability is available within a few seconds.

### Setting Up Your AI Provider

BigFix Ops Studio requires an API key to power the AI Assistant. Open a Command Prompt in the application folder and inject your key via the command line. It is saved securely to your Windows Registry for all future sessions.

**Groq** *(Recommended — fastest, generous free tier)*
```
"BigFix Ops Studio.exe" --provider=groq --groq-api-key="YOUR_KEY_HERE"
```

**Google Gemini** *(Recommended — most generous free quota at 1M TPM)*
```
"BigFix Ops Studio.exe" --provider=gemini --gemini-api-key="YOUR_KEY_HERE"
```

**Anthropic Claude** *(Best reasoning quality)*
```
"BigFix Ops Studio.exe" --provider=claude --claude-api-key="YOUR_KEY_HERE"
```

### Standard Usage

Once your API key is saved, simply double-click **BigFix Ops Studio.exe** to launch — no extra flags needed.

> **Tip:** To switch providers, re-run with `--provider=` and the new provider name. To replace an expired key, re-run with the appropriate `--xxx-api-key=` flag.

---

## 🛠️ Building from Source

### Prerequisites

- Python 3.8+
- Node.js
- PyInstaller (`pip install pyinstaller`)

### Step 1 — Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2 — Build

Run the provided PowerShell build script from the root directory:

```powershell
.\build.ps1
```

This freezes the Python backend into `dist\server.exe`, installs Electron dependencies, and packages everything into a Windows installer at:

```
electron\release\BigFix Ops Studio Setup.exe
```

> **Dev tip:** Set the environment variable `BIGFIX_DEBUG=1` before launching to enable verbose logging. Production builds log at WARNING level only.

---

## 📁 Architecture & Directory Structure

```
bigfix-ops-studio/
├── frontend/                  # Web Interface (HTML, CSS, JS)
│   ├── index.html             # Main IDE UI layout
│   ├── styles.css             # Application styling
│   └── app.js                 # Frontend logic & AI Chat UI
│
├── backend/                   # Python Core
│   ├── server.py              # HTTP routing (/chat, /evaluate, /ping)
│   ├── config.py              # Env variables, key management, paths
│   ├── ai_handler.py          # LLM routing, fallback logic, ChromaDB RAG
│   └── qna_engine.py          # Local qna.exe bridge
│
├── electron/                  # Desktop wrapper
│   ├── main.js                # Electron entry point
│   └── package.json           # Electron build config
│
├── .chroma_db/                # Vector DB storage (auto-generated)
├── library.enc                # Encrypted AI snippet library
├── inspectors.enc             # Encrypted syntax dictionary
├── backend_entry.py           # PyInstaller entry point
├── build.ps1                  # Full build script
└── requirements.txt           # Python dependencies
```

---

## 🔒 Security & Data Privacy

| Area | Detail |
|---|---|
| **Evaluations** | All relevance and Action Script evaluations run entirely on the local machine via `qna_engine.py`. No infrastructure data is ever sent to the AI. |
| **AI Chat** | The semantic embedding model runs 100% locally. Only text actively typed into the AI Chat or highlighted via SmartSense is sent to the configured LLM provider. |
| **Key Storage** | API keys are stored in `HKEY_CURRENT_USER` Windows Registry. They are never written to plain-text files and never transmitted outside the provider's own API. |
| **Logging** | Production builds log at WARNING level only. Set `BIGFIX_DEBUG=1` for verbose output during development. |

---

## ❓ Troubleshooting

| Symptom | Resolution |
|---|---|
| Port 5055 in use on relaunch | The application auto-detects and clears stale processes on port 5055 at startup. If the error persists, manually kill any remaining BigFix Ops Studio processes. |
| App slow to load on first launch | The ChromaDB vector database syncs in the background. The window appears immediately; AI will be ready within a few seconds. |
| AI error: `cannot import 'genai'` | Ensure `google-genai` is installed: `pip install google-genai` |
| Engine not found | Ensure `qna.exe` is in the same folder as the `.exe`, or that BESClient is installed and registered in the Windows Registry. |
| Rate limit errors | All models for the selected provider are rate-limited. Wait 60 seconds, or switch to Gemini (1M TPM free quota). |
| AI response garbled | Rephrase your prompt or restart the assistant panel. |