import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

export function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  )
}
