import { motion } from 'framer-motion'

export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : 'text-left max-w-2xl'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 md:mb-20 ${alignClass}`}
    >
      {label && (
        <span className="font-display text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-silver text-base md:text-lg leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </motion.div>
  )
}
