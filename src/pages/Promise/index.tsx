import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import './index.css'

export default function Promise() {
  const { t } = useTranslation()

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-light mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {t('nav.promise')}
        </motion.h1>
        <motion.p
          className="text-lg text-white/70 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          Page coming soon...
        </motion.p>
      </div>
    </motion.section>
  )
}
