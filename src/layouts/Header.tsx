import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)

  const toggleLanguage = async (lang: 'en' | 'zh') => {
    await i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    setIsLangMenuOpen(false)
  }

  return (
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
            to="/research"
            className="text-white/60 hover:text-white/90 transition-colors duration-200 ease-out text-sm font-medium cursor-pointer"
          >
            {t('nav.research')}
          </Link>
          <Link
            to="/openplatform"
            className="text-white/60 hover:text-white/90 transition-colors duration-200 ease-out text-sm font-medium cursor-pointer"
          >
            {t('nav.openplatform')}
          </Link>
          <Link
            to="/message"
            className="text-white/60 hover:text-white/90 transition-colors duration-200 ease-out text-sm font-medium cursor-pointer"
          >
            {t('nav.message')}
          </Link>
          <Link
            to="/promise"
            className="text-white/60 hover:text-white/90 transition-colors duration-200 ease-out text-sm font-medium cursor-pointer"
          >
            {t('nav.promise')}
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
  )
}
