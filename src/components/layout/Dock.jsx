import { motion } from 'framer-motion'
import { Home, User, Bot, Layers, Briefcase, Mail } from 'lucide-react'

const items = [
  { icon: Home, href: '#hero', label: 'Home', color: '#7c5cff' },
  { icon: User, href: '#about', label: 'About', color: '#22d3ee' },
  { icon: Bot, href: '#agents', label: 'AI', color: '#f472b6' },
  { icon: Layers, href: '#skills', label: 'Skills', color: '#34d399' },
  { icon: Briefcase, href: '#projects', label: 'Work', color: '#fb923c' },
  { icon: Mail, href: '#contact', label: 'Contact', color: '#a78bfa' },
]

export default function Dock() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex"
    >
      <div className="glass border border-violet/20 rounded-2xl px-2 py-2 flex items-center gap-1 shadow-2xl glow-violet">
        {items.map(({ icon: Icon, href, label, color }) => (
          <motion.a
            key={href}
            href={href}
            aria-label={label}
            whileHover={{ y: -8, scale: 1.15 }}
            className="group relative w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
          >
            <Icon
              size={18}
              className="text-silver group-hover:transition-colors"
              style={{ color: undefined }}
            />
            <span
              className="absolute -top-1 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: color }}
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
