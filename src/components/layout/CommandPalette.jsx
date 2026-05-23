import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { commandItems } from '../../data/navigation'
import { useTheme } from '../../context/ThemeContext'

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const { toggleTheme, toggleAmbient } = useTheme()

  const filtered = commandItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onClose(!open)
      }
      if (e.key === 'Escape') onClose(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handleSelect = (item) => {
    if (item.action === 'theme') toggleTheme()
    else if (item.action === 'ambient') toggleAmbient()
    else if (item.href) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
    }
    onClose(false)
    setQuery('')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-graphite/20 dark:bg-black/40 backdrop-blur-sm"
            onClick={() => onClose(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[201] w-[90%] max-w-lg glass rounded-2xl overflow-hidden shadow-2xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search size={18} className="text-silver" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-silver"
              />
              <kbd className="text-[10px] text-silver border border-silver/20 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>
            <ul className="max-h-64 overflow-y-auto py-2">
              {filtered.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center justify-between px-5 py-3 text-sm hover:bg-white/10 transition-colors text-left"
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <kbd className="text-[10px] text-silver font-display">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
