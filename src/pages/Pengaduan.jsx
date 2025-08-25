import { useState } from 'react'
import axios from 'axios'

export default function Pengaduan(){
  const [form, setForm] = useState({ nama:'', nik:'', hp:'', pesan:'' })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try{
      // Ubah URL ini ke backend kamu
      await axios.post('/api/pengaduan', form)
      setStatus('ok')
      setForm({ nama:'', nik:'', hp:'', pesan:'' })
    }catch(err){
      setStatus('error')
    }
  }

  return (
    <section className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6" data-aos="fade-up">Form Pengaduan</h1>
      <form onSubmit={submit} className="space-y-4 bg-white border p-6 rounded-2xl" data-aos="fade-up">
        <div>
          <label className="text-sm">Nama</label>
          <input className="w-full border rounded-lg p-2 mt-1" value={form.nama} onChange={e=>setForm({...form, nama:e.target.value})} required />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">NIK</label>
            <input className="w-full border rounded-lg p-2 mt-1" value={form.nik} onChange={e=>setForm({...form, nik:e.target.value})} required />
          </div>
          <div>
            <label className="text-sm">No. HP</label>
            <input className="w-full border rounded-lg p-2 mt-1" value={form.hp} onChange={e=>setForm({...form, hp:e.target.value})} required />
          </div>
        </div>
        <div>
          <label className="text-sm">Pesan</label>
          <textarea className="w-full border rounded-lg p-2 mt-1" rows="4" value={form.pesan} onChange={e=>setForm({...form, pesan:e.target.value})} required />
        </div>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Kirim</button>
        {status==='loading' && <div className="text-sm mt-2">Mengirim...</div>}
        {status==='ok' && <div className="text-sm mt-2 text-green-600">Terkirim! 🎉</div>}
        {status==='error' && <div className="text-sm mt-2 text-red-600">Gagal mengirim. Cek backend.</div>}
      </form>
    </section>
  )
}
