import { Link } from 'react-router-dom'
import SubpageLayout from '../_SubpageLayout'

export default function ProfilIndex(){
  return (
    <SubpageLayout
      title="Profil Dinas Sosial"
      subtitle="Informasi umum, sejarah singkat, dan gambaran organisasi."
      crumbs={[{ label: 'Profil' }]}
        showBack={false}       // <-- indeks nggak butuh tombol back

    >
      <div className="grid md:grid-cols-3 gap-4">
        <Card to="/profil/visi-misi" title="Visi & Misi" />
        <Card to="/profil/struktur" title="Struktur Organisasi" />
        <Card to="/profil/tupoksi" title="Tugas Pokok & Fungsi" />
      </div>
    </SubpageLayout>
  )
}

function Card({ to, title }){
  return (
    <Link to={to} className="block p-5 rounded-xl border hover:shadow-md transition">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-slate-600 mt-1">Lihat selengkapnya</div>
    </Link>
  )
}
