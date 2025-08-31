import { Link } from 'react-router-dom'
import { FiArrowRight, FiLayers, FiShield, FiFileText, FiHeart, FiUser, FiUsers } from 'react-icons/fi'

function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      {kicker && <div className="text-xs tracking-widest uppercase text-slate-500">{kicker}</div>}
      <h2 className="text-2xl md:text-3xl font-bold mt-2">{title}</h2>
      {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
    </div>
  )
}

function Card({ icon, title, desc, to }) {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
      data-aos="fade-up"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="text-3xl text-blue-700 mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600 mt-1 flex-1">{desc}</p>
        <Link
          to={to}
          className="inline-flex items-center gap-2 text-blue-700 hover:underline mt-4 text-sm font-medium"
        >
          Lihat Detail <FiArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default function Program() {
  const programs = [
    {
      icon: <FiLayers />,
      title: 'PKH',
      desc: 'Program Keluarga Harapan untuk keluarga prasejahtera.',
      to: '/program/pkh',
    },
    {
      icon: <FiShield />,
      title: 'BPNT / CPP',
      desc: 'Bantuan Pangan Non Tunai / Cadangan Pangan Pemerintah.',
      to: '/program/bpnt',
    },
    {
      icon: <FiFileText />,
      title: 'DTKS',
      desc: 'Data Terpadu Kesejahteraan Sosial sebagai rujukan penerima manfaat.',
      to: '/program/dtks',
    },
    {
      icon: <FiHeart />,
      title: 'Rehabilitasi Sosial',
      desc: 'Layanan asistensi rehabilitasi sosial untuk kelompok rentan.',
      to: '/program/rehabilitasi',
    },
    {
      icon: <FiUser />,
      title: 'Disabilitas',
      desc: 'Program inklusi sosial untuk penyandang disabilitas.',
      to: '/program/disabilitas',
    },
    {
      icon: <FiUsers />,
      title: 'Lansia',
      desc: 'Perlindungan sosial untuk lanjut usia agar tetap sejahtera.',
      to: '/program/lansia',
    },
  ]

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16 pb-20">
      {/* Hero */}
      <div className="relative mb-12">
        <div className="absolute inset-0">
          <img
            src="/assets/img/program-bg.jpg"
            alt="Background"
            className="w-full h-64 object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/1200x400?text=Program+Background'
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-64 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Program & Layanan
          </h1>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="container mx-auto px-4">
        <SectionTitle
          kicker="Program Prioritas"
          title="Akses Informasi Program"
          subtitle="Pahami syarat, alur layanan, dan dokumen yang diperlukan."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <Card key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
