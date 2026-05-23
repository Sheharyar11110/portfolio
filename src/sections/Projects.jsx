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
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Selected Work"
          title="Projects that define excellence"
          description="Curated case studies spanning fintech, creative studios, AI, and mobility."
        />

        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`text-xs font-display tracking-widest uppercase px-5 py-2.5 rounded-full transition-all ${
                activeFilter === f
                  ? 'bg-graphite dark:bg-cream text-cream dark:text-graphite'
                  : 'glass text-silver hover:text-graphite dark:hover:text-cream'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
                  i === 0 ? 'md:col-span-2 md:row-span-1' : ''
                }`}
                onClick={() => setSelected(project)}
              >
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 md:p-10">
                    <div>
                      <p className="text-xs text-silver-light uppercase tracking-widest mb-2">
                        {project.year}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl font-medium text-cream">
                        {project.title}
                      </h3>
                      <p className="text-cream/70 mt-2 text-sm">{project.subtitle}</p>
                    </div>
                    <ArrowUpRight className="absolute top-8 right-8 text-cream" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 pointer-events-none group-hover:opacity-0 transition-opacity">
                  <h3 className="font-display text-xl md:text-2xl font-medium text-cream">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider text-cream/60 border border-cream/20 rounded-full px-3 py-1"
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
            <div className="absolute inset-0 bg-graphite/40 dark:bg-black/60 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass rounded-3xl max-w-2xl w-full p-8 md:p-12 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <span className="text-xs tracking-[0.3em] uppercase text-silver">{selected.year}</span>
              <h3 className="font-display text-3xl font-medium mt-2">{selected.title}</h3>
              <p className="text-silver mt-1">{selected.subtitle}</p>
              <p className="mt-6 leading-relaxed text-silver">{selected.description}</p>
              <div className="flex flex-wrap gap-2 mt-8">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-silver/20 rounded-full px-4 py-1.5 text-silver"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
