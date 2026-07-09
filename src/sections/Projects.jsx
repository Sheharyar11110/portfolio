import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { Stagger, StaggerItem } from '../components/ui/Reveal'
import { projects } from '../data/projects'

const filters = [
  { id: 'All', label: 'All' },
  { id: 'platform', label: 'Platform' },
  { id: 'ai', label: 'AI' },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="section-padding border-b border-border bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="04"
          label="Portfolio"
          title="Shipped products & platforms"
          description="WedX event platform, AI healthcare diagnosis, and intelligent customer support — built with FastAPI, React, and cloud-native tooling."
        />

        <Stagger className="flex flex-wrap gap-2 mb-12" stagger={0.06} delay={0.1}>
          {filters.map((f) => (
            <StaggerItem key={f.id}>
              <motion.button
                type="button"
                onClick={() => setActiveFilter(f.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`text-xs tracking-label uppercase px-4 py-2 border transition-all duration-300 ${
                  activeFilter === f.id
                    ? 'bg-inverse text-inverse-fg border-inverse'
                    : 'border-border text-fg-muted hover:border-border-strong hover:text-fg'
                }`}
              >
                {f.label}
              </motion.button>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger
          key={activeFilter}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          stagger={0.12}
          delay={0.05}
        >
          {filtered.map((project, i) => (
            <StaggerItem key={project.id} className={i === 0 ? 'md:col-span-2' : ''}>
              <motion.article
                whileHover={{ y: -10 }}
                style={{ '--project-accent': project.color }}
                className="project-card group relative border border-border bg-bg overflow-hidden cursor-pointer card-shine h-full"
                onClick={() => setSelected(project)}
              >
                  <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `linear-gradient(to top, ${project.color}55 0%, transparent 55%)`,
                      }}
                    />
                    <div className="absolute inset-0 bg-bg/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <motion.span
                      className="absolute top-4 left-4 text-[10px] tracking-label uppercase px-3 py-1.5 border backdrop-blur-sm opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                      style={{
                        borderColor: `${project.color}66`,
                        backgroundColor: `${project.color}22`,
                        color: project.color,
                      }}
                    >
                      View project
                    </motion.span>
                  </div>

                  <div className="p-6 md:p-8 flex items-end justify-between gap-4 relative">
                    <div className="min-w-0">
                      <span className="text-xs tracking-label uppercase text-fg-subtle">
                        {project.year}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-semibold mt-1 transition-transform duration-300 group-hover:translate-x-1">
                        {project.title}
                      </h3>
                      <p className="text-fg-muted text-sm mt-1 transition-colors duration-300 group-hover:text-fg">
                        {project.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-wider px-2.5 py-1 border border-border text-fg-muted transition-all duration-300 group-hover:border-border-strong group-hover:text-fg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.span
                      className="shrink-0 w-11 h-11 border border-border flex items-center justify-center transition-all duration-300 group-hover:text-inverse-fg"
                      style={{ backgroundColor: 'transparent' }}
                      whileHover={{ rotate: 45, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: project.color }}
                      />
                      <ArrowUpRight size={16} className="relative z-10 group-hover:text-white transition-colors duration-300" />
                    </motion.span>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5"
                    style={{ backgroundColor: project.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.article>
              </StaggerItem>
            ))}
        </Stagger>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bg/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={selected.image}
                  alt=""
                  className="w-full h-48 object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${selected.color}44, transparent 60%)`,
                  }}
                />
              </div>
              <div className="p-8 md:p-10 relative">
                <motion.button
                  type="button"
                  onClick={() => setSelected(null)}
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-4 right-4 w-10 h-10 border border-border flex items-center justify-center hover:bg-bg-elevated transition-colors"
                >
                  <X size={16} />
                </motion.button>
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs tracking-label uppercase text-fg-subtle"
                >
                  {selected.year}
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-display text-2xl md:text-3xl font-semibold mt-2"
                >
                  {selected.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-fg-muted text-sm mt-1"
                >
                  {selected.subtitle}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-6 leading-relaxed text-fg-muted"
                >
                  {selected.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mt-6"
                >
                  {selected.tags.map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + idx * 0.05 }}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="text-xs border border-border px-3 py-1 text-fg-muted hover:border-border-strong hover:text-fg transition-colors cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
