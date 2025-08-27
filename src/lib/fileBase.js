// Ambil origin dari VITE_API_BASE (mis. http://localhost:3700/api -> http://localhost:3700)
const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3700/api'
export const FILE_BASE = new URL(apiBase).origin
// sekarang FILE_BASE = 'http://localhost:3700'
