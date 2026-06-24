import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-fg-subtle hover:text-fg transition-colors z-20"
    >
      <span className="text-[10px] tracking-label uppercase">Scroll</span>
      <motion.div
        className="w-5 h-9 border border-fg-subtle rounded-full flex justify-center pt-2"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-px h-2 bg-fg"
          animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.a>
  )
}
