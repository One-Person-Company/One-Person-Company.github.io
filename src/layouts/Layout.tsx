import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-apple-black text-apple-white">
      <Header />

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      <Footer />

      {/* Subtle background gradient effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/[0.02] blur-3xl" />
      </div>
    </div>
  )
}
