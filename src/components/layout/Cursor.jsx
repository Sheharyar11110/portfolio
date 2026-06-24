import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = 0
    let y = 0
    let ringX = 0
    let ringY = 0
    let rafId = 0

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
      }
    }

    const tick = () => {
      ringX += (x - ringX) * 0.12
      ringY += (y - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`
      }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    const setHover = (hover) => {
      document.documentElement.classList.toggle('cursor-hover', hover)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHover(true)
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHover(false)
      }
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.classList.remove('cursor-hover')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block w-1.5 h-1.5 rounded-full bg-fg mix-blend-difference transition-transform duration-75"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block w-10 h-10 rounded-full border border-fg/30 mix-blend-difference transition-[width,height,border-color] duration-300 cursor-ring"
      />
    </>
  )
}
