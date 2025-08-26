// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

// Halaman utama
import Home from './pages/Home.jsx'
import Berita from './pages/Berita.jsx'
import Pengumuman from './pages/Pengumuman.jsx'
import Agenda from './pages/Agenda.jsx'
import Unduhan from './pages/Unduhan.jsx'
import Pengaduan from './pages/Pengaduan.jsx'
import NotFound from './pages/NotFound.jsx'

// PROFIL (folder: src/pages/profil)
import ProfilIndex from './pages/profil/index.jsx'
import VisiMisi from './pages/profil/VisiMisi.jsx'
import Struktur from './pages/profil/Struktur.jsx'
import Tupoksi from './pages/profil/Tupoksi.jsx'

// PROGRAM (folder: src/pages/program)
import ProgramIndex from './pages/program/Index.jsx'
import PKH from './pages/program/PKH.jsx'
import BPNT from './pages/program/BPNT.jsx'
import DTKS from './pages/program/DTKS.jsx'
import Rehabilitasi from './pages/program/Rehabilitasi.jsx'
import Disabilitas from './pages/program/Disabilitas.jsx'
import Lansia from './pages/program/Lansia.jsx'

// Admin
import AdminRoute from './admin/AdminRoute.jsx'
import AdminLogin from './pages/admin/Login.jsx'
import PengaduanAdmin from './pages/admin/PengaduanAdmin.jsx'
import PengumumanAdmin from './pages/admin/PengumumanAdmin.jsx'
import AgendaAdmin from './pages/admin/AgendaAdmin.jsx'


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* pt-24 penting karena header fixed */}
      <main className="flex-1 bg-slate-50">
        <Routes>
          {/* Utama */}
          <Route path="/" element={<Home />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/unduhan" element={<Unduhan />} />
          <Route path="/pengaduan" element={<Pengaduan />} />

          {/* PROFIL */}
          <Route path="/profil" element={<ProfilIndex />} />
          <Route path="/profil/visi-misi" element={<VisiMisi />} />
          <Route path="/profil/struktur" element={<Struktur />} />
          <Route path="/profil/tupoksi" element={<Tupoksi />} />

          {/* PROGRAM */}
          <Route path="/program" element={<ProgramIndex />} />
          <Route path="/program/pkh" element={<PKH />} />
          <Route path="/program/bpnt" element={<BPNT />} />
          <Route path="/program/dtks" element={<DTKS />} />
          <Route path="/program/rehabilitasi" element={<Rehabilitasi />} />
          <Route path="/program/disabilitas" element={<Disabilitas />} />
          <Route path="/program/lansia" element={<Lansia />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/pengaduan" element={
            <AdminRoute>
              <PengaduanAdmin />
              </AdminRoute>
          } 
        />
          <Route path="/admin/pengumuman" element={<AdminRoute><PengumumanAdmin/></AdminRoute>} />
          <Route path="/admin/agenda" element={<AdminRoute><AgendaAdmin/></AdminRoute>} />


          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
