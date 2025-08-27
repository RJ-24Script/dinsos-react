import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { FILE_BASE } from '../lib/fileBase'

function fmt(dt) {
  try { return new Date(dt).toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' }) }
  catch { return dt }
}

export default function Berita() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let on = true
    ;(async () => {
      try {
        const res = await api.get('/berita') // GET /api/berita
        if (on) setItems(Array.isArray(res.data) ? res.data : [])
      } catch (e) {
        if (on) setError(e?.response?.data?.error || e?.message || 'Gagal memuat berita')
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
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Berita</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Informasi & kabar terbaru dari Dinas Sosial Kabupaten Manokwari Selatan.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-slate-500">Belum ada berita.</div>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <li key={it.id} className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
                {/* Thumbnail */}
                {it.thumbnail && (
                  <img
                    src={`${FILE_BASE}${it.thumbnail}`}   // ← gunakan FILE_BASE
                    alt={it.judul}
                    className="w-full h-44 object-cover"
                    onError={(e)=>{ e.currentTarget.src='https://placehold.co/800x400?text=Tidak+ada+gambar' }}
                  />
                )}

                <div className="p-5">
                  <div className="text-xs text-slate-500 mb-2">
                    {it.penulis ? `🖊️ ${it.penulis} · ` : ''}{fmt(it.createdAt)}
                  </div>

                  <h2 className="text-lg font-semibold text-slate-800 line-clamp-2">{it.judul}</h2>

                  <p className="mt-2 text-slate-600 text-sm line-clamp-3 whitespace-pre-line">{it.isi}</p>

                  <div className="mt-4">
                    <Link
                      to={`/berita/${it.id}`}          // ← “Baca selengkapnya” berfungsi
                      className="inline-block text-sm text-blue-600 hover:underline"
                    >
                      Baca selengkapnya →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
