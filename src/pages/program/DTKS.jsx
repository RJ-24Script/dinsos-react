import SubpageLayout from '../_SubpageLayout'

function Section({ title, children }){
  return (
    <div className="mt-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 space-y-2 text-slate-700">{children}</div>
    </div>
  )
}

export default function DTKS(){
  return (
    <SubpageLayout
      title="DTKS (Data Terpadu Kesejahteraan Sosial)"
        backTo="/program"                                // <-- ini penting
      crumbs={[{ label: 'Program', to: '/program' }, { label: 'DTKS' }]}
    >
      <Section title="Deskripsi Singkat">
        <p>
          DTKS adalah basis data yang berisi individu/rumah tangga dengan kondisi sosial ekonomi
          tertentu yang menjadi rujukan utama penetapan sasaran program perlindungan sosial.
        </p>
      </Section>

      <Section title="Manfaat Terdaftar di DTKS">
        <ul className="list-disc pl-5">
          <li>Menjadi rujukan pengusulan berbagai program (BPNT/CPP, PKH, bantuan sosial lainnya).</li>
          <li>Mempermudah verifikasi syarat administrasi program bantuan.</li>
        </ul>
      </Section>

      <Section title="Kriteria Umum (indikatif)">
        <ul className="list-disc pl-5">
          <li>Kondisi sosial ekonomi rumah tangga rentan/miskin.</li>
          <li>Indikator kondisi perumahan, pekerjaan, pengeluaran, dan komponen rumah tangga.</li>
        </ul>
      </Section>

      <Section title="Cara Pengusulan/Perubahan Data">
        <ol className="list-decimal pl-5">
          <li>Mengajukan permohonan melalui kelurahan/kampung/desa/pendamping sosial.</li>
          <li>Petugas melakukan verifikasi lapangan & input perubahan pada aplikasi pendataan.</li>
          <li>Rekonsiliasi & penetapan pembaruan data secara berkala.</li>
        </ol>
      </Section>

      <Section title="Dokumen Pendukung">
        <ul className="list-disc pl-5">
          <li>KTP-el & KK.</li>
          <li>Surat keterangan domisili (bila diperlukan).</li>
          <li>Dokumen pendukung kondisi spesifik (PHK, disabilitas, lansia, dll.).</li>
        </ul>
      </Section>

      <Section title="Kontak">
        <p>Informasi & status usulan data dapat ditanyakan ke petugas kelurahan/kampung/desa atau Dinas Sosial setempat.</p>
      </Section>
    </SubpageLayout>
  )
}

