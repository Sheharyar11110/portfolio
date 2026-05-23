import { useEffect, useState } from 'react'

export function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, normalized: { x: 0, y: 0 } })

  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      setMouse({
        x: e.clientX,
        y: e.clientY,
        normalized: { x: nx, y: ny },
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return mouse
}
