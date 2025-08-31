import { Link, NavLink } from 'react-router-dom'
import { FiArrowRight, FiAward, FiUsers, FiTarget, FiShield } from 'react-icons/fi'
import PageHeader from '../../components/PageHeader'

const tabCls = ({isActive}) =>
  `inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition
   ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/80 backdrop-blur border-slate-200 hover:bg-white'}`

function Stat({ icon, value, label }) {
  return (
    <div className="p-6 rounded-2xl bg-white border shadow-sm">
      <div className="text-2xl text-blue-700/90">{icon}</div>
      <div className="text-2xl font-extrabold mt-2">{value}</div>
      <div className="text-slate-600">{label}</div>
    </div>
  )
}

export default function ProfilIndex() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader
        title="Profil"
        subtitle="Gambaran singkat Dinas Sosial Kabupaten Manokwari Selatan: visi, misi, struktur, dan tugas pokok & fungsi."
        bg="/assets/img/hero-profil.jpg"
      />

      {/* Tabs */}
      <section className="container mx-auto px-4 -mt-4 relative z-10">
        <div className="p-2 rounded-2xl bg-white/50 backdrop-blur border shadow-sm flex flex-wrap gap-2">
          <NavLink to="/profil/visi-misi" className={tabCls}><FiTarget/> Visi & Misi</NavLink>
          <NavLink to="/profil/struktur" className={tabCls}><FiUsers/> Struktur</NavLink>
          <NavLink to="/profil/tupoksi" className={tabCls}><FiShield/> Tupoksi</NavLink>
        </div>
      </section>

      {/* Intro + highlight */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-2xl bg-white border shadow-sm">
            <h2 className="text-xl font-semibold">Tentang Dinas Sosial</h2>
            <p className="text-slate-700 mt-2">
              Dinas Sosial memiliki mandat menyelenggarakan urusan pemerintahan bidang sosial: perlindungan dan
              rehabilitasi sosial, pemberdayaan, penanganan fakir miskin, penanggulangan bencana sosial, serta layanan
              data kesejahteraan (DTKS). Kami berfokus pada layanan yang inklusif, akurat, dan tepat sasaran.
            </p>
            <ul className="list-disc pl-5 mt-3 text-slate-700 space-y-1">
              <li>Transparansi dan akuntabilitas penyaluran bantuan.</li>
              <li>Kolaborasi lintas OPD dan mitra sosial.</li>
              <li>Digitalisasi layanan (pengumuman, agenda, pengaduan).</li>
            </ul>
            <div className="mt-4">
              <Link to="/profil/visi-misi" className="inline-flex items-center gap-2 text-blue-700 font-medium hover:underline">
                Jelajahi Visi & Misi <FiArrowRight/>
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <Stat icon={<FiAward/>} value="Akurat" label="DTKS sebagai rujukan sasaran"/>
            <Stat icon={<FiUsers/>} value="Kolaboratif" label="Pentahelix kesejahteraan sosial"/>
            <Stat icon={<FiShield/>} value="Responsif" label="Proteksi kelompok rentan"/>
          </div>
        </div>
      </section>

      {/* Leadership card */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border shadow-sm">
            <h3 className="font-semibold text-lg">Kepala Dinas</h3>
            <div className="mt-3 flex gap-4">
              <img
                src="/assets/img/kepala-dinas.jpg"
                alt="Kepala Dinas"
                className="w-24 h-24 object-cover rounded-xl"
                onError={(e)=>{ e.currentTarget.src = 'https://placehold.co/200x200?text=Kadis' }}
              />
              <div>
                <div className="font-semibold">Nama Kepala Dinas</div>
                <p className="text-sm text-slate-600">
                  Mengarahkan kebijakan dan koordinasi program kesejahteraan sosial yang berdampak.
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border shadow-sm">
            <h3 className="font-semibold text-lg">Sekretaris Dinas</h3>
            <div className="mt-3 flex gap-4">
              <img
                src="/assets/img/sekretaris.jpg"
                alt="Sekretaris Dinas"
                className="w-24 h-24 object-cover rounded-xl"
                onError={(e)=>{ e.currentTarget.src = 'https://placehold.co/200x200?text=Sekdis' }}
              />
              <div>
                <div className="font-semibold">Nama Sekretaris</div>
                <p className="text-sm text-slate-600">
                  Menjamin tata kelola, perencanaan, dan pelayanan administratif yang prima.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
