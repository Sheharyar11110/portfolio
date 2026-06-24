import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })

    return () => tween.scrollTrigger?.kill()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-px bg-border pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-fg origin-left scale-x-0"
        style={{ transformOrigin: 'left center' }}
      />
    </div>
  )
}
