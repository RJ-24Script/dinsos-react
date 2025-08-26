import SubpageLayout from '../_SubpageLayout'

export default function PKH(){
  return (
    <SubpageLayout
      title="Program Keluarga Harapan (PKH)"
            backTo="/program"                                // <-- ini penting
      crumbs={[{ label: 'Program', to: '/program' }, { label: 'PKH' }]}
    >
      <Section title="Deskripsi">Gambaran umum PKH…</Section>
      <Section title="Persyaratan">
        <ul className="list-disc pl-5 space-y-1">
          <li>KK & KTP</li><li>KRS/Surat Keterangan …</li><li>…</li>
        </ul>
      </Section>
      <Section title="Alur Layanan">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Pendaftaran …</li><li>Verifikasi …</li><li>Penetapan …</li>
        </ol>
      </Section>
      <Section title="Kontak">Email/No. layanan…</Section>
    </SubpageLayout>
  )
}

function Section({ title, children }){
  return (
    <div className="mt-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2">{children}</div>
    </div>
  )
}
