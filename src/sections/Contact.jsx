import { useState } from 'react'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import MagneticButton from '../components/ui/MagneticButton'

const ContactAmbient = lazy(() => import('../three/ContactAmbient'))

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you — your message has been received.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <Suspense fallback={null}>
        <ContactAmbient />
      </Suspense>
      <div className="absolute inset-0 gradient-ambient pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <SectionHeading
            label="Contact"
            title="Let's create something exceptional"
            description="Available for select projects, collaborations, and speaking engagements."
          />

          <motion.form
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 md:p-10 space-y-6"
          >
            {['name', 'email', 'message'].map((field) => (
              <div key={field} className="relative">
                <label
                  htmlFor={field}
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${
                    focused === field || form[field]
                      ? 'top-2 text-[10px] text-silver uppercase tracking-widest'
                      : 'top-4 text-silver'
                  }`}
                >
                  {field === 'message' ? 'Message' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === 'message' ? (
                  <textarea
                    id={field}
                    rows={4}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-white/30 dark:bg-white/5 border border-silver/10 rounded-xl px-4 pt-8 pb-3 outline-none focus:border-accent/40 transition-colors resize-none"
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
                    className="w-full bg-white/30 dark:bg-white/5 border border-silver/10 rounded-xl px-4 pt-8 pb-3 outline-none focus:border-accent/40 transition-colors"
                    required
                  />
                )}
              </div>
            ))}
            <MagneticButton
              type="submit"
              className="w-full text-sm font-medium bg-graphite dark:bg-cream text-cream dark:text-graphite px-8 py-4 rounded-xl flex items-center justify-center gap-2"
            >
              Send message <Send size={16} />
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
