import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[index]

  return (
    <section className="section-padding border-b border-border bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="06" label="Testimonials" title="What clients say" align="center" />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-10 md:p-14 text-center card-shine"
            >
              <p className="text-xl md:text-2xl font-display font-light leading-relaxed text-balance">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <cite className="not-italic font-semibold">{current.author}</cite>
                <p className="text-sm text-fg-muted mt-1">{current.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-px transition-all duration-500 ${
                  i === index ? 'w-10 bg-fg' : 'w-4 bg-border hover:bg-fg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
