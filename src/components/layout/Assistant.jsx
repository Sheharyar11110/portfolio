import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X } from 'lucide-react'
import { profile } from '../../data/profile'

const replies = {
  default: `Hi! I'm ${profile.shortName}'s assistant. Ask about his experience, projects, skills, or how to hire him.`,
  agent: 'Sheharyar has built AI healthcare diagnosis and LLM-powered customer support systems. Check the AI Agents and Projects sections!',
  stack: 'Python, FastAPI, React, PostgreSQL, Redis, Kafka, Docker, AWS — plus TensorFlow, PyTorch, and LLM APIs. See Skills.',
  backend:
    'Sheharyar builds production backends with FastAPI, event-driven Kafka pipelines, Redis caching, PostgreSQL, and Docker deployments on AWS.',
  contact: `Email ${profile.email}, call ${profile.phone}, or use the contact form. Download his CV from the navbar or hero section.`,
  project: 'See WedX, AI Healthcare Diagnosis, and Intelligent Customer Support in the Projects section.',
  experience: 'Currently Full Stack Developer at Devstrix. Previously backend intern at CitrusBits and frontend intern at TechInsects.',
}

function getReply(msg) {
  const lower = msg.toLowerCase()
  if (lower.includes('agent') || lower.includes('ai')) return replies.agent
  if (lower.includes('backend') || lower.includes('fastapi') || lower.includes('kafka') || lower.includes('docker'))
    return replies.backend
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) return replies.stack
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('cv') || lower.includes('resume'))
    return replies.contact
  if (lower.includes('experience') || lower.includes('devstrix') || lower.includes('intern')) return replies.experience
  if (lower.includes('project') || lower.includes('work') || lower.includes('wedx')) return replies.project
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center shadow-lg glow-violet md:bottom-8"
        aria-label="AI assistant"
      >
        {open ? <X size={22} className="text-white" /> : <Bot size={22} className="text-white" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-44 right-6 z-40 w-80 glass-colored rounded-2xl shadow-2xl overflow-hidden border border-violet/30 md:bottom-28"
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <Bot size={16} className="text-cyan" />
              <p className="text-xs font-display tracking-widest uppercase text-cyan">
                {profile.shortName}'s Agent
              </p>
            </div>
            <div className="h-52 overflow-y-auto p-4 space-y-3 hide-scrollbar">
              {messages.map((m, i) => (
                <p
                  key={i}
                  className={`text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'text-right text-cyan ml-8'
                      : 'text-silver-light'
                  }`}
                >
                  {m.text}
                </p>
              ))}
            </div>
            <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI agents..."
                className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-violet/50"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-violet text-white text-xs font-semibold"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
