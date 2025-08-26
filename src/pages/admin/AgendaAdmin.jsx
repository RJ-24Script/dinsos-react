import { useEffect, useState } from 'react'
const API = 'http://localhost:3700/api'
const H = () => ({ 'Content-Type':'application/json', 'x-admin-key': localStorage.getItem('ADMIN_KEY') || '' })

export default function AgendaAdmin() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ id:null, judul:'', lokasi:'', deskripsi:'', mulai:'', selesai:'', isPublished:true })
  const [mode, setMode] = useState('create')

  const load = async () => {
    const res = await fetch(`${API}/admin/agenda`, { headers: H() })
    if (res.status === 401) return (window.location.href='/admin/login')
    setList(await res.json())
  }
  useEffect(()=>{ load() },[])

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      selesai: form.selesai || null
    }
    const url = form.id ? `${API}/admin/agenda/${form.id}` : `${API}/admin/agenda`
    const method = form.id ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: H(), body: JSON.stringify(payload) })
    if (res.ok) {
      setForm({ id:null, judul:'', lokasi:'', deskripsi:'', mulai:'', selesai:'', isPublished:true })
      setMode('create'); load()
    } else alert('Gagal simpan')
  }

  const edit = (it) => {
    setMode('edit')
    setForm({
      id: it.id,
      judul: it.judul,
      lokasi: it.lokasi || '',
      deskripsi: it.deskripsi || '',
      mulai: it.mulai ? it.mulai.slice(0,16) : '',
      selesai: it.selesai ? it.selesai.slice(0,16) : '',
      isPublished: !!it.isPublished
    })
  }

  const removeItem = async (id) => {
    if (!confirm('Hapus agenda ini?')) return
    const res = await fetch(`${API}/admin/agenda/${id}`, { method:'DELETE', headers: H() })
    if (res.ok) load(); else alert('Gagal hapus')
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Admin • Agenda</h1>

        {/* Form */}
        <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
          <h2 className="font-semibold mb-3">{mode==='create'?'Tambah Agenda':'Edit Agenda'}</h2>
          <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Judul</label>
              <input className="w-full border rounded-lg px-3 py-2"
                value={form.judul} onChange={e=>setForm(f=>({...f, judul:e.target.value}))} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Mulai</label>
              <input type="datetime-local" className="w-full border rounded-lg px-3 py-2"
                value={form.mulai} onChange={e=>setForm(f=>({...f, mulai:e.target.value}))} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Selesai (opsional)</label>
              <input type="datetime-local" className="w-full border rounded-lg px-3 py-2"
                value={form.selesai} onChange={e=>setForm(f=>({...f, selesai:e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm mb-1">Lokasi (opsional)</label>
              <input className="w-full border rounded-lg px-3 py-2"
                value={form.lokasi} onChange={e=>setForm(f=>({...f, lokasi:e.target.value}))} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Deskripsi (opsional)</label>
              <textarea className="w-full border rounded-lg px-3 py-2 h-24"
                value={form.deskripsi} onChange={e=>setForm(f=>({...f, deskripsi:e.target.value}))} />
            </div>
            <div className="flex items-center gap-2">
              <input id="pub" type="checkbox" checked={form.isPublished}
                onChange={e=>setForm(f=>({...f, isPublished:e.target.checked}))} />
              <label htmlFor="pub">Published</label>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">{mode==='create'?'Tambah':'Simpan'}</button>
              {mode==='edit' && (
                <button type="button" onClick={()=>{setMode('create'); setForm({ id:null, judul:'', lokasi:'', deskripsi:'', mulai:'', selesai:'', isPublished:true })}}
                  className="px-4 py-2 rounded-lg border">Batal</button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Judul</th>
                <th className="p-3 text-left">Mulai</th>
                <th className="p-3 text-left">Selesai</th>
                <th className="p-3 text-left">Lokasi</th>
                <th className="p-3 text-left">Publik</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map(it=>(
                <tr key={it.id} className="border-t">
                  <td className="p-3 font-medium">{it.judul}</td>
                  <td className="p-3">{new Date(it.mulai).toLocaleString('id-ID')}</td>
                  <td className="p-3">{it.selesai ? new Date(it.selesai).toLocaleString('id-ID') : '-'}</td>
                  <td className="p-3">{it.lokasi || '-'}</td>
                  <td className="p-3">{it.isPublished ? 'Ya':'Tidak'}</td>
                  <td className="p-3 text-right">
                    <button onClick={()=>edit(it)} className="px-2 py-1 text-blue-600 hover:underline">Edit</button>
                    <button onClick={()=>removeItem(it.id)} className="px-2 py-1 text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
              {list.length===0 && <tr><td colSpan={6} className="p-6 text-center text-slate-500">Belum ada data</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
