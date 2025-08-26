import { Link } from 'react-router-dom'
import SubpageLayout from '../_SubpageLayout'

export default function ProgramIndex(){
  const items = [
    { to: '/program/pkh', label: 'PKH' },
    { to: '/program/bpnt', label: 'BPNT / CPP' },
    { to: '/program/dtks', label: 'DTKS' },
    { to: '/program/rehabilitasi', label: 'Rehabilitasi Sosial' },
    { to: '/program/disabilitas', label: 'Disabilitas' },
    { to: '/program/lansia', label: 'Lansia' },
  ]
  return (
    <SubpageLayout
      title="Program & Layanan"
      subtitle="Akses informasi persyaratan, alur, dan kontak layanan."
      crumbs={[{ label: 'Program & Layanan' }]}
          showBack={false}       // <-- indeks nggak butuh tombol back

    >
      <div className="grid md:grid-cols-3 gap-4">
        {items.map(i=>(
          <Link key={i.to} to={i.to} className="block p-5 rounded-xl border hover:shadow-md transition">
            <div className="font-semibold">{i.label}</div>
            <div className="text-sm text-slate-600 mt-1">Lihat detail</div>
          </Link>
        ))}
      </div>
    </SubpageLayout>
  )
}
