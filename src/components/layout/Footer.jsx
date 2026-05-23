export default function Footer() {
  return (
    <footer className="section-padding border-t border-silver/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-sm text-silver">
          © {new Date().getFullYear()} Alex Mercer. Crafted with precision.
        </p>
        <div className="flex gap-8 text-sm text-silver">
          <a href="https://github.com" className="hover:text-graphite dark:hover:text-cream transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" className="hover:text-graphite dark:hover:text-cream transition-colors">
            LinkedIn
          </a>
          <a href="mailto:hello@alexmercer.dev" className="hover:text-graphite dark:hover:text-cream transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
