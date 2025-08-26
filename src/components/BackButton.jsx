import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function BackButton({ fallback='/', children='Kembali', className='' }) {
  const navigate = useNavigate()

  const onClick = () => {
    // kalau ada history, mundur; kalau nggak, langsung ke fallback
    if (typeof window !== 'undefined' && window.history.length > 1) {
      navigate(-1)
    } else {
      navigate(fallback, { replace: true })
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-[0.98] transition ${className}`}
      aria-label="Kembali"
    >
      <FiArrowLeft className="text-base" />
      {children}
    </button>
  )
}
