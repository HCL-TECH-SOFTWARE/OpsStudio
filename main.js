const { app, BrowserWindow, dialog } = require('electron')
const { spawn, execSync, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const http = require('http')
const net = require('net')

let mainWindow
let backendProcess
let PORT = 5055

// ── Find server.exe ───────────────────────────────────────────────
function getServerPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'server.exe')
  }
  return path.join(__dirname, '..', 'dist', 'server.exe')
}

// ── Find a free port, preferring PORT ────────────────────────────
function findFreePort(preferred) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.once('error', () => {
      const fallback = net.createServer()
      fallback.listen(0, '127.0.0.1', () => {
        const p = fallback.address().port
        fallback.close(() => resolve(p))
      })
    })
    server.listen(preferred, '127.0.0.1', () => {
      server.close(() => resolve(preferred))
    })
  })
}

// ── Kill stale orphan server.exe from a prior session ────────────
function killOrphanServer() {
  try { spawnSync('C:\\Windows\\System32\\taskkill.exe', ['/F', '/IM', 'server.exe'], { stdio: 'ignore' }) } catch (_) {}
}

// ── Kill backend and its whole process tree ───────────────────────
function terminateBackend() {
  if (backendProcess) {
    try { spawnSync('C:\\Windows\\System32\\taskkill.exe', ['/F', '/T', '/PID', String(backendProcess.pid)], { stdio: 'ignore' }) } catch (_) {
      try { backendProcess.kill('SIGKILL') } catch (_2) {}
    }
    backendProcess = null
  }
}

// ── Wait for backend /ping ────────────────────────────────────────
function waitForBackend(port, retries = 40) {
  return new Promise((resolve, reject) => {
    const try_ = (n) => {
      const req = http.get(`http://127.0.0.1:${port}/ping`, () => resolve())
      req.on('error', () => {
        if (n <= 0) return reject(new Error(
          `Backend did not start on port ${port}.\n\nMake sure port ${port} is not already in use.`
        ))
        setTimeout(() => try_(n - 1), 500)
      })
      req.setTimeout(400, () => req.destroy())
    }
    try_(retries)
  })
}

// ── Parse CLI args passed to the Electron exe ────────────────────
//   e.g.  "BigFix Ops Studio.exe" --provider=gemini --gemini-api-key=XXX
function getCliArg(prefix) {
  const arg = process.argv.find(a => a.startsWith(prefix))
  return arg ? arg.split('=').slice(1).join('=').replace(/(^"|"$)/g, '') : null
}

// ── Build the arg list to forward to server.exe ──────────────────
function buildBackendArgs(port) {
  const forward = ['--port', '--provider', '--groq-api-key', '--gemini-api-key', '--claude-api-key']
  const args = [`--port=${port}`]
  for (const key of forward.slice(1)) {          // skip --port, already added
    const val = getCliArg(`${key}=`)
    if (val) args.push(`${key}=${val}`)
  }
  return args
}

// ── Start server.exe, forwarding all relevant CLI args ────────────
function startBackend(port) {
  const serverExe = getServerPath()

  if (!fs.existsSync(serverExe)) {
    dialog.showErrorBox('Missing File',
      `server.exe not found at:\n${serverExe}\n\nRun build.bat first.`)
    app.quit()
    return false
  }

  killOrphanServer()

  const args = buildBackendArgs(port)
  backendProcess = spawn(serverExe, args, {
    cwd: path.dirname(serverExe),
    windowsHide: true,
    detached: false
  })

  backendProcess.on('error', (err) => {
    dialog.showErrorBox('Backend Error', `Failed to start server.exe:\n${err.message}`)
    app.quit()
  })

  backendProcess.on('exit', (code) => {
    if (code !== 0 && mainWindow) {
      dialog.showErrorBox('Backend Crashed', `server.exe exited with code ${code}`)
    }
    backendProcess = null
  })

  return true
}

// ── Create the main window ────────────────────────────────────────
function createWindow(port) {
  // Fix "Unable to move the cache: Access is denied" — redirect Chromium cache
  // away from the read-only install dir to the writable userData dir.
  const cacheDir = path.join(app.getPath('userData'), 'ChromeCache')
  app.commandLine.appendSwitch('disk-cache-dir', cacheDir)

  mainWindow = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    icon: path.join(__dirname, 'bigfix-logo.ico'),
    title: 'BigFix Ops Studio',
    webPreferences: { contextIsolation: true, nodeIntegration: false },
    show: false,
    backgroundColor: '#1e1e1e'
  })

  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL(`http://127.0.0.1:${port}/`)

  mainWindow.once('ready-to-show', () => { mainWindow.show(); mainWindow.focus() })
  mainWindow.on('closed', () => { mainWindow = null })
}

// ── App lifecycle ─────────────────────────────────────────────────
app.whenReady().then(async () => {
  PORT = await findFreePort(PORT)

  const started = startBackend(PORT)
  if (!started) return

  try {
    await waitForBackend(PORT)
    createWindow(PORT)
  } catch (err) {
    dialog.showErrorBox('Startup Failed', err.message)
    terminateBackend()
    app.quit()
  }
})

// ── Detach from the launching terminal so CMD can be closed ───────
//   Without this, closing the cmd window that launched the .exe kills Electron too.
app.on('ready', () => {
  // Re-spawn ourselves detached from any console if we haven't already
  if (!process.env.BIGFIX_DETACHED && process.argv[1] !== '--squirrel-firstrun') {
    const args = process.argv.slice(1).filter(a => !a.startsWith('--squirrel'))
    const child = spawn(process.execPath, args, {
      detached: true,
      stdio: 'ignore',
      env: { ...process.env, BIGFIX_DETACHED: '1' }
    })
    child.unref()
    app.exit(0)   // exit this attached instance immediately
  }
})

// ── Shut down cleanly on all exit paths ──────────────────────────
app.on('window-all-closed', () => { terminateBackend(); app.quit() })
app.on('before-quit', () => { terminateBackend() })
process.on('exit', () => { terminateBackend() })
