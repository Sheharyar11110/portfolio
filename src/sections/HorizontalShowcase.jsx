import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
import { projects } from '../data/projects'
import { aiAgents } from '../data/agents'

function HorizontalCard({ item, type }) {
  const isAgent = type === 'agent'

  return (
    <motion.article
      whileHover={{ scale: 1.03, rotateY: 2 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative shrink-0 w-[85vw] md:w-[420px] lg:w-[480px] h-[520px] rounded-3xl overflow-hidden card-shine group cursor-pointer"
      style={{
        background: isAgent
          ? `linear-gradient(160deg, ${item.color}22, rgba(12,10,20,0.9))`
          : undefined,
      }}
    >
      {!isAgent && (
        <>
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-transparent" />
        </>
      )}

      {isAgent && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${item.color}, transparent 60%)`,
          }}
        />
      )}

      <div className="relative h-full flex flex-col justify-end p-8 z-10">
        {isAgent ? (
          <span className="text-5xl mb-4">{item.icon}</span>
        ) : (
          <span
            className="text-xs font-display tracking-widest uppercase mb-2"
            style={{ color: item.color }}
          >
            {item.year}
          </span>
        )}
        <h3 className="font-display text-2xl md:text-3xl font-semibold">{item.name || item.title}</h3>
        <p className="text-silver-light text-sm mt-1">{item.role || item.subtitle}</p>
        <p className="text-silver text-sm mt-4 line-clamp-3 leading-relaxed">
          {item.description}
        </p>
        {!isAgent && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {isAgent && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.stack.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-1 rounded-md"
                style={{ background: `${item.color}33`, color: item.color }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <ArrowUpRight
          className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
          size={24}
          style={{ color: isAgent ? item.color : '#fff' }}
        />
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
    <section className="relative bg-graphite-soft/50">
      <div className="section-padding pb-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <span className="text-xs font-display tracking-[0.3em] uppercase text-cyan">
            Scroll horizontally →
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 text-gradient-warm">
            Agents & Projects
          </h2>
          <p className="text-silver mt-4 max-w-xl">
            Drag through my AI systems and shipped products — pinned scroll experience powered by GSAP.
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} className="overflow-hidden md:overflow-visible">
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 px-6 md:px-12 lg:px-20 py-8 w-max overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory md:snap-none"
        >
          {combined.map((item) => (
            <HorizontalCard
              key={item.id}
              item={item}
              type={item._type}
            />
          ))}
          <div className="shrink-0 w-[20vw]" aria-hidden />
        </div>
      </div>
    </section>
  )
}
