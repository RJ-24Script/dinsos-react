import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiFileText, FiHelpCircle } from 'react-icons/fi'
import { useState } from 'react'

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-slate-800 hover:bg-slate-50"
      >
        {q}
        <FiHelpCircle
          className={`transition ${open ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}
        />
      </button>
      {open && (
        <div className="px-4 py-3 text-slate-600 text-sm bg-slate-50">{a}</div>
      )}
    </div>
  )
}

export default function ProgramPKH() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* HERO */}
      <div className="relative">
        <img
          src="/assets/img/pkh-bg.jpg"
          alt="Program Keluarga Harapan"
          className="w-full h-72 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              'https://placehold.co/1200x400?text=PKH'
          }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Program Keluarga Harapan (PKH)
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Link
          to="/program"
          className="inline-flex items-center gap-2 text-blue-700 hover:underline mb-8"
        >
          <FiArrowLeft /> Kembali ke Program
        </Link>

        {/* Intro */}
        <p className="text-lg text-slate-700 mb-10">
          Program Keluarga Harapan (PKH) adalah program pemberian bantuan sosial bersyarat
          kepada keluarga miskin yang ditetapkan sebagai Keluarga Penerima Manfaat (KPM).
          Bantuan diberikan dengan tujuan meningkatkan kualitas hidup dan mengurangi beban ekonomi.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-blue-600 text-2xl mb-3"><FiCheckCircle /></div>
            <h3 className="font-semibold mb-2">Kriteria Penerima</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Keluarga miskin terdata di DTKS.</li>
              <li>Memiliki anak usia sekolah, balita, lansia, atau penyandang disabilitas.</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-blue-600 text-2xl mb-3"><FiFileText /></div>
            <h3 className="font-semibold mb-2">Dokumen</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>KTP & KK.</li>
              <li>Kartu Pelajar/Surat Keterangan Sekolah (jika ada anak sekolah).</li>
              <li>Surat keterangan disabilitas/lansia (bila relevan).</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-blue-600 text-2xl mb-3"><FiCheckCircle /></div>
            <h3 className="font-semibold mb-2">Tahapan</h3>
            <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
              <li>Pendataan & verifikasi keluarga calon penerima.</li>
              <li>Penetapan KPM & pembukaan rekening bantuan.</li>
              <li>Penyaluran bantuan & monitoring kepatuhan syarat.</li>
            </ol>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-xl font-bold mb-4">Pertanyaan Umum</h2>
        <div className="space-y-3 mb-12">
          <Accordion
            q="Apakah bantuan PKH diberikan tunai?"
            a="Bantuan PKH umumnya disalurkan melalui rekening bank KPM dalam bentuk non-tunai, namun dapat dicairkan."
          />
          <Accordion
            q="Apakah penerima PKH otomatis menerima bantuan lain?"
            a="Tidak. Setiap program memiliki kriteria sendiri, meskipun seringkali ada keterkaitan data DTKS."
          />
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-600 text-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-3">Butuh info lebih detail?</h3>
          <p className="mb-4">
            Lihat pengumuman resmi atau ajukan pertanyaan melalui kanal pengaduan.
          </p>
          <Link
            to="/pengumuman"
            className="inline-block bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100"
          >
            Lihat Pengumuman
          </Link>
        </div>
      </div>
    </section>
  )
}
