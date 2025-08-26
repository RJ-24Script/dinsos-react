import SubpageLayout from '../_SubpageLayout'

export default function Tupoksi(){
  return (
    <SubpageLayout
      title="Tugas Pokok & Fungsi"
      backTo="/profil"                                 
      crumbs={[{ label: 'Profil', to: '/profil' }, { label: 'Tugas Pokok & Fungsi' }]}
    >
      <h2 className="text-xl font-semibold mb-3">Tugas Pokok</h2>
      <p>Uraikan tugas pokok secara ringkas…</p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Fungsi</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Perumusan kebijakan …</li>
        <li>Pelaksanaan kebijakan …</li>
        <li>Evaluasi dan pelaporan …</li>
      </ul>
    </SubpageLayout>
  )
}
