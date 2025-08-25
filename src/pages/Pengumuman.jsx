import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Pengumuman(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let on = true
    ;(async () => {
      try{
        const { data } = await api.get('/pengumuman')
        if (on) setItems(Array.isArray(data) ? data : [])
      }catch(e){
        setError(e?.message || 'Gagal memuat pengumuman')
      }finally{
        setLoading(false)
      }
    })()
    return () => { on = false }
  }, [])

  if (loading) return <section className="container mx-auto px-4 py-16">Memuat…</section>
  if (error)   return <section className="container mx-auto px-4 py-16 text-red-600">Error: {error}</section>

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6" data-aos="fade-up">Pengumuman & Agenda</h1>
      <ul className="space-y-3">
        {items.map((it,idx)=>(
          <li key={idx} className="p-4 rounded-xl bg-white border" data-aos="fade-up">
            <div className="text-sm opacity-70">{it.date}</div>
            <div className="font-semibold">{it.title}</div>
            {it.location && <div className="text-sm opacity-80">{it.location}</div>}
            {it.link && <a href={it.link} className="text-blue-600 hover:underline text-sm">Detail</a>}
          </li>
        ))}
      </ul>
    </section>
  )
}
