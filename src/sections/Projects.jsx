import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { projects } from '../data/projects'

const filters = ['All', '2025', '2024', '2023']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.year === activeFilter)

  return (
    <section id="projects" className="section-padding border-b border-border bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="04"
          label="Portfolio"
          title="Shipped products & platforms"
          description="FastAPI backends, Kafka pipelines, and Dockerized services — paired with React frontends and AI agents."
        />

        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <motion.button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`text-xs tracking-label uppercase px-4 py-2 border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-inverse text-inverse-fg border-inverse'
                  : 'border-border text-fg-muted hover:border-border-strong hover:text-fg'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className={`group relative border border-border bg-bg overflow-hidden cursor-pointer card-shine ${
                  i === 0 ? 'md:col-span-2' : ''
                }`}
                onClick={() => setSelected(project)}
              >
                <div className={`overflow-hidden ${i === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6 md:p-8 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-xs tracking-label uppercase text-fg-subtle">
                      {project.year}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-semibold mt-1">
                      {project.title}
                    </h3>
                    <p className="text-fg-muted text-sm mt-1">{project.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-1 border border-border text-fg-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="shrink-0 w-11 h-11 border border-border flex items-center justify-center group-hover:bg-inverse group-hover:text-inverse-fg transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
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
              className="relative glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <img
                src={selected.image}
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-8 md:p-10 relative">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 border border-border flex items-center justify-center hover:bg-bg-elevated transition-colors"
                >
                  <X size={16} />
                </button>
                <span className="text-xs tracking-label uppercase text-fg-subtle">
                  {selected.year}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mt-2">
                  {selected.title}
                </h3>
                <p className="text-fg-muted text-sm mt-1">{selected.subtitle}</p>
                <p className="mt-6 leading-relaxed text-fg-muted">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-xs border border-border px-3 py-1 text-fg-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
