import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3700/api',
  withCredentials: false,
})
export default api
