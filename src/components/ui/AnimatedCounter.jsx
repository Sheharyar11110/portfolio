import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'

export default function AnimatedCounter({ value, suffix = '', className = '' }) {
  const ref = useRef(null)
  const numRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

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
    <motion.span ref={ref} className={className}>
      <span ref={numRef}>0{suffix}</span>
    </motion.span>
  )
}
