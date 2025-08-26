import SubpageLayout from '../_SubpageLayout'

function Section({ title, children }){
  return (
    <div className="mt-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 space-y-2 text-slate-700">{children}</div>
    </div>
  )
}

export default function Lansia(){
  return (
    <SubpageLayout
      title="Layanan Lansia"
            backTo="/program"                                // <-- ini penting
      crumbs={[{ label: 'Program', to: '/program' }, { label: 'Lansia' }]}
    >
      <Section title="Tujuan">
        <p>
          Menjamin lansia mendapatkan dukungan sosial dasar, akses layanan, serta
          lingkungan yang kondusif untuk kemandirian dan martabat.
        </p>
      </Section>

      <Section title="Sasaran & Bentuk Layanan">
        <ul className="list-disc pl-5">
          <li>Lansia tunggal/tidak berdaya: dukungan pemenuhan kebutuhan dasar.</li>
          <li>Lansia dengan komorbid/disabilitas: rujukan layanan kesehatan & pendampingan.</li>
          <li>Aktivitas sosial/komunitas lansia: posyandu, bina keluarga, dll.</li>
        </ul>
      </Section>

      <Section title="Persyaratan Umum">
        <ul className="list-disc pl-5">
          <li>KTP/KK.</li>
          <li>Keterangan domisili.</li>
          <li>Surat keterangan medis (bila diperlukan untuk bantuan spesifik).</li>
        </ul>
      </Section>

      <Section title="Prosedur">
        <ol className="list-decimal pl-5">
          <li>Pengajuan melalui kelurahan/kampung/desa/pendamping.</li>
          <li>Assessment kondisi & kebutuhan.</li>
          <li>Penetapan jenis layanan/bantuan sesuai kebijakan & ketersediaan.</li>
          <li>Pelaksanaan layanan & monitoring berkala.</li>
        </ol>
      </Section>

      <Section title="Kontak">
        <p>Informasi layanan lansia: hubungi petugas Dinsos/pendamping sosial (isi kontak).</p>
      </Section>
    </SubpageLayout>
  )
}
