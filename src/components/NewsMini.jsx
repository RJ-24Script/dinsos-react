import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import NewsCard from './NewsCard'

export default function NewsMini() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let on = true
    ;(async () => {
      try {
        const res = await api.get('/berita') // GET /api/berita
        const arr = Array.isArray(res.data) ? res.data : []
        if (on) setItems(arr.slice(0, 3)) // ambil 3 terbaru
      } catch (e) {
        if (on) setError(e?.message || 'Gagal memuat berita')
      } finally {
        if (on) setLoading(false)
      }
    })()
    return () => { on = false }
  }, [])

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Berita Terbaru</h2>
          <p className="text-slate-600 text-sm">Update resmi dari Dinas Sosial</p>
        </div>
        <Link to="/berita" className="text-sm text-blue-600 hover:underline">Lihat semua →</Link>
      </div>

      {loading ? (
        <ul className="grid gap-5 md:grid-cols-3">
          {[...Array(3)].map((_,i)=>(
            <li key={i} className="bg-white border rounded-2xl p-5">
              <div className="h-40 bg-slate-200 rounded-lg animate-pulse" />
              <div className="mt-4 h-4 w-28 bg-slate-200 rounded animate-pulse" />
              <div className="mt-2 h-6 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="mt-2 h-16 w-full bg-slate-200 rounded animate-pulse" />
            </li>
          ))}
        </ul>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : items.length === 0 ? (
        <div className="text-slate-500">Belum ada berita.</div>
      ) : (
        <ul className="grid gap-5 md:grid-cols-3">
          {items.map(item => <NewsCard key={item.id} item={item} />)}
        </ul>
      )}
    </section>
  )
}
