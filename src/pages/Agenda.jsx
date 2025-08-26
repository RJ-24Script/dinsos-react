import { useEffect, useState } from 'react'

const API = 'http://localhost:3700/api' // ganti kalau di prod

export default function Agenda() {
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${API}/agenda/upcoming`)
        const json = await r.json()
        setUpcoming(json || [])
      } catch (e) {
        console.error('Fetch agenda gagal:', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="min-h-screen bg-slate-50 pt-12 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Agenda
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Jadwal kegiatan Dinas Sosial – yang akan datang dan sedang berlangsung.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">Memuat...</div>
        ) : upcoming.length === 0 ? (
          <div className="text-center text-slate-500">Belum ada agenda mendatang.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((it) => (
              <article key={it.id} className="bg-white rounded-xl border p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-800">{it.judul}</h2>
                <p className="text-sm text-slate-600 mt-1">
                  🗓️ {new Date(it.mulai).toLocaleString('id-ID')}
                  {it.selesai ? ` – ${new Date(it.selesai).toLocaleString('id-ID')}` : ''}
                </p>
                {it.lokasi && <p className="text-sm text-slate-600 mt-1">📍 {it.lokasi}</p>}
                {it.deskripsi && (
                  <p className="text-slate-700 mt-3 whitespace-pre-line">{it.deskripsi}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
