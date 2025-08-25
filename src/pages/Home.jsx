import Hero from '../components/Hero.jsx'
import { StatCard, NewsCard } from '../components/Cards.jsx'
import berita from '../data/berita.json'

export default function Home(){
  const latest = (berita || []).slice(0,3)
  return (
    <div>
      <Hero />
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-4">
          <StatCard icon={<i className="fa-solid fa-users"></i>} label="Penerima Manfaat" value="—" />
          <StatCard icon={<i className="fa-solid fa-hand-holding-heart"></i>} label="Program Aktif" value="—" />
          <StatCard icon={<i className="fa-solid fa-building"></i>} label="Lembaga Mitra" value="—" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Berita Terbaru</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((item, idx)=>(<NewsCard key={idx} item={item} />))}
        </div>
      </section>
    </div>
  )
}
