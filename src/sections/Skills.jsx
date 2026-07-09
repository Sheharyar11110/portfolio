import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { skills, skillCategories } from '../data/skills'
import { profile } from '../data/profile'
import Reveal, { Stagger, StaggerItem } from '../components/ui/Reveal'

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="glass-card p-5 surface-hover"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm">{skill.name}</h3>
        <span className="text-xs text-fg-muted tabular-nums">{skill.level}%</span>
      </div>
      <div className="h-px bg-border overflow-hidden">
        <motion.div
          className="h-full bg-fg"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.03 + 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  let cardIndex = 0

  return (
    <section id="skills" className="section-padding border-b border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="03"
          label="Tech Stack"
          title="Full stack · Backend · AI"
          description="Python & FastAPI backends, React frontends, AWS & Docker deployments — plus AI/ML with TensorFlow and LLM APIs."
          align="center"
        />

        <Reveal>
          <div className="glass-card p-8 md:p-10 mb-16">
            <p className="text-xs tracking-label uppercase text-fg-subtle mb-6 text-center">
              Core backend & infrastructure
            </p>
            <Stagger className="flex flex-wrap justify-center gap-3" stagger={0.06}>
              {profile.backendStack.map((tech) => (
                <StaggerItem key={tech}>
                  <motion.span
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="inline-block px-4 py-2 border border-border text-sm font-medium hover:bg-bg-elevated transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>

        {skillCategories.map((cat) => {
          const categorySkills = skills.filter((s) => s.category === cat.id)
          if (!categorySkills.length) return null

          return (
            <Reveal key={cat.id} className="mb-12 last:mb-0">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-display text-lg md:text-xl font-semibold">{cat.label}</h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categorySkills.map((skill) => {
                  const idx = cardIndex++
                  return <SkillCard key={skill.name} skill={skill} index={idx} />
                })}
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
