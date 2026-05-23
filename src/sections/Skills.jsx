import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { skills, skillCategories } from '../data/skills'
import { profile } from '../data/profile'

const backendColors = {
  Python: '#3776ab',
  FastAPI: '#009688',
  Docker: '#2496ed',
  Redis: '#dc382d',
  Kafka: '#ff6600',
  PostgreSQL: '#336791',
}

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.6, type: 'spring' }}
      whileHover={{ y: -10, scale: 1.04, rotateY: 5 }}
      className="glass rounded-2xl p-5 relative overflow-hidden group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}33, transparent 70%)`,
        }}
      />
      <div className="relative flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-sm md:text-base">{skill.name}</h3>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-md"
          style={{ background: `${skill.color}22`, color: skill.color }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.04 + 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

function BackendStackBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-colored rounded-3xl p-8 md:p-10 mb-16 border border-cyan/20"
    >
      <p className="font-body text-xs tracking-label uppercase text-cyan mb-6 text-center">
        Core backend & infrastructure
      </p>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {profile.backendStack.map((tech, i) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.08 }}
            className="px-5 py-3 rounded-2xl font-display font-semibold text-sm md:text-base border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${backendColors[tech]}22, transparent)`,
              boxShadow: `0 0 30px ${backendColors[tech]}22`,
              color: backendColors[tech],
            }}
          >
            {tech}
          </motion.div>
        ))}
      </div>
      <p className="text-center text-silver text-sm mt-6 max-w-2xl mx-auto">
        Production-grade APIs with FastAPI, event streaming via Kafka, caching with Redis,
        persistence on PostgreSQL — all containerized with Docker.
      </p>
    </motion.div>
  )
}

export default function Skills() {
  let cardIndex = 0

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          label="Tech Stack"
          title="Full stack · Backend · AI"
          description="Python & FastAPI microservices, Kafka pipelines, Docker deployments — plus React, Three.js, and intelligent agents."
          align="center"
        />

        <BackendStackBanner />

        {skillCategories.map((cat) => {
          const categorySkills = skills.filter((s) => s.category === cat.id)
          if (!categorySkills.length) return null

          return (
            <div key={cat.id} className="mb-14 last:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: cat.color }}
                />
                <h3 className="font-display text-xl md:text-2xl font-semibold">{cat.label}</h3>
                <div className="flex-1 h-px bg-white/10" />
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categorySkills.map((skill) => {
                  const idx = cardIndex++
                  return <SkillCard key={skill.name} skill={skill} index={idx} />
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
