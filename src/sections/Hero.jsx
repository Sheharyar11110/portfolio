import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Bot, Code2, Sparkles, Server } from 'lucide-react'
import { profile } from '../data/profile'
import MagneticButton from '../components/ui/MagneticButton'
import ScrollIndicator from '../components/ui/ScrollIndicator'

const HeroScene = lazy(() => import('../three/HeroScene'))

const tags = [
  { icon: Code2, label: 'Full Stack' },
  { icon: Server, label: 'FastAPI · Kafka' },
  { icon: Bot, label: 'AI Agents' },
  { icon: Sparkles, label: '3D Web' },
]

export default function Hero({ mouse }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 mesh-bg" />}>
        <HeroScene mouse={mouse} />
      </Suspense>

      <div className="absolute inset-0 mesh-bg pointer-events-none opacity-60" />

      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-28 md:pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-colored rounded-full px-4 py-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
            <span className="text-xs font-display tracking-widest uppercase text-silver-light">
              {profile.location}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-body text-sm md:text-base tracking-label uppercase text-cyan mb-4 font-medium"
          >
            {profile.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-display leading-[0.92]"
          >
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-xl md:text-2xl lg:text-3xl text-silver-light font-light max-w-3xl leading-snug"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {tags.map((tag, i) => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              >
                <tag.icon size={16} className="text-violet" />
                {tag.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="#agents"
              className="text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white px-8 py-4 rounded-full glow-violet"
            >
              Explore AI Agents
            </MagneticButton>
            <MagneticButton
              href="#projects"
              className="text-sm font-medium glass px-8 py-4 rounded-full border border-white/20 hover:border-violet/50 transition-colors"
            >
              View Projects
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
