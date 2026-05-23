import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '../components/ui/MagneticButton'
import ScrollIndicator from '../components/ui/ScrollIndicator'

const HeroScene = lazy(() => import('../three/HeroScene'))

export default function Hero({ mouse }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <Suspense fallback={<div className="absolute inset-0 gradient-ambient" />}>
        <HeroScene mouse={mouse} />
      </Suspense>

      <div className="absolute inset-0 gradient-ambient pointer-events-none" />

      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-xs md:text-sm tracking-[0.35em] uppercase text-silver mb-6"
          >
            Creative Engineer — San Francisco
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-balance"
          >
            Crafting
            <br />
            <span className="text-silver">digital</span> elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-8 text-lg md:text-xl text-silver max-w-xl leading-relaxed"
          >
            Premium 3D experiences, product design, and full-stack engineering
            for brands that demand refinement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="#projects"
              className="text-sm font-medium bg-graphite dark:bg-cream text-cream dark:text-graphite px-8 py-4 rounded-full"
            >
              View selected work
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="text-sm font-medium glass px-8 py-4 rounded-full text-graphite dark:text-cream"
            >
              Start a project
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
