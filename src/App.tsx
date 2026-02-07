import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './config/routes'

function Router() {
  return useRoutes(routes)
}

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
