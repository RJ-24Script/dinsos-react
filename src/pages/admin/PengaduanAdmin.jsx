import { useEffect, useMemo, useState } from 'react'

const API = 'http://localhost:3700/api'

export default function PengaduanAdmin() {
  const [list, setList] = useState([])
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('Semua')
  const key = localStorage.getItem('ADMIN_KEY')

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'x-admin-key': key || ''
  }), [key])

  const fetchData = async () => {
    const res = await fetch(`${API}/admin/pengaduan`, { headers })
    if (res.status === 401) return (window.location.href = '/admin/login')
    const data = await res.json()
    setList(data)
  }

  useEffect(() => { fetchData() }, [])

  const updateStatus = async (id, status) => {
    const prev = [...list]
    setList(l => l.map(x => x.id === id ? { ...x, status } : x))
    const res = await fetch(`${API}/admin/pengaduan/${id}/status`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status })
    })
    if (!res.ok) {
      setList(prev) // rollback
      alert('Gagal update status')
    }
  }

  const removeItem = async (id) => {
    const ok = confirm('Hapus pengaduan ini?')
    if (!ok) return
    const prev = [...list]
    setList(l => l.filter(x => x.id !== id))
    const res = await fetch(`${API}/admin/pengaduan/${id}`, {
      method: 'DELETE',
      headers
    })
    if (!res.ok) {
      setList(prev) // rollback
      alert('Gagal hapus')
    }
  }

  const filtered = list.filter(item => {
    const passTab = tab === 'Semua' ? true : item.status === tab
    const passQ = [item.nama, item.email, item.pesan].join(' ').toLowerCase().includes(q.toLowerCase())
    return passTab && passQ
  })

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold">Admin • Pengaduan</h1>
          <button
            onClick={() => { localStorage.removeItem('ADMIN_KEY'); window.location.href='/admin/login' }}
            className="text-sm text-red-600 hover:underline"
          >
            Keluar
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white border rounded-xl p-4 shadow-sm mb-5 flex flex-wrap gap-3 items-center">
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Cari nama/email/pesan..."
            className="border rounded-lg px-3 py-2 w-full md:w-80"
          />
          <div className="flex gap-2">
            {['Semua','Pending','Diproses','Selesai'].map(t => (
              <button
                key={t}
                onClick={()=>setTab(t)}
                className={`px-3 py-2 rounded-lg text-sm border ${tab===t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}
              >{t}</button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={fetchData} className="px-3 py-2 rounded-lg border">Refresh</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3">Nama</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Pesan</th>
                <th className="text-left p-3">Tanggal</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="p-3 font-medium">{item.nama}</td>
                  <td className="p-3 text-slate-600">{item.email}</td>
                  <td className="p-3 max-w-md">
                    <div className="line-clamp-3">{item.pesan}</div>
                  </td>
                  <td className="p-3">{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(e)=>updateStatus(item.id, e.target.value)}
                      className="border rounded-md px-2 py-1"
                    >
                      <option>Pending</option>
                      <option>Diproses</option>
                      <option>Selesai</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={()=>removeItem(item.id)} className="px-2 py-1 text-red-600 hover:underline">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-slate-500">Belum ada data</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
