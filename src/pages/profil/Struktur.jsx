import { useEffect, useMemo, useRef, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import { FiUsers, FiSearch, FiDownload } from 'react-icons/fi'

/* ====== DATA (ganti sesuai kebutuhan) ====== */
const ORG = {
  head: { jabatan: 'Kepala Dinas', nama: '—', foto: '/assets/img/kepala-dinas.jpg' },
  secretary: { jabatan: 'Sekretaris Dinas', nama: '—', foto: '/assets/img/sekretaris.jpg' },
  lanes: [
    { group: 'Bidang Rehabilitasi Sosial', units: [
      'Seksi Rehsos Anak & Lanjut Usia',
      'Seksi Rehsos Penyandang Disabilitas',
      'Seksi Rehsos Tuna Sosial & Korban Perdagangan Orang',
    ]},
    { group: 'Bidang Perlindungan & Jaminan Sosial', units: [
      'Seksi Linjamsos Korban Bencana',
      'Seksi Linjamsos Kedaruratan & Logistik',
      'Seksi Jaminan Sosial',
    ]},
    { group: 'Bidang Pemberdayaan Sosial', units: [
      'Seksi Pemberdayaan Masyarakat',
      'Seksi PSKS & Kelembagaan',
      'Seksi Kemitraan Sosial',
    ]},
    { group: 'Sekretariat', units: [
      'Subbag Perencanaan & Keuangan',
      'Subbag Umum & Kepegawaian',
    ]},
    { group: 'Pengelolaan Data Kesejahteraan (DTKS)', units: [
      'Seksi Pengumpulan & Verivali Data',
      'Seksi Integrasi & Pemanfaatan Data',
    ]},
  ],
}

/* ====== UI kecil ====== */
function CardPerson({ title, name, img, nodeRef }) {
  return (
    <div ref={nodeRef} className="rounded-2xl border bg-white shadow-sm p-5 text-center relative">
      <img
        src={img || 'https://placehold.co/160x160?text=Foto'}
        onError={(e)=>{ e.currentTarget.src='https://placehold.co/160x160?text=Foto' }}
        alt={title}
        className="w-24 h-24 object-cover rounded-xl mx-auto"
      />
      <div className="text-xs text-slate-500 mt-2">{title}</div>
      <div className="font-semibold">{name || '—'}</div>
    </div>
  )
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-700">
      {children}
    </span>
  )
}

/* ====== Helper: hitung posisi tengah elemen relatif ke container ====== */
function centerOf(el, root) {
  const eb = el.getBoundingClientRect()
  const rb = root.getBoundingClientRect()
  return {
    x: eb.left - rb.left + eb.width / 2,
    y: eb.top - rb.top + eb.height / 2,
  }
}

