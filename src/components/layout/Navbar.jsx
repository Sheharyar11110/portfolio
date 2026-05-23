import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useTheme } from '../../context/ThemeContext'
import MagneticButton from '../ui/MagneticButton'

export default function Navbar({ onOpenCommand }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleTheme } = useTheme()

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
        transition={{ delay: 0.8, duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <nav
          className={`mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between rounded-2xl transition-all duration-500 ${
            scrolled ? 'glass mx-4 md:mx-8 px-6 py-3 border border-violet/20' : ''
          }`}
        >
          <a href="#hero" className="font-display text-xl font-semibold tracking-display group">
            <span className="text-gradient-warm">{profile.initials}</span>
            <span className="text-silver text-sm font-normal ml-1 group-hover:text-cream transition-colors hidden sm:inline">
              .dev
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-silver hover:text-cyan transition-colors tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-violet to-cyan group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenCommand}
              className="text-xs text-silver border border-violet/30 rounded-lg px-3 py-1.5 hover:border-cyan/50 hover:text-cyan transition-all font-display"
            >
              ⌘K
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-sm hover:scale-110 transition-transform"
            >
              ◐
            </button>
            <MagneticButton
              href="#contact"
              className="text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white px-5 py-2.5 rounded-full"
            >
              Hire me
            </MagneticButton>
          </div>

          <button
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center glass rounded-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-graphite/98 backdrop-blur-2xl lg:hidden pt-24 px-8"
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
                    className="font-display text-4xl font-bold text-gradient-warm"
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
