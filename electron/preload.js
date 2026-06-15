const { contextBridge, ipcRenderer } = require('electron')

const ALLOWED_KEY_NAMES = new Set([
  'GEMINI_API_KEY',
  'GROQ_API_KEY',
  'ANTHROPIC_API_KEY',
  'ACTIVE_PROVIDER',
])

const ALLOWED_PROVIDERS = new Set(['gemini', 'groq', 'claude', 'anthropic'])
const API_KEY_RE        = /^[\x20-\x7E]+$/

contextBridge.exposeInMainWorld('secureKeys', {
  save: (keyName, value) => {
    if (!ALLOWED_KEY_NAMES.has(keyName)) return Promise.resolve(false)
    if (typeof value !== 'string' || value.length === 0 || value.length > 200) return Promise.resolve(false)
    if (!API_KEY_RE.test(value)) return Promise.resolve(false)
    return ipcRenderer.invoke('secure-key-save', keyName, value)
  },
  exists: (keyName) => {
    if (!ALLOWED_KEY_NAMES.has(keyName)) return Promise.resolve(false)
    return ipcRenderer.invoke('secure-key-exists', keyName)
  },
})

contextBridge.exposeInMainWorld('secureStore', {
  getActiveProvider: () => ipcRenderer.invoke('secure-get-active-provider'),
})

contextBridge.exposeInMainWorld('providerSettings', {
  apply: (provider, apiKey) => {
    if (!ALLOWED_PROVIDERS.has(provider))           return Promise.resolve({ ok: false, error: 'Invalid provider' })
    if (typeof apiKey !== 'string')                 return Promise.resolve({ ok: false, error: 'Invalid key type' })
    if (apiKey.length === 0 || apiKey.length > 200) return Promise.resolve({ ok: false, error: 'Key length out of range' })
    if (!API_KEY_RE.test(apiKey))                   return Promise.resolve({ ok: false, error: 'Key contains non-printable characters' })
    return ipcRenderer.invoke('provider-settings-apply', provider, apiKey)
  },
  switchOnly: (provider) => {
    if (!ALLOWED_PROVIDERS.has(provider)) return Promise.resolve({ ok: false, error: 'Invalid provider' })
    return ipcRenderer.invoke('provider-switch-only', provider)
  },
  keyStatus: (provider) => {
    if (!ALLOWED_PROVIDERS.has(provider)) return Promise.resolve({ exists: false, masked: '' })
    return ipcRenderer.invoke('secure-key-status', provider)
  },
})
