import { Link } from 'react-router-dom'
import { FILE_BASE } from '../lib/fileBase'

export default function NewsCard({ item }) {
  return (
    <li className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      {item.thumbnail && (
        <img
          src={`${FILE_BASE}${item.thumbnail}`}
          alt={item.judul}
          className="w-full h-44 object-cover"
          onError={(e)=>{ e.currentTarget.src='https://placehold.co/800x400?text=Tidak+ada+gambar' }}
        />
      )}
      <div className="p-5">
        <div className="text-xs text-slate-500 mb-2">
          {item.penulis ? `🖊️ ${item.penulis} · ` : ''}
          {new Date(item.createdAt).toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' })}
        </div>
        <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">{item.judul}</h3>
        <p className="mt-2 text-slate-600 text-sm line-clamp-3 whitespace-pre-line">{item.isi}</p>
        <div className="mt-4">
          <Link to={`/berita/${item.id}`} className="inline-block text-sm text-blue-600 hover:underline">
            Baca selengkapnya →
          </Link>
        </div>
      </div>
    </li>
  )
}
