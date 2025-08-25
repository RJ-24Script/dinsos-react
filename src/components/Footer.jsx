export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-16">
      <div className="container mx-auto px-4 py-8 text-sm grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold">Dinas Sosial Kab. Manokwari Selatan</div>
          <div className="opacity-80">Ransiki — Papua Barat Daya</div>
        </div>
        <div>
          <div className="font-semibold">Kontak</div>
          <ul className="opacity-80">
            <li><i className="fa-solid fa-phone mr-2"></i>(-) -</li>
            <li><i className="fa-solid fa-envelope mr-2"></i>info@contoh.go.id</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Tautan</div>
          <ul className="opacity-80">
            <li><a href="#" className="hover:underline">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:underline">Pedoman Layanan</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4 text-xs bg-slate-950">© {new Date().getFullYear()} Dinas Sosial</div>
    </footer>
  )
}
