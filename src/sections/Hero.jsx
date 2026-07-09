import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight, FileDown } from 'lucide-react'
import { profile } from '../data/profile'
import TextReveal from '../components/ui/TextReveal'
import MagneticButton from '../components/ui/MagneticButton'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import Reveal from '../components/ui/Reveal'

gsap.registerPlugin(ScrollTrigger)

const tags = ['Full Stack', 'FastAPI · React', 'Docker · AWS', 'AI / ML']

export default function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const parallax = gsap.to(content, {
      y: 120,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => parallax.scrollTrigger?.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden border-b border-border"
    >
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden />

      <div ref={contentRef} className="relative w-full section-padding pt-32 md:pt-44 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fg opacity-30" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fg" />
            </span>
            <span className="text-xs tracking-label uppercase text-fg-muted font-medium">
              {profile.location} · Available for work
            </span>
          </motion.div>

          <p className="text-xs md:text-sm tracking-label uppercase text-fg-subtle mb-4 font-medium">
            {profile.title}
          </p>

          <TextReveal
            as="h1"
            text={profile.name}
            className="font-display text-[clamp(3.2rem,11vw,7.5rem)] font-bold tracking-display leading-[0.88] max-w-5xl"
            delay={0.35}
          />

          <Reveal delay={0.5} className="mt-10 md:mt-14 grid lg:grid-cols-[1fr_auto] gap-10 items-end max-w-5xl">
            <p className="text-lg md:text-2xl text-fg-muted leading-relaxed max-w-xl font-light">
              {profile.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <MagneticButton href="#projects" className="btn-primary">
                View work
                <ArrowDownRight size={16} />
              </MagneticButton>
              <MagneticButton href={profile.cv} className="btn-outline" download="SheharyarCV.pdf">
                Download CV
                <FileDown size={16} />
              </MagneticButton>
              <MagneticButton href="#contact" className="btn-outline">
                Get in touch
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.65} className="mt-14 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="glass-card text-xs px-4 py-2 text-fg-muted tracking-wide"
              >
                {tag}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.75} className="mt-16 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Role', value: profile.title },
              ...profile.backendStack.slice(0, 3).map((tech) => ({ label: 'Stack', value: tech })),
            ].map(({ label, value }) => (
              <div key={value}>
                <p className="text-[10px] tracking-label uppercase text-fg-subtle mb-1.5">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
