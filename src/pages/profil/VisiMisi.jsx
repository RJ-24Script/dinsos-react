import SubpageLayout from '../_SubpageLayout'

export default function VisiMisi(){
  return (
    <SubpageLayout
      title="Visi & Misi"
      backTo="/profil"                                 
      crumbs={[{ label: 'Profil', to: '/profil' }, { label: 'Visi & Misi' }]}
    >
      <h2 className="text-xl font-semibold mb-3">Visi</h2>
      <p>“Visi singkat padat—isi sesuai dokumen resmi.”</p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Misi</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Misi 1…</li>
        <li>Misi 2…</li>
        <li>Misi 3…</li>
      </ul>
    </SubpageLayout>
  )
}
