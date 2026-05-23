import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { Bot, Layers, Rocket, Globe } from 'lucide-react'
import { profile } from '../data/profile'
import SectionHeading from '../components/ui/SectionHeading'

const stats = [
  { value: 50, suffix: '+', label: 'Projects shipped', icon: Rocket, color: '#7c5cff' },
  { value: 15, suffix: '+', label: 'AI agents deployed', icon: Bot, color: '#22d3ee' },
  { value: 6, suffix: '+', label: 'Years experience', icon: Layers, color: '#f472b6' },
  { value: 12, suffix: '', label: 'Countries served', icon: Globe, color: '#34d399' },
]

function AnimatedStat({ value, suffix, label, icon: Icon, color }) {
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
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05, y: -6 }}
      className="glass-colored rounded-2xl p-6 text-center"
    >
      <Icon className="w-6 h-6 mx-auto mb-3" style={{ color }} />
      <p className="font-display text-3xl md:text-4xl font-bold">
        <span ref={numRef}>0{suffix}</span>
      </p>
      <p className="mt-2 text-xs text-silver uppercase tracking-wider">{label}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="About Me"
          title={`Hi, I'm ${profile.shortName}`}
          description={profile.bio}
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-violet/30 via-cyan/20 to-pink/20 rounded-3xl blur-2xl animate-pulse" />
            <div className="relative glass rounded-3xl p-2 glow-violet">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt={profile.name}
                className="w-full aspect-[4/5] object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 glass-colored rounded-2xl px-6 py-4 max-w-[220px]"
            >
              <p className="text-xs text-cyan uppercase tracking-widest mb-1">Currently</p>
              <p className="text-sm font-semibold">Building AI agents & 3D web apps</p>
            </motion.div>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-silver-light mb-6"
            >
              {profile.extendedBio}
            </motion.p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {profile.highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm glass rounded-xl px-4 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet to-cyan shrink-0" />
                  {h}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
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
