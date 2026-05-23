import { motion } from 'framer-motion'
import { Home, User, Layers, Briefcase, Mail } from 'lucide-react'

const items = [
  { icon: Home, href: '#hero', label: 'Home' },
  { icon: User, href: '#about', label: 'About' },
  { icon: Layers, href: '#skills', label: 'Skills' },
  { icon: Briefcase, href: '#projects', label: 'Work' },
  { icon: Mail, href: '#contact', label: 'Contact' },
]

export default function Dock() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex"
    >
      <div className="glass rounded-2xl px-3 py-2 flex items-center gap-1 shadow-lg">
        {items.map(({ icon: Icon, href, label }) => (
          <a
            key={href}
            href={href}
            aria-label={label}
            className="group relative w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/20 dark:hover:bg-white/5 transition-colors"
          >
            <Icon size={18} className="text-silver group-hover:text-graphite dark:group-hover:text-cream transition-colors" />
          </a>
        ))}
      </div>
    </motion.div>
  )
}
