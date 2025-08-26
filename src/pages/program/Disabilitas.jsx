import SubpageLayout from '../_SubpageLayout'

function Section({ title, children }){
  return (
    <div className="mt-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 space-y-2 text-slate-700">{children}</div>
    </div>
  )
}

export default function Disabilitas(){
  return (
    <SubpageLayout
      title="Layanan Disabilitas"
            backTo="/program"                                // <-- ini penting
      crumbs={[{ label: 'Program', to: '/program' }, { label: 'Disabilitas' }]}
    >
      <Section title="Asas & Tujuan">
        <p>
          Memenuhi hak-hak penyandang disabilitas untuk mendapatkan layanan yang aksesibel,
          nondiskriminatif, dan berkeadilan; meningkatkan kemandirian & partisipasi sosial.
        </p>
      </Section>

      <Section title="Jenis Dukungan (contoh)">
        <ul className="list-disc pl-5">
          <li>Alat bantu (kursi roda, tongkat, alat bantu dengar) sesuai asesmen.</li>
          <li>Pendampingan keluarga dan rujukan layanan kesehatan/pendidikan/ketenagakerjaan.</li>
          <li>Fasilitasi aksesibilitas layanan publik & advokasi.</li>
        </ul>
      </Section>

      <Section title="Persyaratan Umum">
        <ul className="list-disc pl-5">
          <li>KTP/KK.</li>
          <li>Surat keterangan disabilitas/rekam medis (bila ada).</li>
          <li>Domisili sesuai wilayah.</li>
        </ul>
      </Section>

      <Section title="Proses Layanan">
        <ol className="list-decimal pl-5">
          <li>Registrasi & pengajuan kebutuhan.</li>
          <li>Assessment oleh petugas/pendamping.</li>
          <li>Penetapan bantuan/rujukan sesuai hasil asesmen & ketersediaan.</li>
          <li>Penyaluran/pelayanan & monitoring.</li>
        </ol>
      </Section>

      <Section title="Kontak & Konsultasi">
        <p>Hub layanan disabilitas Dinsos: email/WA resmi (sesuaikan).</p>
      </Section>
    </SubpageLayout>
  )
}
