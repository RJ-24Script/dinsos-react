import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import {
  FiBell,
  FiCalendar,
  FiInbox,
  FiExternalLink,
  FiRefreshCw,
  FiDownload,
  FiFileText, // 👈 ikon Berita
} from 'react-icons/fi'

const cardCls =
  'group bg-white border rounded-2xl p-5 hover:shadow-lg transition relative overflow-hidden'

export default function AdminDashboard() {
  const nav = useNavigate()
  const adminKey = localStorage.getItem('ADMIN_KEY')
  const [stats, setStats] = useState({
    pengumuman: 0,
    agenda: 0,
    pengaduan: 0,
    dokumen: 0,
    berita: 0,          // 👈 tambahkan berita
    loading: true,
  })

  useEffect(() => {
    if (!adminKey) {
      nav('/admin/login', { replace: true })
      return
    }
    let on = true
    ;(async () => {
      try {
        const [p1, p2, p3, p4, p5] = await Promise.all([
          api.get('/admin/pengumuman', { headers: { 'x-admin-key': adminKey } }),
          api.get('/admin/agenda', { headers: { 'x-admin-key': adminKey } }),
          api.get('/admin/pengaduan', { headers: { 'x-admin-key': adminKey } }),
          api.get('/admin/dokumen', { headers: { 'x-admin-key': adminKey } }),
          api.get('/admin/berita', { headers: { 'x-admin-key': adminKey } }), // 👈 ambil berita
        ])
        if (!on) return
        setStats({
          pengumuman: Array.isArray(p1.data) ? p1.data.length : 0,
          agenda: Array.isArray(p2.data) ? p2.data.length : 0,
          pengaduan: Array.isArray(p3.data) ? p3.data.length : 0,
          dokumen: Array.isArray(p4.data) ? p4.data.length : 0,
          berita: Array.isArray(p5.data) ? p5.data.length : 0,   // 👈 simpan total berita
          loading: false,
        })
      } catch (e) {
        if (e?.response?.status === 401) {
          localStorage.removeItem('ADMIN_KEY')
          nav('/admin/login', { replace: true })
          return
        }
        setStats(s => ({ ...s, loading: false }))
        console.error('Load stats gagal:', e?.response || e)
      }
    })()
    return () => { on = false }
  }, [adminKey, nav])

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Admin • Dashboard</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-100"
              title="Refresh"
            >
              <FiRefreshCw className="text-sm" /> Refresh
            </button>
            <button
              onClick={() => { localStorage.removeItem('ADMIN_KEY'); nav('/admin/login', { replace: true }) }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-red-600 hover:bg-red-50"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* Kartu akses cepat */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card to="/admin/pengumuman" icon={<FiBell />} title="Pengumuman"
                desc="Kelola pengumuman situs" countLabel="Total"
                countValue={stats.pengumuman} loading={stats.loading} />
          <Card to="/admin/agenda" icon={<FiCalendar />} title="Agenda"
                desc="Jadwal kegiatan" countLabel="Total"
                countValue={stats.agenda} loading={stats.loading} />
          <Card to="/admin/pengaduan" icon={<FiInbox />} title="Pengaduan"
                desc="Laporan masyarakat" countLabel="Total"
                countValue={stats.pengaduan} loading={stats.loading} />
          <Card to="/admin/dokumen" icon={<FiDownload />} title="Dokumen"
                desc="Kelola dokumen publik" countLabel="Total"
                countValue={stats.dokumen} loading={stats.loading} />
          <Card to="/admin/berita" icon={<FiFileText />} title="Berita"   // 👈 kartu baru
                desc="Kelola berita situs" countLabel="Total"
                countValue={stats.berita} loading={stats.loading} />
        </div>

        <div className="mt-8 text-sm text-slate-500">
          Tip: simpan Admin Key di localStorage. Jika diminta login lagi, masukkan key yang sama.
        </div>
      </div>
    </section>
  )
}

function Card({ to, icon, title, desc, countLabel, countValue, loading }) {
  return (
    <Link to={to} className={cardCls}>
      <div className="flex items-center justify-between">
        <div className="text-2xl opacity-70">{icon}</div>
        <FiExternalLink className="opacity-0 group-hover:opacity-100 transition" />
      </div>
      <div className="mt-4">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-slate-600 text-sm">{desc}</div>
      </div>
      <div className="mt-4 text-sm">
        {loading ? (
          <div className="animate-pulse h-5 w-28 bg-slate-200 rounded"></div>
        ) : (
          <span className="inline-flex items-center gap-2">
            <span className="text-slate-500">{countLabel}:</span>
            <span className="font-semibold">{countValue}</span>
          </span>
        )}
      </div>
    </Link>
  )
}
