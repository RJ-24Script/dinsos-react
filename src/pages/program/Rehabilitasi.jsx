import SubpageLayout from '../_SubpageLayout'

function Section({ title, children }){
  return (
    <div className="mt-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 space-y-2 text-slate-700">{children}</div>
    </div>
  )
}

export default function Rehabilitasi(){
  return (
    <SubpageLayout
      title="Rehabilitasi Sosial"
           backTo="/program"                                // <-- ini penting
      crumbs={[{ label: 'Program', to: '/program' }, { label: 'Rehabilitasi Sosial' }]}
    >
      <Section title="Tujuan">
        <p>
          Meningkatkan keberfungsian sosial individu/keluarga/komunitas yang mengalami
          permasalahan sosial melalui intervensi profesional dan dukungan layanan.
        </p>
      </Section>

      <Section title="Sasaran Layanan (contoh)">
        <ul className="list-disc pl-5">
          <li>Korban kekerasan, keterlantaran, atau eksploitasi.</li>
          <li>PMKS (Penyandang Masalah Kesejahteraan Sosial) lainnya sesuai klasifikasi daerah.</li>
          <li>Pemerlu pelayanan kesejahteraan sosial pasca-bencana.</li>
        </ul>
      </Section>

      <Section title="Bentuk Layanan">
        <ul className="list-disc pl-5">
          <li>Assessment, konseling, dan rujukan.</li>
          <li>Penguatan keluarga & community based services.</li>
          <li>Bantuan pemenuhan kebutuhan dasar sementara (sesuai kriteria).</li>
          <li>Rujukan ke panti/unit layanan/mitra kerja terkait.</li>
        </ul>
      </Section>

      <Section title="Prosedur Singkat">
        <ol className="list-decimal pl-5">
          <li>Pengaduan/pelaporan oleh masyarakat/instansi.</li>
          <li>Assessment dan identifikasi kebutuhan.</li>
          <li>Penetapan rencana intervensi & rujukan.</li>
          <li>Pendampingan & monitoring hasil.</li>
        </ol>
      </Section>

      <Section title="Dokumen">
        <ul className="list-disc pl-5">
          <li>KTP/KK & dokumen pendukung kasus (bila ada).</li>
          <li>Berita acara/hasil assessment (oleh petugas).</li>
        </ul>
      </Section>

      <Section title="Kontak Darurat">
        <p>Hubungi layanan cepat Dinsos/Call Center daerah untuk kasus mendesak (isi nomor lokal).</p>
      </Section>
    </SubpageLayout>
  )
}
