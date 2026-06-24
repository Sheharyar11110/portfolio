export default function Marquee({ items }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-5 border-b border-border bg-bg-secondary">
      <div className="marquee-track flex w-max gap-16 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-sm md:text-base font-semibold tracking-display uppercase text-fg-subtle flex items-center gap-16 shrink-0"
          >
            {item}
            <span className="w-1.5 h-1.5 bg-fg/30 shrink-0 rotate-45" />
          </span>
        ))}
      </div>
    </div>
  )
}
