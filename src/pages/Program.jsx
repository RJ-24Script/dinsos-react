const PROGRAMS = [
  { name: "PKH", desc: "Program Keluarga Harapan — deskripsi singkat.", icon: "fa-people-carry-box" },
  { name: "BPNT / CPP", desc: "Bantuan Pangan Non Tunai / CPP.", icon: "fa-bowl-food" },
  { name: "DTKS", desc: "Data Terpadu Kesejahteraan Sosial.", icon: "fa-database" },
  { name: "Rehabilitasi Sosial", desc: "Asistensi & layanan rehabilitasi.", icon: "fa-hands-holding-child" },
  { name: "Disabilitas", desc: "Layanan & fasilitas disabilitas.", icon: "fa-wheelchair" },
  { name: "Lansia", desc: "Layanan kesejahteraan lansia.", icon: "fa-person-cane" },
]

export default function Program(){
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6" data-aos="fade-up">Program & Layanan</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {PROGRAMS.map((p,idx)=>(
          <div key={idx} className="p-6 rounded-2xl bg-white border" data-aos="fade-up">
            <div className="text-2xl mb-2"><i className={`fa-solid ${p.icon}`}></i></div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm opacity-80">{p.desc}</div>
            <button className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:underline">
              Detail <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
