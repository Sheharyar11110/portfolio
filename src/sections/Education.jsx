import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { education } from '../data/education'
import { profile } from '../data/profile'

export default function Education() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (education.length <= 1) return undefined
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % education.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = education[index]

  return (
    <section id="education" className="section-padding border-b border-border bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="06"
          label="Education"
          title="Academic background"
          description="Computer Science graduate with a strong foundation in software engineering and full-stack development."
          align="center"
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-10 md:p-14 text-center card-shine"
            >
              <GraduationCap className="w-8 h-8 mx-auto mb-6 text-fg-muted" strokeWidth={1.5} />
              <p className="text-xl md:text-2xl font-display font-semibold leading-relaxed text-balance">
                {current.degree}
              </p>
              <p className="mt-4 text-fg-muted">{current.institution}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                <div>
                  <p className="text-[10px] tracking-label uppercase text-fg-subtle mb-1">Period</p>
                  <p className="font-medium">{current.period}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-label uppercase text-fg-subtle mb-1">Location</p>
                  <p className="font-medium">{current.location}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-label uppercase text-fg-subtle mb-1">CGPA</p>
                  <p className="font-medium">{current.cgpa}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {education.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {education.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Education ${i + 1}`}
                  className={`h-px transition-all duration-500 ${
                    i === index ? 'w-10 bg-fg' : 'w-4 bg-border hover:bg-fg-muted'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {profile.languages.map((lang) => (
            <span
              key={lang.name}
              className="glass-card text-xs px-4 py-2 text-fg-muted tracking-wide"
            >
              {lang.name} · {lang.level}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
