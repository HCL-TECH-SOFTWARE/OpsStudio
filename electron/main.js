const { app, BrowserWindow, dialog, ipcMain, safeStorage } = require('electron')
const { spawn, execFileSync, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const os = require('os')
const https = require('https')
const crypto = require('crypto')

const SINGLE_INSTANCE_LOCK = app.requestSingleInstanceLock()
if (!SINGLE_INSTANCE_LOCK) {
  app.quit()
  process.exit(0)
}

if (!process.env.BIGFIX_DETACHED && process.argv[1] !== '--squirrel-firstrun') {
  app.whenReady().then(() => {
    const args  = process.argv.slice(1).filter(a => !a.startsWith('--squirrel'))
    const child = spawn(process.execPath, args, {
      detached: true,
      stdio:    'ignore',
      env:      { ...process.env, BIGFIX_DETACHED: '1' },
    })
    child.unref()
    app.exit(0)
  })
} else {

if (process.platform === 'win32' && app.setDefaultDllDirectories) {
  app.setDefaultDllDirectories('system32')
}

const PORT = 5055

// Generate a fresh secret every launch — shared with the backend via CLI arg.
// Electron injects this into every request header so the backend can reject
// anything that didn't come from us (e.g. a browser opening the same port).
const ELECTRON_SECRET = crypto.randomBytes(32).toString('hex')

const ALLOWED_KEY_NAMES = new Set([
  'GEMINI_API_KEY',
  'GROQ_API_KEY',
  'ANTHROPIC_API_KEY',
  'ACTIVE_PROVIDER',
])

function getSecureStorePath() {
  return path.join(app.getPath('userData'), 'secure.json')
}

function loadSecureKeys() {
  if (!safeStorage.isEncryptionAvailable()) {
    dialog.showErrorBox(
      'Encryption unavailable',
      'OS-level encryption (DPAPI) is not available on this machine.\n' +
      'API keys cannot be loaded. Please contact your administrator.'
    )
    return {}
  }
  try {
    const raw   = fs.readFileSync(getSecureStorePath(), 'utf8')
    const store = JSON.parse(raw)
    const result = {}
    for (const [k, v] of Object.entries(store)) {
      if (!ALLOWED_KEY_NAMES.has(k)) continue
      try {
        result[k] = safeStorage.decryptString(Buffer.from(v, 'base64'))
      } catch (_) {}
    }
    return result
  } catch (_) {
    return {}
  }
}

function saveSecureKey(keyName, value) {
  if (!ALLOWED_KEY_NAMES.has(keyName)) return false
  if (!safeStorage.isEncryptionAvailable()) {
    dialog.showErrorBox(
      'Encryption unavailable',
      'OS-level encryption (DPAPI) is not available.\n' +
      'Your API key could not be saved securely.'
    )
    return false
  }
  const storePath = getSecureStorePath()
  let store = {}
  try {
    const raw = fs.readFileSync(storePath, 'utf8')
    store = JSON.parse(raw)
    for (const k of Object.keys(store)) {
      if (!ALLOWED_KEY_NAMES.has(k)) delete store[k]
    }
  } catch (_) {
    store = {}
  }
  if (value) {
    store[keyName] = safeStorage.encryptString(value).toString('base64')
  } else {
    delete store[keyName]
  }
  try {
    fs.mkdirSync(path.dirname(storePath), { recursive: true })
    fs.writeFileSync(storePath, JSON.stringify(store), { encoding: 'utf8', mode: 0o600 })
    return true
  } catch (writeErr) {
    dialog.showErrorBox(
      'Save failed',
      'Could not write API key to secure storage.\n' +
      'Path: ' + storePath + '\n' +
      'Error: ' + writeErr.message
    )
    return false
  }
}

function getTlsDir() {
  return path.join(app.getPath('userData'), 'tls')
}

function getTlsCertPath() {
  return path.join(getTlsDir(), 'server.pem')
}

function getTlsKeyPath() {
  return path.join(getTlsDir(), 'server.key')
}

function certExists() {
  return fs.existsSync(getTlsCertPath()) && fs.existsSync(getTlsKeyPath())
}

function loadCertPem() {
  try {
    const pem = fs.readFileSync(getTlsCertPath())
    if (pem && pem.length > 0) return pem
  } catch (_) {}
  return null
}

function parsePemToDer(pemBuffer) {
  const pemStr = pemBuffer.toString('utf8')
  const lines = pemStr.split('\n').filter(function(line) {
    return line.trim().length > 0 &&
           !line.includes('-----BEGIN') &&
           !line.includes('-----END')
  })
  return Buffer.from(lines.join(''), 'base64')
}

function generateCertSync(serverExe) {
  const certPath = getTlsCertPath()
  const keyPath  = getTlsKeyPath()

  try {
    fs.mkdirSync(getTlsDir(), { recursive: true })
  } catch (_) {}

  const result = spawnSync(serverExe, [
    '--generate-cert-only',
    '--tls-cert=' + certPath,
    '--tls-key='  + keyPath,
  ], {
    cwd:         path.dirname(serverExe),
    windowsHide: true,
    timeout:     30000,
  })

  if (result.status !== 0) {
    const stderr = result.stderr ? result.stderr.toString().trim() : ''
    throw new Error(
      'Certificate generation failed (exit code ' + result.status + ').' +
      (stderr ? '\n' + stderr : '')
    )
  }

  if (!fs.existsSync(certPath)) {
    throw new Error(
      'Certificate generation reported success but file was not created at:\n' + certPath
    )
  }
}

ipcMain.handle('secure-key-save', (_event, keyName, value) => {
  if (!ALLOWED_KEY_NAMES.has(keyName)) return false
  return saveSecureKey(keyName, value)
})

ipcMain.handle('secure-key-exists', (_event, keyName) => {
  if (!ALLOWED_KEY_NAMES.has(keyName)) return false
  const keys = loadSecureKeys()
  return !!keys[keyName]
})

ipcMain.handle('secure-get-active-provider', (_event) => {
  const keys = loadSecureKeys()
  return keys['ACTIVE_PROVIDER'] || ''
})

ipcMain.handle('secure-key-status', (_event, provider) => {
  if (!['gemini', 'groq', 'claude', 'anthropic'].includes(provider))
    return { exists: false, masked: '' }
  const keyName = {
    gemini:    'GEMINI_API_KEY',
    groq:      'GROQ_API_KEY',
    claude:    'ANTHROPIC_API_KEY',
    anthropic: 'ANTHROPIC_API_KEY',
  }[provider]
  const keys = loadSecureKeys()
  const val  = keys[keyName] || ''
  if (!val) return { exists: false, masked: '' }
  const tail   = val.slice(-4)
  const masked = '\u2022'.repeat(12) + tail
  return { exists: true, masked }
})

const _ALLOWED_PROVIDERS_IPC = new Set(['gemini', 'groq', 'claude', 'anthropic'])
const _API_KEY_RE_IPC        = /^[\x20-\x7E]+$/

function _backendRequest(endpoint, body) {
  return new Promise((resolve) => {
    const certPem = _serverCertPem
    const options = {
      hostname: '127.0.0.1',
      port:     PORT,
      path:     endpoint,
      method:   'POST',
      headers:  {
        'Content-Type':     'application/json',
        'Content-Length':   Buffer.byteLength(body),
        // Always attach the secret so the backend accepts our IPC-initiated requests
        'X-Electron-Secret': ELECTRON_SECRET,
      },
      ca:       certPem ? [certPem] : undefined,
      rejectUnauthorized: !!certPem,
    }
    const req = https.request(options, (res) => {
      let raw = ''
      res.on('data', (chunk) => { raw += chunk })
      res.on('end', () => {
        try   { resolve(JSON.parse(raw)) }
        catch { resolve({ ok: false, error: 'Bad response from backend' }) }
      })
    })
    req.on('error', (e) => {
      resolve({ ok: false, error: e.message })
    })
    req.setTimeout(4000, () => {
      req.destroy()
      resolve({ ok: false, error: 'Backend timeout' })
    })
    req.write(body)
    req.end()
  })
}

ipcMain.handle('provider-switch-only', async (_event, provider) => {
  if (typeof provider !== 'string' || !_ALLOWED_PROVIDERS_IPC.has(provider.toLowerCase()))
    return { ok: false, error: 'Invalid provider' }
  const normalizedProvider = provider.toLowerCase()

  const saved = saveSecureKey('ACTIVE_PROVIDER', normalizedProvider)
  if (!saved) return { ok: false, error: 'safeStorage write failed' }

  const keyName = {
    gemini:    'GEMINI_API_KEY',
    groq:      'GROQ_API_KEY',
    claude:    'ANTHROPIC_API_KEY',
    anthropic: 'ANTHROPIC_API_KEY',
  }[normalizedProvider]
  const keys        = loadSecureKeys()
  const existingKey = keys[keyName] || ''

  const body = JSON.stringify({ provider: normalizedProvider, api_key: existingKey })
  return _backendRequest('/set-provider', body)
})

ipcMain.handle('provider-settings-apply', async (_event, provider, apiKey) => {
  if (typeof provider !== 'string' || !_ALLOWED_PROVIDERS_IPC.has(provider.toLowerCase()))
    return { ok: false, error: 'Invalid provider' }
  if (typeof apiKey !== 'string' || apiKey.length === 0 || apiKey.length > 200)
    return { ok: false, error: 'Invalid key length' }
  if (!_API_KEY_RE_IPC.test(apiKey))
    return { ok: false, error: 'Key contains invalid characters' }

  const normalizedProvider = provider.toLowerCase()

  const keyName = {
    gemini:    'GEMINI_API_KEY',
    groq:      'GROQ_API_KEY',
    claude:    'ANTHROPIC_API_KEY',
    anthropic: 'ANTHROPIC_API_KEY',
  }[normalizedProvider]

  const savedKey      = saveSecureKey(keyName, apiKey)
  const savedProvider = saveSecureKey('ACTIVE_PROVIDER', normalizedProvider)
  if (!savedKey || !savedProvider)
    return { ok: false, error: 'safeStorage write failed' }

  const body = JSON.stringify({ provider: normalizedProvider, api_key: apiKey })
  return _backendRequest('/set-provider', body)
})

let mainWindow
let backendProcess
let _tmpKeyFile    = null
let _serverCertPem = null

function getServerPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'server.exe')
  }
  return path.join(__dirname, '..', 'dist', 'server.exe')
}

