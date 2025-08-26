import SubpageLayout from '../_SubpageLayout'

function Section({ title, children }){
  return (
    <div className="mt-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 space-y-2 text-slate-700">{children}</div>
    </div>
  )
}

export default function BPNT(){
  return (
    <SubpageLayout
      title="BPNT / CPP (Bantuan Pangan Non Tunai / Cadangan Pangan Pemerintah)"
        backTo="/program"                                // <-- ini penting
      crumbs={[{ label: 'Program', to: '/program' }, { label: 'BPNT / CPP' }]}
    >
      <Section title="Deskripsi Singkat">
        <p>
          BPNT/CPP adalah bantuan pangan dari pemerintah yang disalurkan dalam bentuk bahan
          pangan pokok melalui mekanisme penyaluran yang ditetapkan. Tujuan utamanya adalah
          menjaga ketahanan pangan keluarga rentan.
        </p>
      </Section>

      <Section title="Sasaran">
        <ul className="list-disc pl-5">
          <li>Rumah Tangga Miskin/Rentan sesuai data terpadu yang berlaku (sesuaikan dengan regulasi daerah).</li>
          <li>Prioritas pada keluarga dengan komponen rentan (lansia, disabilitas, ibu hamil/menyusui, anak balita, pelajar).</li>
        </ul>
      </Section>

      <Section title="Persyaratan Umum">
        <ul className="list-disc pl-5">
          <li>Kartu Keluarga (KK) & KTP-el aktif.</li>
          <li>Terdaftar/diusulkan dalam basis data kemiskinan (DTKS/pendataan daerah).</li>
          <li>Domisili sesuai wilayah layanan.</li>
        </ul>
      </Section>

      <Section title="Dokumen yang Dibutuhkan">
        <ul className="list-disc pl-5">
          <li>Fotokopi KTP-el & KK.</li>
          <li>Surat Keterangan Tidak Mampu (bila diminta oleh kebijakan daerah).</li>
          <li>Dokumen pendukung komponen (buku nikah/akta lahir anak/keterangan sekolah, dsb.).</li>
        </ul>
      </Section>

      <Section title="Alur Layanan (Ringkas)">
        <ol className="list-decimal pl-5">
          <li>Pengusulan melalui kelurahan/kampung/desa/pendamping sosial.</li>
          <li>Verifikasi & validasi data oleh petugas.</li>
          <li>Penetapan penerima sesuai kuota & kriteria.</li>
          <li>Penyaluran bahan pangan sesuai jadwal yang diumumkan.</li>
          <li>Monitoring & pengaduan bila ada kendala penyaluran.</li>
        </ol>
      </Section>

      <Section title="Kontak Layanan">
        <p>Email/WA layanan: <span className="font-mono">dinsos@contoh.go.id</span> / 08xx-xxxx-xxxx (sesuaikan).</p>
      </Section>

      <Section title="Catatan">
        <p>Kebijakan teknis/kuota/jadwal penyaluran mengikuti surat edaran & peraturan terbaru di kabupaten/provinsi.</p>
      </Section>
    </SubpageLayout>
  )
}
