import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
import { projects } from '../data/projects'
import { aiAgents } from '../data/agents'
import Reveal from '../components/ui/Reveal'

function HorizontalCard({ item, type }) {
  const isAgent = type === 'agent'
  const title = item.name || item.title

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative shrink-0 w-[85vw] md:w-[400px] lg:w-[440px] border border-border bg-bg group card-shine snap-start"
    >
      {item.image && (
        <div className="aspect-[4/3] overflow-hidden border-b border-border">
          <img
            src={item.image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs tracking-label uppercase text-fg-subtle">
              {isAgent ? 'Agent' : item.year}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-semibold mt-1">{title}</h3>
            <p className="text-fg-muted text-sm mt-1">{item.role || item.subtitle}</p>
          </div>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-fg-subtle group-hover:text-fg group-hover:rotate-45 transition-all duration-300 mt-1"
          />
        </div>
        <p className="text-fg-muted text-sm mt-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function HorizontalShowcase() {
  const { containerRef, trackRef } = useHorizontalScroll()
  const combined = [
    ...aiAgents.slice(0, 3).map((a) => ({ ...a, _type: 'agent' })),
    ...projects.slice(0, 4).map((p) => ({ ...p, _type: 'project' })),
  ]

  return (
    <section className="border-b border-border bg-bg relative overflow-hidden">
      <div className="section-padding pb-8">
        <Reveal className="max-w-7xl mx-auto">
          <span className="text-xs tracking-label uppercase text-fg-subtle">Featured</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-display mt-4">
            Agents & Projects
          </h2>
          <p className="text-fg-muted mt-4 max-w-lg">
            Scroll horizontally through AI systems and shipped products — pinned scroll experience.
          </p>
        </Reveal>
      </div>

      <div ref={containerRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 px-6 md:px-12 lg:px-20 py-8 w-max overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory md:snap-none"
        >
          {combined.map((item) => (
            <HorizontalCard key={item.id} item={item} type={item._type} />
          ))}
          <div className="shrink-0 w-[15vw]" aria-hidden />
        </div>
      </div>
    </section>
  )
}
