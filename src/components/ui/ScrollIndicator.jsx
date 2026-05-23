import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-silver hover:text-cyan transition-colors z-20"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase font-display">Scroll</span>
      <motion.div className="flex flex-col items-center gap-1">
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-violet/40 flex justify-center pt-2"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-gradient-to-b from-violet to-cyan"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.a>
  )
}
