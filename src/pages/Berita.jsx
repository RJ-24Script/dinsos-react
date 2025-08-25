// src/pages/Berita.jsx
import { useEffect, useState } from 'react'
import api from '../lib/api'
import { NewsCard } from '../components/Cards.jsx'

export default function Berita(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let on = true
    ;(async () => {
      try {
        const { data } = await api.get('/berita')
        if (on) setItems(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e?.message || 'Gagal memuat berita')
      } finally {
        setLoading(false)
      }
    })()
    return () => { on = false }
  }, [])

  if (loading) return <section className="container mx-auto px-4 py-16">Memuat berita…</section>
  if (error)   return <section className="container mx-auto px-4 py-16 text-red-600">Error: {error}</section>

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6" data-aos="fade-up">Berita</h1>
      {items.length === 0 ? (
        <div className="opacity-70">Belum ada data.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, idx)=>(<NewsCard key={idx} item={item} />))}
        </div>
      )}
    </section>
  )
}
