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
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12 pb-16 last:pb-0"
    >
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-accent/40 border-2 border-accent" />
      {index < experience.length - 1 && (
        <motion.div
          className="absolute left-[5px] top-4 w-px bg-silver/20 origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ height: 'calc(100% - 12px)' }}
        />
      )}
      <span className="text-xs text-silver font-display tracking-widest">{item.period}</span>
      <h3 className="font-display text-xl md:text-2xl font-medium mt-2">{item.role}</h3>
      <p className="text-accent-soft text-sm mt-1">{item.company}</p>
      <p className="mt-4 text-silver leading-relaxed max-w-lg">{item.description}</p>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-cream-dark/50 dark:bg-graphite-soft/30">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <SectionHeading
          label="Experience"
          title="A journey of refined craft"
          description="Building premium digital experiences across studios and startups."
        />
        <div className="lg:pt-24">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
