export default function Profil(){
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6" data-aos="fade-up">Profil Dinas</h1>
      <p className="mb-3" data-aos="fade-up">Visi — misi, tugas & fungsi, struktur organisasi.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border">Visi & Misi — (isi sesuai konten).</div>
        <div className="p-6 rounded-2xl bg-white border">Struktur Organisasi — (bisa pakai gambar di /assets/img).</div>
      </div>
    </section>
  )
}
