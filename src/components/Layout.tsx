import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Layout() {
  const { t, i18n } = useTranslation()
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)

  const toggleLanguage = async (lang: 'en' | 'zh') => {
    await i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    setIsLangMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-apple-black text-apple-white">
      {/* Navigation Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-black/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer transition-opacity duration-200 hover:opacity-80">
            <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center">
              <span className="text-sm font-bold text-white/90">R</span>
            </div>
            <span className="font-semibold text-white/90">Reorgix</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white/60 hover:text-white/90 transition-colors duration-200 ease-out text-sm font-medium cursor-pointer"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className="text-white/60 hover:text-white/90 transition-colors duration-200 ease-out text-sm font-medium cursor-pointer"
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/solutions"
              className="text-white/60 hover:text-white/90 transition-colors duration-200 ease-out text-sm font-medium cursor-pointer"
            >
              {t('nav.solutions')}
            </Link>
            <Link
              to="/contact"
              className="text-white/60 hover:text-white/90 transition-colors duration-200 ease-out text-sm font-medium cursor-pointer"
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="relative">
            <motion.button
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 text-sm font-medium transition-colors duration-200 ease-out cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              {i18n.language === 'en' ? 'EN' : '中'}
            </motion.button>

            {/* Language Menu Dropdown */}
            <motion.div
              className="absolute right-0 top-full mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden min-w-32"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: isLangMenuOpen ? 1 : 0,
                y: isLangMenuOpen ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: isLangMenuOpen ? 'auto' : 'none' }}
            >
              <button
                onClick={() => toggleLanguage('en')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ease-out cursor-pointer ${
                  i18n.language === 'en'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage('zh')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ease-out cursor-pointer ${
                  i18n.language === 'zh'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                中文
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <motion.footer
        className="border-t border-white/10 bg-white/5 py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center text-white/50 text-sm">
          <p>© 2026 Reorgix. All rights reserved.</p>
        </div>
      </motion.footer>

      {/* Subtle background gradient effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/[0.02] blur-3xl" />
      </div>
    </div>
  )
}
