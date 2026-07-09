import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, FileDown } from 'lucide-react'
import { navLinks } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar({ onOpenCommand }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg/85 backdrop-blur-xl border-b border-border' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between">
          <a
            href="#hero"
            className="font-display text-sm font-bold tracking-display uppercase hover:opacity-70 transition-opacity"
          >
            {profile.initials}
          </a>

          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-fg-muted hover:text-fg transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-fg group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenCommand}
              className="text-xs text-fg-muted border border-border px-3 py-1.5 hover:border-border-strong hover:text-fg transition-colors"
            >
              ⌘K
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 border border-border flex items-center justify-center hover:border-border-strong transition-colors"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <motion.a
              href={profile.cv}
              download="SheharyarCV.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline text-xs px-5 py-2.5 hidden lg:inline-flex items-center gap-2"
            >
              <FileDown size={14} />
              CV
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-xs px-5 py-2.5"
            >
              Hire me
            </motion.a>
          </div>

          <button
            type="button"
            className="lg:hidden w-10 h-10 border border-border flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-bg lg:hidden pt-24 px-8"
          >
            <ul className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-4xl font-semibold tracking-display"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
              >
                <a
                  href={profile.cv}
                  download="SheharyarCV.pdf"
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-4xl font-semibold tracking-display"
                >
                  Download CV
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
