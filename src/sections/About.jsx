import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/profile'
import SectionHeading from '../components/ui/SectionHeading'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import Reveal, { Stagger, StaggerItem } from '../components/ui/Reveal'
import profile_img from '../assets/profile.jpg'
gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 50, suffix: '+', label: 'Projects shipped' },
  { value: 15, suffix: '+', label: 'AI agents deployed' },
  { value: 6, suffix: '+', label: 'Years experience' },
  { value: 12, suffix: '', label: 'Countries served' },
]

const profilePhoto = profile_img

export default function About() {
  const imageRef = useRef(null)

  useEffect(() => {
    const img = imageRef.current
    if (!img) return

    const tween = gsap.fromTo(
      img,
      { y: 40, scale: 1.08 },
      {
        y: -40,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      },
    )

    return () => tween.scrollTrigger?.kill()
  }, [])

  return (
    <section id="about" className="section-padding border-b border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="01"
          label="About"
          title={`Hi, I'm ${profile.shortName}`}
          description={profile.bio}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal direction="left" className="relative">
            <div className="aspect-[4/5] overflow-hidden border border-border card-shine">
              <img
                ref={imageRef}
                src={profilePhoto}
                alt={profile.name}
                className="w-full h-full object-cover object-top "
                loading="lazy"
                decoding="async"
              />
            </div>
            <Reveal delay={0.2} className="absolute -bottom-4 -right-4 md:right-4 glass-card px-5 py-4 max-w-[240px]">
              <p className="text-[10px] tracking-label uppercase text-fg-subtle mb-1">Currently</p>
              <p className="text-sm font-medium">Building AI agents & full-stack platforms</p>
            </Reveal>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8">
                {profile.extendedBio}
              </p>
            </Reveal>

            <Stagger className="grid grid-cols-2 gap-3 mb-10" stagger={0.06}>
              {profile.highlights.map((h) => (
                <StaggerItem key={h}>
                  <div className="flex items-center gap-3 text-sm glass-card px-4 py-3 surface-hover h-full">
                    <span className="w-1 h-1 bg-fg shrink-0" />
                    {h}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Stagger className="grid grid-cols-2 gap-px bg-border" stagger={0.1}>
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="bg-bg p-6 md:p-8 group hover:bg-bg-elevated transition-colors">
                    <p className="font-display text-3xl md:text-4xl font-bold tracking-display">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-xs text-fg-muted uppercase tracking-wider">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
