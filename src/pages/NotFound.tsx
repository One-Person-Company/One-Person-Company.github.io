import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="text-7xl font-light mb-6 text-white/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          404
        </motion.div>
        <motion.h1
          className="text-5xl md:text-6xl font-light mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {t('notfound.title')}
        </motion.h1>
        <motion.p
          className="text-lg text-white/70 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          {t('notfound.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          <Link to="/" className="btn-capsule inline-block">
            {t('notfound.backHome')}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
