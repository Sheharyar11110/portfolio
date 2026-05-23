import { motion } from 'framer-motion'

export default function Marquee({ items, speed = 25 }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-6 border-y border-white/10">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-4xl md:text-6xl font-semibold tracking-display text-white/10 flex items-center gap-12 shrink-0"
          >
            {item}
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
