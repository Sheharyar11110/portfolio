import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function AmbientAudio() {
  const { ambient } = useTheme()
  const ctxRef = useRef(null)
  const oscRef = useRef(null)

  useEffect(() => {
    if (!ambient) {
      if (oscRef.current) {
        oscRef.current.stop()
        oscRef.current = null
      }
      if (ctxRef.current) {
        ctxRef.current.close()
        ctxRef.current = null
      }
      return
    }

    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.value = 110
    filter.type = 'lowpass'
    filter.frequency.value = 400
    gain.gain.value = 0.015

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start()

    ctxRef.current = ctx
    oscRef.current = osc

    return () => {
      osc.stop()
      ctx.close()
    }
  }, [ambient])

  return null
}