let _backendShuttingDown = false

function terminateBackend() {
  if (backendProcess) {
    _backendShuttingDown = true
    try {
      execFileSync('C:\\Windows\\System32\\taskkill.exe',
        ['/F', '/T', '/PID', String(backendProcess.pid)], { stdio: 'ignore' })
    } catch (_) {
      try { backendProcess.kill('SIGKILL') } catch (_2) {}
    }
    backendProcess = null
  }
}

function waitForBackend(certPem, retries) {
  if (retries === undefined) retries = 40
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      const options = {
        hostname:           '127.0.0.1',
        port:               PORT,
        path:               '/ping',
        method:             'GET',
        headers: {
          // Must include secret even for the startup ping
          'X-Electron-Secret': ELECTRON_SECRET,
        },
        ca:                 certPem ? [certPem] : undefined,
        rejectUnauthorized: !!certPem,
      }
      const req = https.request(options, () => {
        resolve()
      })
      req.on('error', () => {
        if (n <= 0) {
          return reject(new Error(
            'Backend did not start on port ' + PORT + '.\n\n' +
            'Make sure port ' + PORT + ' is not already in use.'
          ))
        }
        setTimeout(() => attempt(n - 1), 500)
      })
      req.setTimeout(400, () => req.destroy())
      req.end()
    }
    attempt(retries)
  })
}

