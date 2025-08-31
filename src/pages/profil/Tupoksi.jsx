import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import PageHeader from '../../components/PageHeader'

const data = [
  {
    title: 'Sekretariat',
    items: [
      'Perencanaan, penyusunan program, dan penganggaran.',
      'Pengelolaan keuangan & aset, urusan umum & kepegawaian.',
      'Koordinasi, evaluasi, dan pelaporan kinerja perangkat dinas.',
    ],
  },
  {
    title: 'Bidang Rehabilitasi Sosial',
    items: [
      'Layanan rehabilitasi sosial bagi PMKS (Penyandang Masalah Kesejahteraan Sosial).',
      'Pemulihan dan reintegrasi sosial, rujukan layanan lanjutan.',
    ],
  },
  {
    title: 'Bidang Perlindungan & Jaminan Sosial',
    items: [
      'Penanganan bencana sosial, kedaruratan, dan bantuan sosial.',
      'Pelayanan jaminan sosial, perlindungan kelompok rentan.',
    ],
  },
  {
    title: 'Bidang Pemberdayaan Sosial',
    items: [
      'Pemberdayaan potensi sumber kesejahteraan sosial (PSKS).',
      'Kemitraan lembaga kesejahteraan sosial & pemberdayaan komunitas.',
    ],
  },
  {
    title: 'Pengelolaan Data (DTKS)',
    items: [
      'Pendataan, verifikasi, dan validasi DTKS.',
      'Integrasi dan pemanfaatan data untuk kebijakan & penyaluran bantuan.',
    ],
  },
]

function Accordion({ title, items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl bg-white border shadow-sm">
      <button
        onClick={()=>setOpen(o=>!o)}
        className="w-full flex items-center justify-between px-5 py-4"
      >
        <span className="font-semibold">{title}</span>
        <FiChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="px-6 pb-5 list-disc text-slate-700 space-y-1">
          {items.map((it, i)=>(<li key={i}>{it}</li>))}
        </ul>
      )}
    </div>
  )
}

export default function Tupoksi() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader
        title="Tugas Pokok & Fungsi"
        subtitle="Rincian tugas pokok dan fungsi sekretariat serta bidang-bidang teknis."
      />

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((d, i)=>(
            <Accordion key={i} title={d.title} items={d.items}/>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-white border shadow-sm text-sm text-slate-600">
          Catatan: Detail lebih lanjut mengacu pada peraturan bupati/perda dan peraturan perundangan terkait urusan sosial.
        </div>
      </section>
    </main>
  )
}
