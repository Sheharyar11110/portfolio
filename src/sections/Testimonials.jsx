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
    <section className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Testimonials"
          title="Trusted by visionary teams"
          align="center"
        />

        <div className="relative max-w-3xl mx-auto mt-8">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl p-10 md:p-14 text-center"
            >
              <p className="text-xl md:text-2xl font-display font-light leading-relaxed text-balance">
                "{current.quote}"
              </p>
              <footer className="mt-8">
                <cite className="not-italic font-medium">{current.author}</cite>
                <p className="text-sm text-silver mt-1">{current.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-accent' : 'w-2 bg-silver/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