/* ====== Komponen utama ====== */
export default function Struktur() {
  const [query, setQuery] = useState('')

  // refs untuk node yang dihubungkan
  const wrapRef = useRef(null)
  const headRef = useRef(null)
  const secRef = useRef(null)
  const laneRefs = useRef([]) // array of refs utk 3 lane pertama

  const [paths, setPaths] = useState({ headToSec: '', secToLanes: [] })

  // flatten unit untuk daftar + search
  const unitsFlat = useMemo(() => {
    const arr = []
    ORG.lanes.forEach(l => l.units.forEach(u => arr.push({ group: l.group, unit: u })))
    return arr
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return unitsFlat
    return unitsFlat.filter(x =>
      x.unit.toLowerCase().includes(q) || x.group.toLowerCase().includes(q)
    )
  }, [query, unitsFlat])

  // hitung path SVG (melengkung) antar node
  useEffect(() => {
    if (!wrapRef.current || !headRef.current || !secRef.current) return

    const compute = () => {
      const root = wrapRef.current
      const p1 = centerOf(headRef.current, root)
      const p2 = centerOf(secRef.current, root)

      // kurva halus: cubic bezier
      const dy = Math.max(30, (p2.y - p1.y) * 0.6)
      const headToSec = `M ${p1.x},${p1.y+30} C ${p1.x},${p1.y+dy} ${p2.x},${p2.y-dy} ${p2.x},${p2.y-30}`

      const secToLanes = laneRefs.current.slice(0,3).map((ref) => {
        if (!ref) return ''
        const p3 = centerOf(ref, root)
        const dy2 = Math.max(30, (p3.y - p2.y) * 0.6)
        return `M ${p2.x},${p2.y+30} C ${p2.x},${p2.y+dy2} ${p3.x},${p3.y-dy2} ${p3.x},${p3.y-30}`
      })

      setPaths({ headToSec, secToLanes })
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(document.documentElement)
    ro.observe(wrapRef.current)
    ro.observe(headRef.current)
    ro.observe(secRef.current)
    laneRefs.current.forEach(r => r && ro.observe(r))
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)

    return () => {
      try { ro.disconnect() } catch {}
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader
        title="Struktur Organisasi"
        subtitle="Bagan organisasi Dinas Sosial berikut jalur koordinasi dan unit-unit pelaksana."
      />

      {/* ===== BAGAN HIRARKI + SVG konektor ===== */}
      <section className="container mx-auto px-4 py-12">
        <div ref={wrapRef} className="relative rounded-2xl border bg-white p-6 shadow-sm overflow-hidden">
          {/* SVG overlay */}
          <svg className="pointer-events-none absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* garis dari Kepala -> Sekretaris */}
            {paths.headToSec && (
              <path d={paths.headToSec} fill="none" stroke="rgba(100,116,139,0.5)" strokeWidth="2" />
            )}
            {/* garis dari Sekretaris -> 3 lane pertama */}
            {paths.secToLanes.map((d, i)=> d && (
              <path key={i} d={d} fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="2" />
            ))}
          </svg>

          {/* level 1 */}
          <div className="max-w-md mx-auto">
            <CardPerson nodeRef={headRef} title={ORG.head.jabatan} name={ORG.head.nama} img={ORG.head.foto} />
          </div>

          {/* level 2 */}
          <div className="max-w-md mx-auto mt-6">
            <CardPerson nodeRef={secRef} title={ORG.secretary.jabatan} name={ORG.secretary.nama} img={ORG.secretary.foto} />
          </div>

          {/* lanes utama (3 kolom) */}
          <div className="grid lg:grid-cols-3 gap-4 mt-8">
            {ORG.lanes.slice(0,3).map((lane, idx) => (
              <div
                key={idx}
                ref={el => (laneRefs.current[idx] = el)}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="font-semibold">{lane.group}</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {lane.units.map((u, i) => <li key={i} className="pl-2">• {u}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* lanes tambahan */}
          {ORG.lanes.length > 3 && (
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              {ORG.lanes.slice(3).map((lane, idx) => (
                <div key={idx} className="rounded-2xl border bg-white p-4 shadow-sm">
                  <div className="font-semibold">{lane.group}</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {lane.units.map((u, i) => <li key={i} className="pl-2">• {u}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Pill><FiUsers className="mr-1" /> {unitsFlat.length} unit</Pill>
              <Pill>Hirarki 3 tingkat</Pill>
            </div>
            <a
              href="/assets/docs/bagan-struktur.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-50"
            >
              <FiDownload/> Unduh Bagan (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* ===== DAFTAR UNIT + SEARCH ===== */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Daftar Unit Organisasi</h2>
            <p className="text-slate-600 text-sm">Cari cepat unit atau bidang.</p>
          </div>
          <div className="w-full md:w-80 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Cari unit atau bidang…"
              className="w-full rounded-xl border pl-10 pr-3 py-2.5 bg-white"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-slate-500">Tidak ada hasil.</div>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((x, i) => (
              <li key={`${x.group}-${x.unit}-${i}`} className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="text-xs text-slate-500">{x.group}</div>
                <div className="font-medium">{x.unit}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
