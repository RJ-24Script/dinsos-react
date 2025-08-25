# Dinas Sosial — React (Vite + Tailwind)

## Cara jalanin (lokal)
```bash
npm install
npm run dev
```
Lalu buka URL yang ditampilkan (biasanya `http://localhost:5173`).

## Struktur
- `src/components`: Header, Footer, Hero, dll
- `src/pages`: Halaman (Beranda, Profil, Program, Berita, Pengumuman, Unduhan, Pengaduan)
- `src/data`: `berita.json`, `pengumuman.json` (diambil dari sumber kamu)
- `public/assets`: gambar/video lama kamu (auto disalin)

## Integrasi Backend
- Ganti endpoint di `src/pages/Pengaduan.jsx` (`/api/pengaduan`) ke URL backend kamu (mis: `http://localhost:3700/api/pengaduan`).
- Untuk `Berita`, saat ini membaca `src/data/berita.json`. Jika backend siap (`GET /api/berita`), ubah komponen untuk fetch via `axios`.

## Deploy GitHub Pages
Gunakan `vite` + `gh-pages` atau Netlify/Vercel. Untuk GH Pages:
1. Tambahkan `"homepage": "https://username.github.io/repo-name"` di `package.json` bila pakai CRA; untuk Vite, lebih mudah pakai Netlify/Vercel.
2. Atau set `base` di `vite.config.js` saat repo bukan di root domain.
