import { useEffect, useState } from 'react'
import api from '../../lib/api'
import { FiTrash2, FiEdit, FiPlus } from 'react-icons/fi'

export default function DokumenAdmin() {
  const adminKey = localStorage.getItem('ADMIN_KEY')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ judul:'', deskripsi:'', fileUrl:'', kategori:'' })

  const load = async () => {
    const res = await api.get('/admin/dokumen', { headers: { 'x-admin-key': adminKey } })
    setItems(res.data)
  }

  useEffect(()=>{ load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/admin/dokumen', form, { headers: { 'x-admin-key': adminKey } })
    setForm({ judul:'', deskripsi:'', fileUrl:'', kategori:'' })
    load()
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin • Dokumen</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-white p-5 rounded-xl border">
        <input type="text" placeholder="Judul" value={form.judul}
          onChange={e=>setForm({...form, judul:e.target.value})} className="w-full border rounded px-3 py-2"/>
        <textarea placeholder="Deskripsi" value={form.deskripsi}
          onChange={e=>setForm({...form, deskripsi:e.target.value})} className="w-full border rounded px-3 py-2"/>
        <input type="text" placeholder="URL File (contoh: https://.../file.pdf)" value={form.fileUrl}
          onChange={e=>setForm({...form, fileUrl:e.target.value})} className="w-full border rounded px-3 py-2"/>
        <input type="text" placeholder="Kategori" value={form.kategori}
          onChange={e=>setForm({...form, kategori:e.target.value})} className="w-full border rounded px-3 py-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FiPlus /> Tambah Dokumen
        </button>
      </form>

      <ul className="grid gap-3">
        {items.map(it=>(
          <li key={it.id} className="bg-white border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{it.judul}</div>
              <div className="text-sm text-slate-500">{it.deskripsi}</div>
            </div>
            <button
              onClick={async()=>{
                await api.delete(`/admin/dokumen/${it.id}`, { headers: { 'x-admin-key': adminKey } })
                load()
              }}
              className="text-red-600 hover:text-red-800"
            ><FiTrash2 /></button>
          </li>
        ))}
      </ul>
    </section>
  )
}
