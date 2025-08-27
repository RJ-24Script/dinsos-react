import { useEffect, useState } from 'react'
import api from '../../lib/api'
import { FiTrash2, FiPlus } from 'react-icons/fi'

export default function BeritaAdmin() {
  const adminKey = localStorage.getItem('ADMIN_KEY')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ judul:'', isi:'', penulis:'', thumbnail:'' })
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const res = await api.get('/admin/berita', { headers: { 'x-admin-key': adminKey } })
    setItems(res.data)
  }

  useEffect(()=>{ load() }, [])

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('http://localhost:3700/api/admin/berita/upload', {
      method: 'POST',
      headers: { 'x-admin-key': adminKey },
      body: fd
    })
    const data = await res.json()
    setForm(f => ({ ...f, thumbnail: data.url }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.post('/admin/berita', form, { headers: { 'x-admin-key': adminKey } })
    setForm({ judul:'', isi:'', penulis:'', thumbnail:'' })
    setLoading(false)
    load()
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin • Berita</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-white p-5 rounded-xl border">
        <input type="text" placeholder="Judul" value={form.judul}
          onChange={e=>setForm({...form, judul:e.target.value})} className="w-full border rounded px-3 py-2"/>
        <textarea placeholder="Isi berita" value={form.isi}
          onChange={e=>setForm({...form, isi:e.target.value})} className="w-full border rounded px-3 py-2 h-32"/>
        <input type="text" placeholder="Penulis" value={form.penulis}
          onChange={e=>setForm({...form, penulis:e.target.value})} className="w-full border rounded px-3 py-2"/>
        <input type="file" onChange={handleFile} className="w-full border rounded px-3 py-2"/>
        {form.thumbnail && <img src={`http://localhost:3700${form.thumbnail}`} alt="preview"
                                className="h-32 object-cover rounded mt-2" />}
        <button type="submit" disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FiPlus /> {loading ? 'Menyimpan...' : 'Tambah Berita'}
        </button>
      </form>

      <ul className="grid gap-3">
        {items.map(it=>(
          <li key={it.id} className="bg-white border rounded-xl p-4 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              {it.thumbnail && (
                <img src={`http://localhost:3700${it.thumbnail}`} alt={it.judul}
                     className="w-16 h-16 object-cover rounded"/>
              )}
              <div>
                <div className="font-semibold">{it.judul}</div>
                <div className="text-sm text-slate-500">{it.penulis}</div>
              </div>
            </div>
            <button
              onClick={async()=>{
                await api.delete(`/admin/berita/${it.id}`, { headers: { 'x-admin-key': adminKey } })
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
