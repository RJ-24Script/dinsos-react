import SubpageLayout from '../_SubpageLayout'

export default function Struktur(){
  return (
    <SubpageLayout
      title="Struktur Organisasi"
        backTo="/profil"
      crumbs={[{ label: 'Profil', to: '/profil' }, { label: 'Struktur Organisasi' }]}
    >
      <p className="mb-4">Struktur organisasi Dinas Sosial Kab. Manokwari Selatan.</p>
      <img
        src="/assets/img/struktur.png"
        alt="Struktur Organisasi"
        className="w-full rounded-xl border"
        onError={(e)=> e.currentTarget.style.display='none'}
      />
    </SubpageLayout>
  )
}
