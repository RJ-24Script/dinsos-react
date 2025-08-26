import { Link, NavLink } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null) // "profil" | "program" | null
  const [showBanner, setShowBanner] = useState(true) // banner info
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const [spacerHeight, setSpacerHeight] = useState(0)

  // Tutup dropdown kalau klik di luar container
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Auto spacer: ukur tinggi header (+banner) dan sisipkan spacer di bawahnya
  useEffect(() => {
    const update = () => {
      if (!headerRef.current) return
      const rect = headerRef.current.getBoundingClientRect()
      setSpacerHeight(rect.height) // set spacer = tinggi header actual
    }
    update()
    const ro = new ResizeObserver(update)
    if (headerRef.current) ro.observe(headerRef.current)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [showBanner, mobileOpen])

  const baseLink = 'hover:opacity-100 transition text-sm px-2 py-1 rounded-md'

  const menuItemsProfil = [
    { to: '/profil/visi-misi', label: 'Visi & Misi' },
    { to: '/profil/struktur', label: 'Struktur Organisasi' },
    { to: '/profil/tupoksi', label: 'Tugas Pokok & Fungsi' },
  ]

  const menuItemsProgram = [
    { to: '/program/pkh', label: 'PKH' },
    { to: '/program/bpnt', label: 'BPNT / CPP' },
    { to: '/program/dtks', label: 'DTKS' },
    { to: '/program/rehabilitasi', label: 'Rehabilitasi Sosial' },
    { to: '/program/disabilitas', label: 'Disabilitas' },
    { to: '/program/lansia', label: 'Lansia' },
  ]

  return (
    <>
      <header ref={headerRef} className="fixed top-0 inset-x-0 z-30">
        <div
          ref={containerRef}
          className="mx-auto container px-4 py-3
            bg-white/60 backdrop-blur-xl border-b border-white/60
            shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] rounded-b-2xl"
        >
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/img/Lambang_Kabupaten_Manokwari_Selatan.png"
                alt="Lambang"
                className="w-9 h-9 object-contain"
                onError={(e)=>{ e.currentTarget.src='https://placehold.co/80x80?text=Lambang' }}
              />
              <div className="leading-tight">
                <div className="font-bold text-slate-900">DINAS SOSIAL</div>
                <div className="text-xs text-slate-600">Kabupaten Manokwari Selatan</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={({isActive}) =>
                `${baseLink} ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 opacity-80'}`
              }>Beranda</NavLink>

              {/* Profil dropdown (klik) */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(openMenu === 'profil' ? null : 'profil')}
                  className={`${baseLink} inline-flex items-center gap-1 text-slate-600 opacity-80`}
                >
                  Profil <FiChevronDown className={`text-xs transition ${openMenu==='profil' ? 'rotate-180' : ''}`} />
                </button>
                <Dropdown show={openMenu==='profil'}>
                  {menuItemsProfil.map((i)=>(
                    <DropdownItem key={i.to} to={i.to} onClick={()=>setOpenMenu(null)}>
                      {i.label}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </div>

              {/* Program dropdown (klik) */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(openMenu === 'program' ? null : 'program')}
                  className={`${baseLink} inline-flex items-center gap-1 text-slate-600 opacity-80`}
                >
                  Program <FiChevronDown className={`text-xs transition ${openMenu==='program' ? 'rotate-180' : ''}`} />
                </button>
                <Dropdown show={openMenu==='program'}>
                  {menuItemsProgram.map((i)=>(
                    <DropdownItem key={i.to} to={i.to} onClick={()=>setOpenMenu(null)}>
                      {i.label}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </div>

              <NavLink to="/berita" className={({isActive}) =>
                `${baseLink} ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 opacity-80'}`
              }>Berita</NavLink>

              <NavLink to="/pengumuman" className={({isActive}) =>
                `${baseLink} ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 opacity-80'}`
              }>Pengumuman</NavLink>

              <NavLink to="/unduhan" className={({isActive}) =>
                `${baseLink} ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 opacity-80'}`
              }>Download</NavLink>

              <NavLink to="/pengaduan" className={({isActive}) =>
                `${baseLink} ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 opacity-80'}`
              }>Pengaduan</NavLink>
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-300 text-slate-700"
              onClick={()=> setMobileOpen(v=>!v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden mt-3 p-3 rounded-2xl border bg-white/70 backdrop-blur">
              <MobileLink to="/" onClick={()=>setMobileOpen(false)}>Beranda</MobileLink>
              <MobileCollapse label="Profil" items={menuItemsProfil} onNavigate={()=>setMobileOpen(false)} />
              <MobileCollapse label="Program" items={menuItemsProgram} onNavigate={()=>setMobileOpen(false)} />
              <MobileLink to="/berita" onClick={()=>setMobileOpen(false)}>Berita</MobileLink>
              <MobileLink to="/pengumuman" onClick={()=>setMobileOpen(false)}>Pengumuman</MobileLink>
              <MobileLink to="/unduhan" onClick={()=>setMobileOpen(false)}>Download</MobileLink>
              <MobileLink to="/pengaduan" onClick={()=>setMobileOpen(false)}>Pengaduan</MobileLink>
            </div>
          )}
        </div>

        {/* Banner info (dismissible) */}
        {showBanner && (
          <div className="bg-blue-600 text-white text-sm text-center py-1 relative">
            ⚡ Pengumuman: Pendaftaran Bantuan Sosial dibuka sampai 30 Agustus 2025
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-3 top-0 bottom-0 flex items-center opacity-90 hover:opacity-100"
              aria-label="Tutup banner"
              title="Tutup"
            >
              ✕
            </button>
          </div>
        )}
      </header>

      {/* Auto spacer — supaya konten nggak ketiban header */}
      <div style={{ height: spacerHeight }} />
    </>
  )
}

/* === Sub-komponen dropdown & mobile === */
function Dropdown({ show, children }) {
  return (
    <div
      className={`
        absolute left-0 mt-2 w-56
        rounded-xl border bg-white/90 backdrop-blur
        shadow-lg p-2
        transition
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}
      `}
    >
      {children}
    </div>
  )
}

function DropdownItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="block w-full text-left text-sm rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
    >
      {children}
    </NavLink>
  )
}

function MobileLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
    >
      {children}
    </NavLink>
  )
}

function MobileCollapse({ label, items, onNavigate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-slate-200 first:border-t-0 py-2">
      <button
        onClick={()=> setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
      >
        <span>{label}</span>
        <FiChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 space-y-1">
          {items.map((i)=>(
            <NavLink
              key={i.to}
              to={i.to}
              onClick={onNavigate}
              className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
            >
              {i.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
