import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { skills } from '../data/skills'

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass rounded-2xl p-6 group cursor-default"
      style={{ perspective: 800 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-medium">{skill.name}</h3>
        <span className="text-xs text-silver font-display">{skill.level}%</span>
      </div>
      <div className="h-px bg-silver/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent/60 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: skill.level / 100 } : {}}
          transition={{ delay: index * 0.06 + 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-ambient pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          label="Expertise"
          title="Technology with intention"
          description="A curated stack for building premium digital products at scale."
          align="center"
        />

        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-silver/5 pointer-events-none hidden lg:block"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
