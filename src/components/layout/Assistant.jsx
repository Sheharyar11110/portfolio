import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const replies = {
  default:
    'I craft premium digital experiences. Ask about my work, skills, or how to start a project.',
  work: 'Explore the Projects section for case studies in fintech, creative studios, and AI.',
  contact: 'Head to the Contact section or email hello@alexmercer.dev',
  skills: 'React, Three.js, NestJS, Flutter, and more — see the Skills section.',
}

function getReply(msg) {
  const lower = msg.toLowerCase()
  if (lower.includes('project') || lower.includes('work')) return replies.work
  if (lower.includes('contact') || lower.includes('hire')) return replies.contact
  if (lower.includes('skill') || lower.includes('tech')) return replies.skills
  return replies.default
}

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: replies.default },
  ])
  const [input, setInput] = useState('')

  const send = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages((m) => [
      ...m,
      { role: 'user', text: userMsg },
      { role: 'assistant', text: getReply(userMsg) },
    ])
    setInput('')
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg md:bottom-8"
        aria-label="AI assistant"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="fixed bottom-40 right-6 z-40 w-80 glass rounded-2xl shadow-2xl overflow-hidden md:bottom-24"
          >
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs font-display tracking-widest uppercase text-silver">
                Assistant
              </p>
            </div>
            <div className="h-48 overflow-y-auto p-4 space-y-3 hide-scrollbar">
              {messages.map((m, i) => (
                <p
                  key={i}
                  className={`text-sm ${m.role === 'user' ? 'text-right text-accent' : 'text-silver'}`}
                >
                  {m.text}
                </p>
              ))}
            </div>
            <form onSubmit={send} className="p-3 border-t border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-silver"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
