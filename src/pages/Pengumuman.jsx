import { useEffect, useState } from 'react'
import api from '../lib/api'

function fmt(dt) {
  if (!dt) return null
  try { return new Date(dt).toLocaleString('id-ID') } catch { return dt }
}

export default function Pengumuman() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let on = true
    ;(async () => {
      try {
        const res = await api.get('/pengumuman') // GET /api/pengumuman (publik)
        if (on) setItems(Array.isArray(res.data) ? res.data : [])
      } catch (e) {
        if (on) setError(e?.message || 'Gagal memuat pengumuman')
      } finally {
        if (on) setLoading(false)
      }
    })()
    return () => { on = false }
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-slate-500">Memuat…</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-red-600">Error: {error}</div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-slate-50 pt-12 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2" data-aos="fade-up">
            Pengumuman
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="50">
            Informasi resmi dan pemberitahuan terkini dari Dinas Sosial.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-slate-500">Belum ada pengumuman aktif.</div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map((it) => (
              <li
                key={it.id}
                className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition"
                data-aos="fade-up"
              >
                <h2 className="text-lg font-semibold text-slate-800">{it.judul}</h2>

                <div className="mt-1 text-xs text-slate-500">
                  Dibuat: {fmt(it.createdAt)}
                  {it.startsAt || it.endsAt ? (
                    <>
                      {' · '}
                      Aktif: {it.startsAt ? fmt(it.startsAt) : '—'} s/d {it.endsAt ? fmt(it.endsAt) : '—'}
                    </>
                  ) : null}
                </div>

                <p className="mt-3 text-slate-700 whitespace-pre-line line-clamp-6">
                  {it.isi}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
