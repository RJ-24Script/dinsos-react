import { Link } from 'react-router-dom'

export default function PageHeader({ kicker, title, subtitle, bg = '/assets/img/hero-profil.jpg' }) {
  return (
    <section className="relative h-[36vh] min-h-[260px] w-full overflow-hidden">
      <img
        src={bg}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
        onError={(e)=>{ e.currentTarget.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/40" />
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto px-4 py-6">
          <nav className="text-white/80 text-xs mb-2">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span className="mx-1.5">/</span>
            <Link to="/profil" className="hover:underline">Profil</Link>
            {title && title !== 'Profil' && (<><span className="mx-1.5">/</span><span className="opacity-90">{title}</span></>)}
          </nav>
          {kicker && <div className="text-[11px] tracking-widest uppercase text-white/80">{kicker}</div>}
          <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-white/90 mt-1 max-w-3xl">{subtitle}</p>}
        </div>
      </div>
    </section>
  )
}
