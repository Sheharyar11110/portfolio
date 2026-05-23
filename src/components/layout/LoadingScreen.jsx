import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../../data/profile'

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-graphite"
        >
          <div className="absolute inset-0 mesh-bg opacity-60" />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <motion.div
              className="w-20 h-20 rounded-full border-2 border-violet/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan border-r-pink"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-lg text-gradient-warm">
              {profile.initials}
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 font-display text-sm tracking-[0.3em] uppercase text-silver"
          >
            Loading {profile.shortName}
          </motion.p>
          <motion.div
            className="mt-4 h-1 w-32 rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-violet to-cyan"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
