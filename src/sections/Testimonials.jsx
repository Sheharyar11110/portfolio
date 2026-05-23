import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[index]

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Testimonials"
          title="What clients say"
          align="center"
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -40, rotateY: 10 }}
              transition={{ duration: 0.6 }}
              className="glass-colored rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            >
              <Quote className="w-10 h-10 text-violet/40 mx-auto mb-6" />
              <p className="text-xl md:text-2xl font-display font-light leading-relaxed text-balance">
                "{current.quote}"
              </p>
              <footer className="mt-8">
                <cite className="not-italic font-semibold text-gradient-warm">{current.author}</cite>
                <p className="text-sm text-cyan mt-1">{current.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? 'w-10 bg-gradient-to-r from-violet to-cyan'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