function getCliArg(prefix) {
  const arg = process.argv.find(a => a.startsWith(prefix))
  return arg ? arg.split('=').slice(1).join('=').replace(/(^"|"$)/g, '') : null
}

function writeKeysTempFile(keys) {
  const name    = 'bfops-keys-' + crypto.randomBytes(8).toString('hex') + '.json'
  const tmpPath = path.join(os.tmpdir(), name)
  fs.writeFileSync(tmpPath, JSON.stringify(keys), { encoding: 'utf8', mode: 0o600 })
  return tmpPath
}

function deleteTempFile(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath)
  } catch (_) {}
}

function buildBackendArgs() {
  const secureKeys  = loadSecureKeys()
  const cliProvider = getCliArg('--provider=')
  const provider    = cliProvider || secureKeys['ACTIVE_PROVIDER'] || ''

  const keyPayload = {}
  if (provider) keyPayload['ACTIVE_PROVIDER'] = provider

  const cliGemini = getCliArg('--gemini-api-key=')
  const cliGroq   = getCliArg('--groq-api-key=')
  const cliClaude = getCliArg('--claude-api-key=')

  const geminiKey = cliGemini || secureKeys['GEMINI_API_KEY']    || ''
  const groqKey   = cliGroq   || secureKeys['GROQ_API_KEY']      || ''
  const claudeKey = cliClaude || secureKeys['ANTHROPIC_API_KEY'] || ''

  if (geminiKey) keyPayload['GEMINI_API_KEY']    = geminiKey
  if (groqKey)   keyPayload['GROQ_API_KEY']      = groqKey
  if (claudeKey) keyPayload['ANTHROPIC_API_KEY'] = claudeKey

  const args = [
    '--tls-cert=' + getTlsCertPath(),
    '--tls-key='  + getTlsKeyPath(),
    // Pass the secret to the backend so it can validate incoming request headers
    '--electron-secret=' + ELECTRON_SECRET,
  ]

  if (Object.keys(keyPayload).length > 0) {
    _tmpKeyFile = writeKeysTempFile(keyPayload)
    args.push('--key-file=' + _tmpKeyFile)
  }

  return args
}

