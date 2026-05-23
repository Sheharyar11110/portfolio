import { motion } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function Cursor({ mouse }) {
  const isTouch = useMediaQuery('(pointer: coarse)')

  if (isTouch) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-graphite/20 dark:bg-cream/20 pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mouse.x - 6, y: mouse.y - 6 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-graphite/15 dark:border-cream/15 pointer-events-none z-[9998]"
        animate={{ x: mouse.x - 20, y: mouse.y - 20 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
      />
    </>
  )
}
