import { useState, useEffect } from 'react'
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi'

export default function Pengaduan() {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [pengaduanList, setPengaduanList] = useState([])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    try {
      const res = await fetch('http://localhost:3700/api/pengaduan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const data = await res.json()
        setPengaduanList([data, ...pengaduanList])
        setSuccess(true)
        setForm({ nama: '', email: '', pesan: '' })
      } else {
        console.error('Gagal kirim pengaduan:', res.statusText)
      }
    } catch (err) {
      console.error('Error submit:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const res = await fetch('http://localhost:3700/api/pengaduan')
        if (res.ok) {
          const data = await res.json()
          setPengaduanList(data)
        }
      } catch (err) {
        console.error('Error fetch:', err)
      }
    }
    fetchPengaduan()
  }, [])

  const StatusBadge = ({ status }) => {
    let color = 'bg-gray-100 text-gray-600'
    let icon = <FiClock />
    if (status === 'Diproses') {
      color = 'bg-yellow-100 text-yellow-700'
      icon = <FiClock />
    } else if (status === 'Selesai') {
      color = 'bg-green-100 text-green-700'
      icon = <FiCheckCircle />
    }
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}
      >
        {icon} {status}
      </span>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 pt-12 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero mini */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Formulir Pengaduan
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Sampaikan keluhan, masukan, atau laporan Anda kepada Dinas Sosial
            dengan mudah melalui form di bawah ini.
          </p>
        </div>

        {/* Card form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-12">
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
              ✅ Pengaduan berhasil dikirim. Terima kasih atas partisipasi Anda!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FiUser className="text-slate-400 mr-2" />
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="flex-1 focus:outline-none"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FiMail className="text-slate-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="flex-1 focus:outline-none"
                  placeholder="Masukkan email aktif"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Pesan / Aduan
              </label>
              <div className="flex items-start border rounded-lg px-3 py-2">
                <FiMessageSquare className="text-slate-400 mr-2 mt-1" />
                <textarea
                  name="pesan"
                  value={form.pesan}
                  onChange={handleChange}
                  className="flex-1 focus:outline-none h-28 resize-none"
                  placeholder="Tuliskan aduan Anda di sini..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2
                bg-blue-600 hover:bg-blue-700 text-white font-semibold
                py-3 rounded-xl transition"
            >
              {loading ? 'Mengirim...' : (
                <>
                  <FiSend /> Kirim Aduan
                </>
              )}
            </button>
          </form>
        </div>

        {/* List pengaduan */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Daftar Pengaduan
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pengaduanList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800">{item.nama}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-sm text-slate-500 mb-2">{item.email}</p>
                <p className="text-slate-700 line-clamp-3">{item.pesan}</p>
                <div className="text-xs text-slate-500 mt-3">
                  📅 {new Date(item.createdAt || item.tanggal).toLocaleDateString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
