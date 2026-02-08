import { BrowserRouter, useRoutes } from 'react-router-dom'
import { Suspense } from 'react'
import { routes } from './config/routes'

function Router() {
  return useRoutes(routes)
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-apple-black flex items-center justify-center">
          <div className="text-white/60">Loading...</div>
        </div>
      }>
        <Router />
      </Suspense>
    </BrowserRouter>
  )
}
