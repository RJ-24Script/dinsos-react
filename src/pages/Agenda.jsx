import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Agenda(){
  const [items,setItems]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(null)
  useEffect(()=>{ let on=true;(async()=>{try{const r=await api.get('/agenda/upcoming'); if(on) setItems(Array.isArray(r.data)?r.data:[])}catch(e){ if(on) setError(e?.response?.data?.error||e.message)}finally{ if(on) setLoading(false)}})(); return ()=>{on=false} },[])
  if(loading) return <section className="container mx-auto px-4 py-16">Memuat‚Ä¶</section>
  if(error) return <section className="container mx-auto px-4 py-16 text-red-600">Error: {error}</section>
  return (
    <section className="min-h-screen bg-slate-50 pt-12 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Agenda</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Jadwal kegiatan mendatang & sedang berlangsung.</p>
        </div>
        {items.length===0 ? <div className="text-center text-slate-500">Belum ada agenda mendatang.</div> :
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map(it=>(
              <li key={it.id} className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-slate-800">{it.judul}</h2>
                <p className="text-sm text-slate-600 mt-1">
                  ÔøΩÔøΩÔ∏è {new Date(it.mulai).toLocaleString('id-ID')}
                  {it.selesai?` ‚Äì ${new Date(it.selesai).toLocaleString('id-ID')}`:''}
                </p>
                {it.lokasi && <p className="text-sm text-slate-600 mt-1">Ì≥ç {it.lokasi}</p>}
                {it.deskripsi && <p className="text-slate-700 mt-3 whitespace-pre-line">{it.deskripsi}</p>}
              </li>
            ))}
          </ul>}
      </div>
    </section>
  )
}
