import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-silver hover:text-graphite dark:hover:text-cream transition-colors"
      aria-label="Scroll to about section"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase font-display">Scroll</span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-silver/60 to-transparent"
        animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.a>
  )
}
