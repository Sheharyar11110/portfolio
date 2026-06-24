import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Code2, Network } from 'lucide-react'
import { profile } from '../data/profile'
import SectionHeading from '../components/ui/SectionHeading'
import MagneticButton from '../components/ui/MagneticButton'
import Reveal, { Stagger, StaggerItem } from '../components/ui/Reveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks ${form.name}! I'll get back to you soon.`)
    setForm({ name: '', email: '', message: '' })
  }

  const links = [
    { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
    { icon: MapPin, text: profile.location, href: null },
    { icon: Code2, text: 'GitHub', href: profile.github },
    { icon: Network, text: 'LinkedIn', href: profile.linkedin },
  ]

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <SectionHeading
              index="07"
              label="Contact"
              title="Let's build something together"
              description="Open for full-stack contracts, AI agent projects, and long-term collaborations."
            />
            <Stagger className="space-y-3 mt-4" stagger={0.08}>
              {links.map(({ icon: Icon, text, href }) => (
                <StaggerItem key={text}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 glass-card px-5 py-4 surface-hover"
                  >
                    <Icon size={16} className="text-fg-muted shrink-0" strokeWidth={1.5} />
                    {href ? (
                      <a href={href} className="text-sm text-fg-muted hover:text-fg transition-colors">
                        {text}
                      </a>
                    ) : (
                      <span className="text-sm text-fg-muted">{text}</span>
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal direction="right" delay={0.1}>
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 space-y-5 card-shine"
            >
              {['name', 'email', 'message'].map((field) => (
                <div key={field} className="relative">
                  <label
                    htmlFor={field}
                    className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${
                      focused === field || form[field]
                        ? 'top-2 text-[10px] text-fg-subtle uppercase tracking-widest'
                        : 'top-4 text-fg-muted'
                    }`}
                  >
                    {field === 'message' ? 'Your message' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === 'message' ? (
                    <textarea
                      id={field}
                      rows={4}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-bg border border-border px-4 pt-8 pb-3 outline-none focus:border-border-strong transition-colors resize-none text-sm"
                      required
                    />
                  ) : (
                    <input
                      id={field}
                      type={field === 'email' ? 'email' : 'text'}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-bg border border-border px-4 pt-8 pb-3 outline-none focus:border-border-strong transition-colors text-sm"
                      required
                    />
                  )}
                </div>
              ))}
              <MagneticButton type="submit" className="btn-primary w-full py-4">
                Send message <Send size={14} />
              </MagneticButton>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