function startBackend() {
  const serverExe = getServerPath()

  if (!fs.existsSync(serverExe)) {
    dialog.showErrorBox('Missing File',
      'server.exe not found at:\n' + serverExe + '\n\nRun build.bat first.')
    app.quit()
    return false
  }

  const args = buildBackendArgs()

  try {
    const out = execFileSync('C:\\Windows\\System32\\netstat.exe',
      ['-ano'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    for (const line of out.split('\n')) {
      if (line.includes(':' + PORT + ' ') && line.includes('LISTENING')) {
        const pid = line.trim().split(/\s+/).pop()
        if (pid && /^\d+$/.test(pid) && parseInt(pid) !== process.pid) {
          try {
            execFileSync('C:\\Windows\\System32\\taskkill.exe',
              ['/F', '/PID', pid], { stdio: 'ignore' })
          } catch (_) {}
        }
      }
    }
  } catch (_) {}

  backendProcess = spawn(serverExe, args, {
    cwd:         path.dirname(serverExe),
    windowsHide: true,
    detached:    false,
    stdio:       'ignore',
  })

  if (_tmpKeyFile) {
    setTimeout(() => deleteTempFile(_tmpKeyFile), 5000)
  }

  backendProcess.on('error', (err) => {
    deleteTempFile(_tmpKeyFile)
    dialog.showErrorBox('Backend Error', 'Failed to start server.exe:\n' + err.message)
    app.quit()
  })

  backendProcess.on('exit', (code) => {
    deleteTempFile(_tmpKeyFile)
    if (code !== 0 && !_backendShuttingDown) {
      dialog.showErrorBox('Backend Error',
        'server.exe exited unexpectedly with code ' + code + '.\n\n' +
        'Check that port ' + PORT + ' is not already in use.')
      if (!mainWindow) {
        app.quit()
      }
    }
    _backendShuttingDown = false
    backendProcess = null
  })

  return true
}

function createWindow() {
  const cacheDir = path.join(app.getPath('userData'), 'ChromeCache')
  app.commandLine.appendSwitch('disk-cache-dir', cacheDir)

  mainWindow = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    icon: path.join(__dirname, 'bigfix-logo.ico'),
    title: 'BigFix Ops Studio',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration:  false,
      preload:          path.join(__dirname, 'preload.js'),
      sandbox:          true,
    },
    show:            false,
    backgroundColor: '#1e1e1e',
  })

  mainWindow.setMenuBarVisibility(false)

  // Inject X-Electron-Secret into every request the window makes to the backend.
  // This is what proves to the backend the request is coming from us, not a browser.
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    { urls: ['https://127.0.0.1:' + PORT + '/*'] },
    (details, callback) => {
      details.requestHeaders['X-Electron-Secret'] = ELECTRON_SECRET
      callback({ requestHeaders: details.requestHeaders })
    }
  )

  mainWindow.loadURL('https://127.0.0.1:' + PORT + '/')

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

app.whenReady().then(async () => {
  const serverExe = getServerPath()

  if (!fs.existsSync(serverExe)) {
    dialog.showErrorBox('Missing File',
      'server.exe not found at:\n' + serverExe + '\n\nRun build.bat first.')
    app.quit()
    return
  }

  if (!certExists()) {
    try {
      generateCertSync(serverExe)
    } catch (err) {
      dialog.showErrorBox('Certificate Generation Failed', err.message)
      app.quit()
      return
    }
  }

  const certPem = loadCertPem()
  if (!certPem) {
    dialog.showErrorBox('Certificate Error',
      'TLS certificate could not be read from:\n' + getTlsCertPath())
    app.quit()
    return
  }

  _serverCertPem = certPem

  // IMPORTANT: Scope the certificate-error bypass ONLY to our mainWindow's webContents.
  // Previously this fired for ANY webContents (including browser connections), which
  // caused Electron's cert trust state to break when a browser tried to connect.
  app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    if (
      mainWindow &&
      webContents === mainWindow.webContents &&
      url.startsWith('https://127.0.0.1:' + PORT + '/') &&
      _serverCertPem
    ) {
      const serverDerHash = crypto
        .createHash('sha256')
        .update(parsePemToDer(Buffer.from(certificate.data, 'utf8')))
        .digest('hex')
      const localDerHash = crypto
        .createHash('sha256')
        .update(parsePemToDer(_serverCertPem))
        .digest('hex')
      if (serverDerHash === localDerHash) {
        event.preventDefault()
        callback(true)
        return
      }
    }
    // All other cert errors (including browser attempts) are rejected
    callback(false)
  })

  const started = startBackend()
  if (!started) return

  try {
    await waitForBackend(certPem)
    createWindow()
  } catch (err) {
    deleteTempFile(_tmpKeyFile)
    dialog.showErrorBox('Startup Failed', err.message)
    terminateBackend()
    app.quit()
  }
})

app.on('window-all-closed', () => {
  terminateBackend()
  app.quit()
})
app.on('before-quit', () => {
  terminateBackend()
  deleteTempFile(_tmpKeyFile)
})
process.on('exit', () => {
  terminateBackend()
  deleteTempFile(_tmpKeyFile)
})

}