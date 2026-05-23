import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../../data/navigation'
import { useTheme } from '../../context/ThemeContext'
import MagneticButton from '../ui/MagneticButton'

export default function Navbar({ onOpenCommand }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <nav
          className={`mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between rounded-2xl transition-all duration-500 ${
            scrolled ? 'glass mx-4 md:mx-8 px-6 py-3' : ''
          }`}
          aria-label="Main navigation"
        >
          <a
            href="#hero"
            className="font-display text-lg font-medium tracking-tight hover:opacity-70 transition-opacity"
          >
            Mercer<span className="text-silver">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-silver hover:text-graphite dark:hover:text-cream transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenCommand}
              className="text-xs text-silver border border-silver/20 rounded-lg px-3 py-1.5 hover:border-silver/40 transition-colors font-display tracking-wider"
              aria-label="Open command palette"
            >
              ⌘K
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-sm hover:scale-105 transition-transform"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '◐' : '◑'}
            </button>
            <MagneticButton
              href="#contact"
              className="text-sm font-medium bg-graphite dark:bg-cream text-cream dark:text-graphite px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Let's talk
            </MagneticButton>
          </div>

          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cream/95 dark:bg-graphite/95 backdrop-blur-xl md:hidden pt-24 px-8"
          >
            <ul className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl font-medium"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
