import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [key, setKey] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!key.trim()) return setErr('Masukkan Admin Key')
    localStorage.setItem('ADMIN_KEY', key.trim())
    navigate('/admin/pengaduan', { replace: true })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm bg-white border rounded-2xl shadow p-6">
        <h1 className="text-xl font-bold mb-4">Login Admin</h1>
        {err && <div className="mb-3 text-sm text-red-600">{err}</div>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Admin Key</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              value={key}
              onChange={(e)=>setKey(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold">
            Masuk
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-3">
          *Hubungi admin server untuk mendapatkan key.
        </p>
      </div>
    </section>
  )
}
