import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink } from 'lucide-react'
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
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 gradient-ambient pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          label="Portfolio"
          title="Shipped products & platforms"
          description="FastAPI backends, Kafka pipelines, and Dockerized services — paired with React frontends and AI agents."
        />

        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <motion.button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-xs font-display tracking-widest uppercase px-5 py-2.5 rounded-full transition-all ${
                activeFilter === f
                  ? 'bg-gradient-to-r from-violet to-cyan text-white glow-violet'
                  : 'glass text-silver hover:text-cream'
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
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
                  i === 0 ? 'md:col-span-2' : ''
                }`}
                onClick={() => setSelected(project)}
              >
                <div
                  className={`relative overflow-hidden ${i === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity"
                    style={{
                      background: `linear-gradient(to top, ${project.color}cc, transparent 60%)`,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  >
                    <span
                      className="w-16 h-16 rounded-full flex items-center justify-center glass glow-cyan"
                    >
                      <ArrowUpRight size={28} />
                    </span>
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-xs font-display tracking-widest" style={{ color: project.color }}>
                    {project.year}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mt-1">{project.title}</h3>
                  <p className="text-silver-light text-sm mt-1">{project.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full glass"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
            <div className="absolute inset-0 bg-graphite/80 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-colored rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
            >
              <img
                src={selected.image}
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-8 md:p-10">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center"
                >
                  <X size={18} />
                </button>
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: selected.color }}>
                  {selected.year}
                </span>
                <h3 className="font-display text-3xl font-bold mt-2">{selected.title}</h3>
                <p className="text-cyan text-sm mt-1">{selected.subtitle}</p>
                <p className="mt-6 leading-relaxed text-silver-light">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-xs glass px-4 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-8 flex items-center gap-2 text-sm text-cyan hover:underline"
                >
                  View case study <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
