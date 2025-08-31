import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiFileText, FiHelpCircle } from 'react-icons/fi'
import { useState } from 'react'

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border rounded-xl overflow-hidden">
      <button onClick={()=>setOpen(!open)} className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-slate-800 hover:bg-slate-50">
        {q}
        <FiHelpCircle className={`transition ${open ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
      </button>
      {open && <div className="px-4 py-3 text-slate-600 text-sm bg-slate-50">{a}</div>}
    </div>
  )
}

export default function ProgramBPNT() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* HERO */}
      <div className="relative">
        <img
          src="/assets/img/bpnt-bg.jpg"
          alt="BPNT/CPP"
          className="w-full h-72 object-cover"
          onError={(e)=>{ e.currentTarget.src='https://placehold.co/1200x400?text=BPNT+%2F+CPP' }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">BPNT / CPP</h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Link to="/program" className="inline-flex items-center gap-2 text-blue-700 hover:underline mb-8">
          <FiArrowLeft /> Kembali ke Program
        </Link>

        {/* Intro */}
        <p className="text-lg text-slate-700 mb-10">
          Bantuan Pangan Non Tunai / Cadangan Pangan Pemerintah berupa komoditas pangan pokok
          untuk keluarga prasejahtera, disalurkan secara nontunai/terkendali.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-blue-600 text-2xl mb-3"><FiCheckCircle /></div>
            <h3 className="font-semibold mb-2">Syarat Penerima</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Terdata di DTKS sebagai keluarga miskin/prasejahtera.</li>
              <li>Tidak menerima bantuan sejenis yang sama (ketentuan dapat berubah).</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-blue-600 text-2xl mb-3"><FiFileText /></div>
            <h3 className="font-semibold mb-2">Dokumen</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>KTP & Kartu Keluarga.</li>
              <li>Surat keterangan domisili (bila perlu).</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-blue-600 text-2xl mb-3"><FiCheckCircle /></div>
            <h3 className="font-semibold mb-2">Alur</h3>
            <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
              <li>Penetapan KPM dari DTKS.</li>
              <li>Penyaluran via mekanisme nontunai/penyedia pangan.</li>
              <li>Monitoring kualitas & ketepatan sasaran.</li>
            </ol>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-xl font-bold mb-4">Pertanyaan Umum</h2>
        <div className="space-y-3 mb-12">
          <Accordion q="Apa saja komoditas yang diterima?" a="Biasanya beras, telur, dan komoditas bergizi lain sesuai kebijakan periode." />
          <Accordion q="Bagaimana jika belum terdaftar DTKS?" a="Ajukan usulan perbaikan/pendataan di kelurahan untuk proses verivali." />
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-600 text-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-3">Ingin tahu jadwal penyaluran?</h3>
          <p className="mb-4">Pantau pengumuman/agenda, atau ajukan pertanyaan melalui pengaduan.</p>
          <Link to="/pengumuman" className="inline-block bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100">
            Lihat Pengumuman
          </Link>
        </div>
      </div>
    </section>
  )
}
