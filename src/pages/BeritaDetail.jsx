import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../lib/api'
import { FILE_BASE } from '../lib/fileBase'

export default function BeritaDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let on = true
    ;(async () => {
      try {
        const res = await api.get(`/berita/${id}`)
        if (on) setItem(res.data)
      } catch (e) {
        if (on) setError(e?.response?.data?.error || e?.message || 'Gagal memuat berita')
      } finally {
        if (on) setLoading(false)
      }
    })()
    return () => { on = false }
  }, [id])

  if (loading) return <section className="container mx-auto px-4 py-16">Memuat…</section>
  if (error) return <section className="container mx-auto px-4 py-16 text-red-600">Error: {error}</section>
  if (!item) return <section className="container mx-auto px-4 py-16">Berita tidak ditemukan.</section>

  return (
    <section className="min-h-screen bg-slate-50 pt-12 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/berita" className="text-sm text-blue-600 hover:underline">← Kembali ke daftar</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4">{item.judul}</h1>

        {item.thumbnail && (
          <img
            src={`${FILE_BASE}${item.thumbnail}`}
            alt={item.judul}
            className="w-full h-64 object-cover rounded-xl mb-6"
            onError={(e)=>{ e.currentTarget.src='https://placehold.co/1000x500?text=Tidak+ada+gambar' }}
          />
        )}

        <div className="text-slate-600 whitespace-pre-line">{item.isi}</div>
        <div className="mt-6 text-sm text-slate-500">
          {item.penulis ? `🖊️ ${item.penulis}` : ''} · {new Date(item.createdAt).toLocaleString('id-ID')}
        </div>
      </div>
    </section>
  )
}
