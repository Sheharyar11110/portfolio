import { motion } from 'framer-motion'
import { Home, User, Bot, Layers, Briefcase, Mail } from 'lucide-react'

const items = [
  { icon: Home, href: '#hero', label: 'Home' },
  { icon: User, href: '#about', label: 'About' },
  { icon: Bot, href: '#agents', label: 'AI' },
  { icon: Layers, href: '#skills', label: 'Skills' },
  { icon: Briefcase, href: '#projects', label: 'Work' },
  { icon: Mail, href: '#contact', label: 'Contact' },
]

export default function Dock() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex"
    >
      <div className="glass-dock flex items-center gap-1 px-2 py-2">
        {items.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={href}
            href={href}
            aria-label={label}
            whileHover={{ y: -6, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-11 h-11 flex items-center justify-center text-fg-muted hover:text-fg transition-colors"
          >
            <Icon size={17} strokeWidth={1.5} />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {label}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
