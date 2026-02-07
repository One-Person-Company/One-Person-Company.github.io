import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
  },
}

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="h-screen w-full overflow-x-hidden overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center px-6 snap-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative line */}
        <motion.div
          className="w-12 h-0.5 bg-white/30 mb-12"
          variants={lineVariants}
          transition={{ duration: 1 }}
          style={{ originX: 0 }}
        />

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-light text-center mb-6 max-w-4xl leading-tight"
          variants={itemVariants}
          transition={{ duration: 0.6 }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* Sub heading */}
        <motion.p
          className="text-base md:text-lg text-center max-w-2xl text-white/70 mb-12 leading-relaxed"
          variants={itemVariants}
          transition={{ duration: 0.6 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="btn-capsule"
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('hero.cta')}
        </motion.button>
      </motion.section>

      {/* Value Propositions Section */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center py-6 px-6 snap-start"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl w-full">
          {/* Section Label */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 text-sm tracking-widest uppercase mb-4">
              {t('values.label')}
            </p>
            <div className="w-12 h-0.5 bg-white/20 mx-auto" />
          </motion.div>

          {/* Value Props Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-12 place-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                titleKey: 'values.prop1_title',
                subtitleKey: 'values.prop1_subtitle',
                descKey: 'values.prop1_desc',
              },
              {
                titleKey: 'values.prop2_title',
                subtitleKey: 'values.prop2_subtitle',
                descKey: 'values.prop2_desc',
              },
              {
                titleKey: 'values.prop3_title',
                subtitleKey: 'values.prop3_subtitle',
                descKey: 'values.prop3_desc',
              },
            ].map((prop, idx) => (
              <motion.div
                key={idx}
                className="relative w-full max-w-sm"
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="group relative w-full cursor-pointer">
                  {/* Card Border Accent */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative w-full p-8 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-200 ease-out flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white/90 mb-2">
                        {t(prop.titleKey)}
                      </h3>
                      <p className="text-sm text-white/50 font-light mb-4">
                        {t(prop.subtitleKey)}
                      </p>
                      <p className="text-white/60 leading-relaxed text-sm">
                        {t(prop.descKey)}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <motion.div
                      className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors duration-200 ease-out"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <span className="text-sm">
                        {t('common.language')}
                      </span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA Section */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center py-6 px-6 snap-start"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl w-full text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-light mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('footer.title')}
            <br className="hidden md:block" />
            {t('footer.titleContinue')}
          </motion.h2>
          <motion.p
            className="text-white/60 mb-12 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('footer.subtitle')}
          </motion.p>
          <motion.button
            className="btn-capsule"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('footer.cta')}
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}
