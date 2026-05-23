import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import SectionHeading from '../components/ui/SectionHeading'

const stats = [
  { value: 8, suffix: '+', label: 'Years experience' },
  { value: 42, suffix: '', label: 'Projects delivered' },
  { value: 12, suffix: '', label: 'Awards won' },
]

function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const numRef = useRef(null)

  useEffect(() => {
    if (!inView || !numRef.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        numRef.current.textContent = Math.round(obj.val) + suffix
      },
    })
  }, [inView, value, suffix])

  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="font-display text-4xl md:text-5xl font-medium tracking-tight">
        <span ref={numRef}>0{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-silver">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="About"
          title="Where engineering meets editorial design"
          description="I build immersive digital products that feel as considered as physical luxury goods — calm, precise, and unforgettable."
        />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="glass rounded-3xl p-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Alex Mercer"
                className="w-full aspect-[4/5] object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-4 md:-right-8 glass rounded-2xl px-6 py-4 max-w-[200px]"
            >
              <p className="text-xs text-silver uppercase tracking-widest mb-1">Focus</p>
              <p className="text-sm font-medium">3D · Product · Full-stack</p>
            </motion.div>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-silver mb-8"
            >
              With a background spanning creative studios and tech startups, I
              specialize in translating ambitious visions into polished,
              performant experiences. Every pixel and polygon is intentional.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg leading-relaxed text-silver mb-12"
            >
              From WebGL hero scenes to enterprise SaaS platforms, I partner with
              teams who value craft, clarity, and calm sophistication.
            </motion.p>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-silver/10">
              {stats.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
