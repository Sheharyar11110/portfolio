import { motion } from 'framer-motion'

const bubbles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 40 + Math.random() * 120,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 12,
  color: ['#7c5cff', '#22d3ee', '#f472b6', '#34d399', '#fb923c'][i % 5],
  opacity: 0.08 + Math.random() * 0.15,
}))

export default function FloatingBubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full blur-2xl"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            opacity: b.opacity,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
