import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Profil from './pages/Profil.jsx'
import Program from './pages/Program.jsx'
import Berita from './pages/Berita.jsx'
import Pengumuman from './pages/Pengumuman.jsx'
import Unduhan from './pages/Unduhan.jsx'
import Pengaduan from './pages/Pengaduan.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/program" element={<Program />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
          <Route path="/unduhan" element={<Unduhan />} />
          <Route path="/pengaduan" element={<Pengaduan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
