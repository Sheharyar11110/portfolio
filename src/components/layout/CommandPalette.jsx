import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { commandItems } from '../../data/navigation'
import { useTheme } from '../../context/ThemeContext'

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const { toggleTheme } = useTheme()

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
    else if (item.href) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
    }
    onClose(false)
    setQuery('')
  }

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-bg/60 backdrop-blur-sm"
        onClick={() => onClose(false)}
      />
      <div
        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[201] w-[90%] max-w-lg border border-border bg-bg overflow-hidden"
        role="dialog"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search size={16} className="text-fg-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-fg-subtle"
          />
          <kbd className="text-[10px] text-fg-subtle border border-border px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        <ul className="max-h-64 overflow-y-auto py-1">
          {filtered.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between px-5 py-3 text-sm hover:bg-bg-elevated transition-colors text-left"
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <kbd className="text-[10px] text-fg-subtle">{item.shortcut}</kbd>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
