export default function Unduhan(){
  const files = [
    {name: "SOP / Juknis (contoh)", url: "#"},
    {name: "Peraturan (contoh)", url: "#"},
  ]
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6" data-aos="fade-up">Download Center</h1>
      <div className="space-y-3">
        {files.map((f, idx)=>(
          <a key={idx} href={f.url} className="block p-4 bg-white border rounded-xl hover:bg-slate-50" data-aos="fade-up">
            <i className="fa-solid fa-file-arrow-down mr-2"></i>{f.name}
          </a>
        ))}
      </div>
    </section>
  )
}
