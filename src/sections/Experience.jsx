import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { experience } from '../data/experience'

const colors = ['#7c5cff', '#22d3ee', '#f472b6']

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const color = colors[index % colors.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      whileHover={{ x: 8 }}
      className="relative pl-14 pb-16 last:pb-0 group"
    >
      <motion.div
        className="absolute left-0 top-1 w-4 h-4 rounded-full"
        style={{ background: color, boxShadow: `0 0 20px ${color}` }}
        animate={inView ? { scale: [0, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
      />
      {index < experience.length - 1 && (
        <motion.div
          className="absolute left-[7px] top-5 w-0.5 origin-top"
          style={{ background: `linear-gradient(to bottom, ${color}, transparent)`, height: 'calc(100% - 8px)' }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        />
      )}
      <span className="text-xs text-cyan font-display tracking-widest">{item.period}</span>
      <h3 className="font-display text-xl md:text-2xl font-bold mt-2 group-hover:text-gradient-warm transition-all">
        {item.role}
      </h3>
      <p className="text-sm mt-1 font-medium" style={{ color }}>{item.company}</p>
      <p className="mt-4 text-silver leading-relaxed max-w-lg">{item.description}</p>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <SectionHeading
          label="Career"
          title="Experience & impact"
          description="Building full-stack products and AI systems for clients worldwide."
        />
        <div className="lg:pt-8">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
