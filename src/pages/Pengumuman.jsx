import { useEffect, useState } from 'react'
import api from '../lib/api'

function fmt(dt){ try { return dt ? new Date(dt).toLocaleString('id-ID') : null } catch { return dt } }

export default function Pengumuman(){
  const [items,setItems]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(null)
  useEffect(()=>{ let on=true;(async()=>{try{const r=await api.get('/pengumuman'); if(on) setItems(Array.isArray(r.data)?r.data:[]); }catch(e){ if(on) setError(e?.response?.data?.error||e.message)}finally{ if(on) setLoading(false)}})(); return ()=>{on=false} },[])
  if(loading) return <section className="container mx-auto px-4 py-16">Memuat…</section>
  if(error) return <section className="container mx-auto px-4 py-16 text-red-600">Error: {error}</section>
  return (
    <section className="min-h-screen bg-slate-50 pt-12 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Pengumuman</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Informasi resmi dari Dinas Sosial.</p>
        </div>
        {items.length===0 ? <div className="text-center text-slate-500">Belum ada pengumuman aktif.</div> :
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map(it=>(
              <li key={it.id} className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-slate-800">{it.judul}</h2>
                <div className="mt-1 text-xs text-slate-500">
                  Dibuat: {fmt(it.createdAt)}
                  {(it.startsAt||it.endsAt)&&<> · Aktif: {it.startsAt?fmt(it.startsAt):'—'} s/d {it.endsAt?fmt(it.endsAt):'—'}</>}
                </div>
                <p className="mt-3 text-slate-700 whitespace-pre-line line-clamp-6">{it.isi}</p>
              </li>
            ))}
          </ul>}
      </div>
    </section>
  )
}
