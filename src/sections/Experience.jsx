import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { experience } from '../data/experience'

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 8 }}
      className="relative pl-10 pb-14 last:pb-0 group"
    >
      <motion.div
        className="absolute left-0 top-1.5 w-2 h-2 bg-fg"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.1 }}
      />
      {index < experience.length - 1 && (
        <motion.div
          className="absolute left-[3px] top-4 w-px bg-border origin-top"
          style={{ height: 'calc(100% - 8px)' }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.2 }}
        />
      )}
      <span className="text-xs tracking-label uppercase text-fg-subtle">{item.period}</span>
      <h3 className="font-display text-lg md:text-xl font-semibold mt-2 group-hover:translate-x-1 transition-transform">
        {item.role}
      </h3>
      <p className="text-sm text-fg-muted mt-1">{item.company}</p>
      <p className="mt-4 text-fg-muted leading-relaxed text-sm max-w-lg">{item.description}</p>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding border-b border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
        <SectionHeading
          index="05"
          label="Career"
          title="Experience & impact"
          description="Building full-stack products and AI systems for clients worldwide."
        />
        <div className="lg:pt-4">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
