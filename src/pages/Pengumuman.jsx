import pengumuman from '../data/pengumuman.json'

export default function Pengumuman(){
  const items = pengumuman || []
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6" data-aos="fade-up">Pengumuman & Agenda</h1>
      <ul className="space-y-3">
        {items.map((it,idx)=>(
          <li key={idx} className="p-4 rounded-xl bg-white border" data-aos="fade-up">
            <div className="text-sm opacity-70">{it.date}</div>
            <div className="font-semibold">{it.title}</div>
            {it.location && <div className="text-sm opacity-80">{it.location}</div>}
            {it.link && <a href={it.link} className="text-blue-600 hover:underline text-sm">Detail</a>}
          </li>
        ))}
      </ul>
    </section>
  )
}
