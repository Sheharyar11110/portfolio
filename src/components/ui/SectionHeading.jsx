import { motion } from 'framer-motion'

export default function SectionHeading({
  index,
  label,
  title,
  description,
  align = 'left',
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left max-w-2xl'

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 md:mb-20 flex flex-col relative ${alignClass}`}
    >
      {index && (
        <span className="absolute -top-8 md:-top-12 text-[5rem] md:text-[8rem] font-display font-bold text-fg/[0.04] leading-none select-none pointer-events-none">
          {index}
        </span>
      )}

      {label && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-5 origin-left"
        >
          <span className="h-px w-10 bg-fg" />
          <span className="text-xs tracking-label uppercase text-fg-subtle font-medium">
            {label}
          </span>
        </motion.div>
      )}

      <h2 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-display text-balance leading-[1.05]">
        {title}
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 text-fg-muted text-base md:text-lg leading-relaxed max-w-xl"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
