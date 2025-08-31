import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  FiPhone, FiMail, FiMapPin, FiClock,
  FiFacebook, FiInstagram, FiTwitter, FiYoutube,
  FiMoon, FiSun, FiExternalLink, FiMessageCircle, FiArrowUp
} from 'react-icons/fi'

/** ganti ke nomor WA resmi */
const WA_NUMBER = '6281234567890' // 62 + nomor tanpa 0

export default function Footer() {
  const [showTop, setShowTop] = useState(false)
  const [dark, setDark] = useState(false)

  // ===== dark mode init (ambil dari localStorage) =====
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDark = saved ? saved === 'dark'
                         : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  // ===== scroll up visibility =====
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const linkCls = 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4'
  const navLinkCls = ({isActive}) =>
    isActive
      ? 'text-slate-900 dark:text-white underline underline-offset-4'
      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4'

  return (
    <footer className="relative mt-16 border-t border-slate-200/70 dark:border-slate-700/50 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-10">
        {/* top row: brand + theme toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/assets/img/Lambang_Kabupaten_Manokwari_Selatan.png"
              alt="Lambang"
              className="w-10 h-10 object-contain"
              onError={(e)=>{ e.currentTarget.src='https://placehold.co/80x80?text=Logo' }}
            />
            <div>
              <div className="font-bold text-slate-900 dark:text-white leading-tight">DINAS SOSIAL</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Kabupaten Manokwari Selatan</div>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300/70 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Toggle tema"
          >
            {dark ? <FiSun/> : <FiMoon/>}
            <span className="text-sm">{dark ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* main grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* kontak + jam */}
          <div className="lg:col-span-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <FiMapPin className="mt-0.5 text-slate-500 dark:text-slate-400" />
                <span>Ransiki Kota, Distrik Ransiki, Manokwari Selatan.</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <FiPhone className="text-slate-500 dark:text-slate-400" />
                <a className={linkCls} href="tel:+629xxxxxx">+62 9xx-xxxx-xxx</a>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <FiMail className="text-slate-500 dark:text-slate-400" />
                <a className={linkCls} href="mailto:dinsos@mansel.go.id">dinsos@mansel.go.id</a>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <FiClock className="mt-0.5 text-slate-500 dark:text-slate-400" />
                <span>
                  Senin–Jumat: 08.00–15.00 WIT<br/>
                  Sabtu–Minggu & Hari Libur: Tutup
                </span>
              </li>
            </ul>

            {/* sosmed */}
            <div className="mt-4 flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <a href="#" className="p-2 rounded-lg border border-slate-300/70 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Facebook"><FiFacebook/></a>
              <a href="#" className="p-2 rounded-lg border border-slate-300/70 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Instagram"><FiInstagram/></a>
              <a href="#" className="p-2 rounded-lg border border-slate-300/70 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Twitter"><FiTwitter/></a>
              <a href="#" className="p-2 rounded-lg border border-slate-300/70 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="YouTube"><FiYoutube/></a>
            </div>
          </div>

          {/* peta */}
          <div className="lg:col-span-4">
            <div className="font-semibold mb-2 text-slate-900 dark:text-white">Lokasi Kantor</div>
            <div className="rounded-2xl overflow-hidden border border-slate-200/70 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
              <div className="aspect-[16/10]">
                <iframe
                  title="Peta Dinas Sosial Manokwari Selatan"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.431814063117!2d134.17905186872596!3d-1.5105481325147438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d5243d658ba6f85%3A0x7657239c78e2edfd!2sDinas%20Sosial!5e0!3m2!1sid!2sus!4v1756648148919!5m2!1sid!2sus"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <a
              href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.431814063117!2d134.17905186872596!3d-1.5105481325147438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d5243d658ba6f85%3A0x7657239c78e2edfd!2sDinas%20Sosial!5e0!3m2!1sid!2sus!4v1756648148919!5m2!1sid!2sus"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm text-blue-700 dark:text-blue-400 hover:underline"
            >
              Buka di Google Maps <FiExternalLink/>
            </a>
          </div>

          {/* link cepat */}
          <div className="lg:col-span-2">
            <div className="font-semibold mb-2 text-slate-900 dark:text-white">Navigasi</div>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/" className={navLinkCls}>Beranda</NavLink></li>
              <li><NavLink to="/profil" className={navLinkCls}>Profil</NavLink></li>
              <li><NavLink to="/program" className={navLinkCls}>Program</NavLink></li>
              <li><NavLink to="/berita" className={navLinkCls}>Berita</NavLink></li>
              <li><NavLink to="/pengumuman" className={navLinkCls}>Pengumuman</NavLink></li>
              <li><NavLink to="/agenda" className={navLinkCls}>Agenda</NavLink></li>
              <li><NavLink to="/dokumen" className={navLinkCls}>Dokumen</NavLink></li>
              <li><NavLink to="/pengaduan" className={navLinkCls}>Pengaduan</NavLink></li>
            </ul>
          </div>

          {/* tautan institusi terkait */}
          <div className="lg:col-span-2">
            <div className="font-semibold mb-2 text-slate-900 dark:text-white">Tautan Institusi</div>
            <ul className="space-y-2 text-sm">
              <li><a className={linkCls} href="https://www.kemensos.go.id" target="_blank" rel="noreferrer">Kementerian Sosial (Kemensos)</a></li>
              <li><a className={linkCls} href="https://www.bpjs-kesehatan.go.id" target="_blank" rel="noreferrer">BPJS Kesehatan</a></li>
              <li><a className={linkCls} href="https://www.dukcapil.kemendagri.go.id" target="_blank" rel="noreferrer">Ditjen Dukcapil (Kemendagri)</a></li>
              <li><a className={linkCls} href="https://www.bps.go.id" target="_blank" rel="noreferrer">BPS (Badan Pusat Statistik)</a></li>
              <li><a className={linkCls} href="https://www.kemendagri.go.id" target="_blank" rel="noreferrer">Kemendagri</a></li>
              <li><a className={linkCls} href="https://www.kominfo.go.id" target="_blank" rel="noreferrer">Kominfo</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-slate-200/70 dark:border-slate-700/50 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-4 text-sm flex flex-col md:flex-row gap-2 items-center justify-between">
          <div className="text-slate-600 dark:text-slate-300">
            © {new Date().getFullYear()} Dinas Sosial Kab. Manokwari Selatan. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <Link to="/dokumen" className={linkCls}>Kebijakan Privasi</Link>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <Link to="/dokumen" className={linkCls}>Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>

      {/* floating: back to top */}
      {showTop && (
        <button
          onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 p-3 rounded-full shadow-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <FiArrowUp/>
        </button>
      )}

      {/* floating: WhatsApp */}
      <a
        href={`https://wa.me/+6282125470101?text=Halo%20Dinas%20Sosial,%20saya%20ingin%20bertanya.`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-xl
                   bg-emerald-500 hover:bg-emerald-600 text-white"
        title="Chat WhatsApp"
      >
        <FiMessageCircle className="text-lg" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </footer>
  )
}
