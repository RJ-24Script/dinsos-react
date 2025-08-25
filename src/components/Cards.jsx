export function StatCard({icon, label, value}){
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm" data-aos="fade-up">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-slate-500 text-sm">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

export function NewsCard({item}){
  return (
    <article className="rounded-2xl overflow-hidden border bg-white border-slate-200" data-aos="fade-up">
      {item.cover && <img src={item.cover} alt={item.title} className="w-full h-40 object-cover" />}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        <div className="text-xs opacity-70 mb-2">{item.date}</div>
        <p className="text-sm opacity-80 line-clamp-3">{item.summary}</p>
      </div>
    </article>
  )
}
