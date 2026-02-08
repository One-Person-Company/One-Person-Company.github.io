import { motion } from 'framer-motion'

export default function Footer() {
  return (
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
  )
}
