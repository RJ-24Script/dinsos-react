import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiKey, FiEye, FiEyeOff, FiCheck, FiAlertTriangle, FiClipboard, FiLogIn } from 'react-icons/fi'

export default function AdminLogin() {
  const [key, setKey] = useState('')
  const [show, setShow] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [remember, setRemember] = useState(true)
  const nav = useNavigate()
  const inputRef = useRef(null)

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Kalau sudah punya key, langsung ke dashboard
  useEffect(() => {
    const k = localStorage.getItem('ADMIN_KEY') || sessionStorage.getItem('ADMIN_KEY')
    if (k) nav('/admin', { replace: true })
  }, [nav])

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setKey(text.trim())
    } catch {
      setErr('Gagal membaca clipboard. Izinkan akses clipboard atau paste manual (Ctrl+V).')
      setTimeout(() => setErr(''), 2500)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    const trimmed = key.trim()
    if (!trimmed) {
      setErr('Masukkan Admin Key terlebih dahulu.')
      return
    }
    if (trimmed.length < 6) {
      setErr('Admin Key terlalu pendek (min. 6 karakter).')
      return
    }

    setLoading(true)
    try {
      // Di tahap ini kita trust local key (stateless). Kalau nanti mau verifikasi ke server,
      // tinggal panggil endpoint /api/admin/verify-key di sini.
      if (remember) {
        localStorage.setItem('ADMIN_KEY', trimmed)
        sessionStorage.removeItem('ADMIN_KEY')
      } else {
        sessionStorage.setItem('ADMIN_KEY', trimmed)
        localStorage.removeItem('ADMIN_KEY')
      }
      nav('/admin', { replace: true }) // 👉 redirect ke Dashboard Admin
    } catch (e2) {
      setErr('Login gagal. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl" />

      {/* Container */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Logo / Heading */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 ring-1 ring-white/30 backdrop-blur">
              <FiKey className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Login Admin</h1>
            <p className="text-slate-300 text-sm mt-1">
              Masuk untuk mengelola Pengumuman, Agenda, Pengaduan, Dokumen, dan Berita.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl p-6">
            {err && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-300/40 bg-red-50/70 px-3 py-2 text-sm text-red-800">
                <FiAlertTriangle className="mt-0.5 shrink-0" />
                <span>{err}</span>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {/* Admin Key */}
              <div>
                <label htmlFor="adminkey" className="block text-slate-100 text-sm mb-1">
                  Admin Key
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 focus-within:ring-2 focus-within:ring-blue-400 px-3 py-2">
                  <FiKey className="text-slate-200" />
                  <input
                    ref={inputRef}
                    id="adminkey"
                    type={show ? 'text' : 'password'}
                    className="flex-1 bg-transparent placeholder:text-slate-300 text-white focus:outline-none"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="text-slate-200 hover:text-white transition"
                    aria-label={show ? 'Sembunyikan' : 'Perlihatkan'}
                    title={show ? 'Sembunyikan' : 'Perlihatkan'}
                  >
                    {show ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <button
                    type="button"
                    onClick={handlePasteFromClipboard}
                    className="text-slate-200 hover:text-white transition"
                    aria-label="Paste dari clipboard"
                    title="Paste dari clipboard"
                  >
                    <FiClipboard />
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-300/80">
                  *Hubungi admin server untuk mendapatkan key.
                </p>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 select-none text-slate-100 text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-white/30 bg-transparent"
                  />
                  Ingat saya
                </label>
                {key.trim() && key.trim().length >= 6 ? (
                  <span className="inline-flex items-center gap-1 text-emerald-300 text-xs">
                    <FiCheck /> Siap masuk
                  </span>
                ) : (
                  <span className="text-slate-300 text-xs">Minimal 6 karakter</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition disabled:opacity-70"
              >
                {loading ? 'Memproses…' : (<><FiLogIn /> Masuk</>)}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-slate-300 text-xs mt-4">
            Keamanan: kunci disimpan {remember ? 'di penyimpanan perangkat (localStorage)' : 'sementara (sessionStorage)'}.
          </p>
        </div>
      </div>
    </section>
  )
}
