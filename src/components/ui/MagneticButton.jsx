import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  href,
  type = 'button',
  download,
  ...props
}) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0, 0)'
  }

  const classes = `inline-flex items-center justify-center gap-2 transition-transform duration-300 ease-out ${className}`

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} download={download} className="inline-block">
        {inner}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className="inline-block border-0 bg-transparent p-0 cursor-pointer">
      {inner}
    </button>
  )
}
