import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiArrowRight, FiUsers, FiShield, FiFileText, FiHelpCircle,
  FiCalendar, FiLayers, FiMapPin
} from 'react-icons/fi'

/** Util kecil buat judul section */
function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      {kicker && <div className="text-xs tracking-widest uppercase text-slate-500">{kicker}</div>}
      <h2 className="text-2xl md:text-3xl font-bold mt-2">{title}</h2>
      {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
    </div>
  )
}

/** Kartu ringkas */
function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow ${className}`}
      data-aos="fade-up"
    >
      {children}
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' })
  }, [])

  // contoh dummy, nanti bisa tarik dari API jika mau
  const highlights = useMemo(() => ([
    { icon: <FiShield />, title: 'Perlindungan Sosial', desc: 'Program menyasar kelompok rentan & penanganan bencana.' },
    { icon: <FiLayers />, title: 'PKH • BPNT/CPP • DTKS', desc: 'Informasi syarat, alur layanan, dan FAQ yang jelas.' },
    { icon: <FiFileText />, title: 'Pengumuman & Agenda', desc: 'Rapat, penyaluran bantuan, bimbingan teknis, sosialisasi.' },
    { icon: <FiHelpCircle />, title: 'Pengaduan Cepat', desc: 'Sampaikan pengaduan Anda secara online & terpantau.' },
  ]), [])

  const quickLinks = [
    { to: '/program', label: 'Program & Layanan', icon: <FiLayers /> },
    { to: '/berita', label: 'Berita', icon: <FiFileText /> },
    { to: '/pengumuman', label: 'Pengumuman', icon: <FiCalendar /> },
    { to: '/pengaduan', label: 'Pengaduan', icon: <FiHelpCircle /> },
  ]

  const stats = [
    { icon: <FiUsers />, label: 'Keluarga Terdata', value: '12.482+' },
    { icon: <FiShield />, label: 'Bantuan Tersalurkan', value: '5.103+' },
    { icon: <FiFileText />, label: 'Publikasi', value: '230+' },
  ]

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/assets/video/background-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="
            absolute inset-0
            w-full h-full
            object-cover object-center
            transform-gpu
            scale-[1.25] sm:scale-[1.15]
  "
/>

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-white/0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white" data-aos="fade-up">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/80">
                <FiMapPin className="opacity-80" /> Kabupaten Manokwari Selatan
              </div>
              <h1 className="text-3xl sm:text-5xl font-semibold leading-tight mt-3">
                Mewujudkan Kesejahteraan Sosial<br className="hidden sm:block" />
                yang Inklusif & Berkelanjutan
              </h1>
              <p className="mt-4 text-white/90">
                Akses informasi program, ajukan layanan, dan pantau pengumuman terbaru—
                semua dalam satu portal.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/pengaduan"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition"
                >
                  Ajukan Pengaduan <FiArrowRight />
                </Link>
                <Link
                  to="/program"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/70 text-white hover:bg-white/10 transition"
                >
                  Lihat Program
                </Link>
              </div>

              {/* Quick nav pills */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {quickLinks.map((q, i) => (
                  <Link key={i}
                    to={q.to}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 border border-white/25 backdrop-blur hover:bg-white/30"
                  >
                    <span className="text-sm opacity-90">{q.icon}</span>{q.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS (glass cards) ===== */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid md:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <Card key={i} className="p-5">
              <div className="text-2xl mb-2 text-blue-700/90">{h.icon}</div>
              <div className="font-semibold">{h.title}</div>
              <p className="text-sm text-slate-600 mt-1">{h.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle
          kicker="Capaian Singkat"
          title="Dampak yang Terukur"
          subtitle="Angka-angka ini menggambarkan komitmen kami melayani masyarakat."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <Card key={i} className="p-8 text-center">
              <div className="text-4xl mx-auto mb-2 text-blue-700/90">{s.icon}</div>
              <div className="text-3xl font-extrabold tracking-tight">{s.value}</div>
              <div className="text-slate-500 mt-1">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== PROGRAM PREVIEW ===== */}
      <section className="container mx-auto px-4 pb-8">
        <SectionTitle
          kicker="Program & Layanan"
          title="Akses Layanan Utama"
          subtitle="Pahami syarat, alur, SLA, dan dokumen yang diperlukan."
        />

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-blue-700/90 text-2xl mb-2"><FiLayers /></div>
            <div className="font-semibold text-lg">PKH</div>
            <p className="text-sm text-slate-600 mt-1">Program Keluarga Harapan untuk peningkatan kesejahteraan keluarga prasejahtera.</p>
            <Link to="/program" className="inline-flex items-center gap-2 mt-4 text-blue-700 font-medium hover:underline">
              Lihat Detail <FiArrowRight />
            </Link>
          </Card>
          <Card className="p-6">
            <div className="text-blue-700/90 text-2xl mb-2"><FiShield /></div>
            <div className="font-semibold text-lg">BPNT / CPP</div>
            <p className="text-sm text-slate-600 mt-1">Bantuan Pangan Non Tunai/CPP dengan mekanisme yang transparan.</p>
            <Link to="/program" className="inline-flex items-center gap-2 mt-4 text-blue-700 font-medium hover:underline">
              Lihat Detail <FiArrowRight />
            </Link>
          </Card>
          <Card className="p-6">
            <div className="text-blue-700/90 text-2xl mb-2"><FiFileText /></div>
            <div className="font-semibold text-lg">DTKS</div>
            <p className="text-sm text-slate-600 mt-1">Data Terpadu Kesejahteraan Sosial sebagai rujukan penetapan sasaran.</p>
            <Link to="/program" className="inline-flex items-center gap-2 mt-4 text-blue-700 font-medium hover:underline">
              Lihat Detail <FiArrowRight />
            </Link>
          </Card>
        </div>
      </section>

      {/* ===== BERITA RINGKAS ===== */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle
          kicker="Berita Terbaru"
          title="Sorotan Kegiatan"
          subtitle="Cuplikan 3 berita terakhir. Lihat laman Berita untuk arsip lengkap."
        />
        {/* Placeholder layout — nanti kamu bisa map dari data API */}
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-200 to-slate-100" />
              <div className="p-5">
                <div className="text-xs text-slate-500">2025-08-24</div>
                <h3 className="font-semibold mt-1">Judul Berita #{i}</h3>
                <p className="text-sm text-slate-600 mt-1 line-clamp-3">
                  Ringkasan singkat berita untuk memberi konteks kegiatan terbaru Dinas Sosial...
                </p>
                <Link to="/berita" className="inline-flex items-center gap-2 mt-3 text-blue-700 font-medium hover:underline">
                  Baca Selengkapnya <FiArrowRight />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== CTA STRIP ===== */}
      <section className="relative">
        <div className="container mx-auto px-4 pb-16">
          <div
            className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            data-aos="fade-up"
          >
            <div>
              <div className="text-xs tracking-widest uppercase text-white/80">Butuh Bantuan?</div>
              <h3 className="text-2xl font-semibold mt-1">Ajukan Pengaduan Cepat</h3>
              <p className="text-white/90 mt-1">Kami siap menindaklanjuti laporan Anda secara transparan.</p>
            </div>
            <Link
              to="/pengaduan"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-slate-100 transition self-start"
            >
              Form Pengaduan <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
