import PageHeader from '../../components/PageHeader'
import { FiCheckCircle } from 'react-icons/fi'

const values = [
  { title: 'Inklusif', desc: 'Layanan menjangkau semua lapisan masyarakat.' },
  { title: 'Akuntabel', desc: 'Penyaluran bantuan transparan dan terukur.' },
  { title: 'Kolaboratif', desc: 'Bersama OPD, komunitas, & mitra sosial.' },
  { title: 'Adaptif', desc: 'Responsif terhadap dinamika sosial & bencana.' },
]

const milestones = [
  { year: '2025', text: 'Penyempurnaan basis data DTKS & integrasi layanan pengaduan.' },
  { year: '2026', text: 'Peningkatan ketepatan sasaran bantuan sosial minimal 98%.' },
  { year: '2027', text: 'Digitalisasi penuh proses verifikasi & monitoring program.' },
]

export default function VisiMisi() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader
        title="Visi & Misi"
        subtitle="Arah dan strategi Dinas Sosial dalam mewujudkan kesejahteraan sosial yang berkeadilan."
      />

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border shadow-sm">
            <h2 className="text-lg font-semibold">Visi</h2>
            <p className="mt-2 text-slate-700">
              “Terwujudnya Kesejahteraan Sosial yang Inklusif, Berkeadilan, dan Berkelanjutan di Kabupaten Manokwari Selatan.”
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border shadow-sm">
            <h2 className="text-lg font-semibold">Misi</h2>
            <ul className="mt-2 space-y-2">
              {[
                'Meningkatkan kualitas layanan perlindungan & rehabilitasi sosial.',
                'Memperkuat data & ketepatan sasaran bantuan (DTKS).',
                'Mendorong pemberdayaan sosial & partisipasi masyarakat.',
                'Membangun kolaborasi lintas sektor dan inovasi digital layanan.',
              ].map((m, i)=>(
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <FiCheckCircle className="mt-1 text-emerald-600"/> <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {values.map((v, i)=>(
            <div key={i} className="p-5 rounded-2xl bg-white border shadow-sm">
              <div className="text-sm font-semibold">{v.title}</div>
              <p className="text-sm text-slate-600 mt-1">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className="mt-10 p-6 rounded-2xl bg-white border shadow-sm">
          <h3 className="font-semibold">Milestone & Target</h3>
          <div className="mt-4 relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-200" />
            <ul className="space-y-5">
              {milestones.map((m, i)=>(
                <li key={i} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <div className="text-xs text-slate-500">{m.year}</div>
                  <div className="font-medium">{m.text}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
