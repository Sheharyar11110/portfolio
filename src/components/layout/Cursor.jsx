import { motion } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function Cursor({ mouse }) {
  const isTouch = useMediaQuery('(pointer: coarse)')

  if (isTouch) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'linear-gradient(135deg, #7c5cff, #22d3ee)',
          boxShadow: '0 0 20px rgba(124, 92, 255, 0.6)',
        }}
        animate={{ x: mouse.x - 8, y: mouse.y - 8 }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-violet/30 pointer-events-none z-[9998]"
        animate={{ x: mouse.x - 24, y: mouse.y - 24 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  )
}
