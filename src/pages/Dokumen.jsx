import { useEffect, useState } from 'react'
import api from '../lib/api'
import { FiDownload } from 'react-icons/fi'

export default function Dokumen() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let on = true
    ;(async () => {
      try {
        const res = await api.get('/dokumen')
        if (on) setItems(Array.isArray(res.data) ? res.data : [])
      } catch (e) {
        if (on) setError(e?.message || 'Gagal memuat dokumen')
      } finally {
        if (on) setLoading(false)
      }
    })()
    return () => { on = false }
  }, [])

  if (loading) return <section className="container mx-auto px-4 py-16">Memuat…</section>
  if (error) return <section className="container mx-auto px-4 py-16 text-red-600">Error: {error}</section>

  return (
    <section className="min-h-screen bg-slate-50 pt-12 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Dokumen</h1>
        {items.length === 0 ? (
          <div className="text-slate-500">Belum ada dokumen.</div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map((it) => (
              <li key={it.id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <h2 className="text-lg font-semibold">{it.judul}</h2>
                {it.deskripsi && <p className="text-slate-600 text-sm mt-1">{it.deskripsi}</p>}
                <div className="flex items-center justify-between mt-3">
                  {it.kategori && <span className="text-xs px-2 py-1 rounded bg-slate-100">{it.kategori}</span>}
                  <a href={it.fileUrl} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                    <FiDownload /> Unduh
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
