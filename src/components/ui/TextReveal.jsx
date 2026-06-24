import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TextReveal({ text, as: Tag = 'span', className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = text.split(' ')
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden align-bottom"><span class="word inline-block">${word}</span></span>`,
      )
      .join('<span class="inline-block w-[0.25em]"></span>')

    const targets = el.querySelectorAll('.word')
    gsap.set(targets, { yPercent: 110, opacity: 0 })

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.06,
      delay,
      ease: 'power4.out',
    })

    return () => tween.kill()
  }, [text, delay])

  return <Tag ref={ref} className={className} />
}
