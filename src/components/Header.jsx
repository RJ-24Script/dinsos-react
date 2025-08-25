import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/img/Lambang_Kabupaten_Manokwari_Selatan.png" alt="Lambang" className="w-10 h-10 object-contain" onError={(e)=>e.currentTarget.src='https://placehold.co/80x80?text=Lambang'} />
          <div className="text-white leading-tight">
            <div className="font-bold">DINAS SOSIAL</div>
            <div className="text-xs opacity-80">KAB. MANOKWARI SELATAN</div>
          </div>
        </Link>
        <nav className="text-white text-sm hidden md:flex gap-6">
          <NavLink to="/" className={({isActive})=> isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100'}>Beranda</NavLink>
          <NavLink to="/profil" className={({isActive})=> isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100'}>Profil</NavLink>
          <NavLink to="/program" className={({isActive})=> isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100'}>Program & Layanan</NavLink>
          <NavLink to="/berita" className={({isActive})=> isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100'}>Berita</NavLink>
          <NavLink to="/pengumuman" className={({isActive})=> isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100'}>Pengumuman</NavLink>
          <NavLink to="/unduhan" className={({isActive})=> isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100'}>Download</NavLink>
          <NavLink to="/pengaduan" className={({isActive})=> isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100'}>Pengaduan</NavLink>
        </nav>
      </div>
    </header>
  )
}
