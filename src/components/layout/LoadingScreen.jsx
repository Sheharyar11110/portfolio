import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream dark:bg-graphite"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-12 h-12 rounded-full border border-silver/30" />
            <motion.div
              className="absolute inset-0 w-12 h-12 rounded-full border-t border-graphite dark:border-cream"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 font-display text-xs tracking-[0.4em] uppercase text-silver"
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
