import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Code2, Network } from 'lucide-react'
import { profile } from '../data/profile'
import SectionHeading from '../components/ui/SectionHeading'
import MagneticButton from '../components/ui/MagneticButton'

const ContactAmbient = lazy(() => import('../three/ContactAmbient'))

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks ${form.name}! I'll get back to you soon.`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <Suspense fallback={null}>
        <ContactAmbient />
      </Suspense>
      <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeading
              label="Contact"
              title="Let's build something intelligent"
              description="Open for full-stack contracts, AI agent projects, and long-term collaborations."
            />
            <div className="space-y-4 mt-8">
              {[
                { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
                { icon: MapPin, text: profile.location, href: null },
                { icon: Code2, text: 'GitHub', href: profile.github },
                { icon: Network, text: 'LinkedIn', href: profile.linkedin },
              ].map(({ icon: Icon, text, href }) => (
                <motion.div
                  key={text}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 glass rounded-xl px-5 py-4"
                >
                  <Icon size={18} className="text-cyan shrink-0" />
                  {href ? (
                    <a href={href} className="text-silver-light hover:text-cyan transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="text-silver-light">{text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-colored rounded-3xl p-8 md:p-10 space-y-5 glow-violet"
          >
            {['name', 'email', 'message'].map((field) => (
              <div key={field} className="relative">
                <label
                  htmlFor={field}
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${
                    focused === field || form[field]
                      ? 'top-2 text-[10px] text-cyan uppercase tracking-widest'
                      : 'top-4 text-silver'
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-8 pb-3 outline-none focus:border-violet/50 focus:ring-2 focus:ring-violet/20 transition-all resize-none"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-8 pb-3 outline-none focus:border-violet/50 focus:ring-2 focus:ring-violet/20 transition-all"
                    required
                  />
                )}
              </div>
            ))}
            <MagneticButton
              type="submit"
              className="w-full text-sm font-bold bg-gradient-to-r from-violet via-cyan to-emerald text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2"
            >
              Send to Sheharyar <Send size={16} />
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
