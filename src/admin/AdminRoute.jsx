import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const key = localStorage.getItem('ADMIN_KEY')
  if (!key) return <Navigate to="/admin/login" replace />
  return children
}
