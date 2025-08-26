import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'   // <-- tambah ini

export default function SubpageLayout({ title, subtitle, children, crumbs = [], backTo='/', showBack=true }) {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* bar atas: tombol back + breadcrumbs */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {showBack && <BackButton fallback={backTo} />}
        <nav className="text-sm text-slate-600">
          <Link to="/" className="hover:underline">Beranda</Link>
          {crumbs.map((c, i) => (
            <span key={i}>
              <span className="px-2">/</span>
              {c.to ? <Link to={c.to} className="hover:underline">{c.label}</Link> : c.label}
            </span>
          ))}
        </nav>
      </div>

      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}

      <div className="mt-8 bg-white rounded-2xl border shadow-sm p-6">
        {children}
      </div>
    </section>
  )
}
