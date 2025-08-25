import berita from '../data/berita.json'
import { NewsCard } from '../components/Cards.jsx'

export default function Berita(){
  const items = berita || []
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6" data-aos="fade-up">Berita</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, idx)=>(<NewsCard key={idx} item={item} />))}
      </div>
    </section>
  )
}
