import { profile } from '../../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display text-lg font-semibold tracking-display">{profile.name}</p>
          <p className="text-sm text-fg-muted mt-1">{profile.title}</p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <a href={profile.github} className="text-fg-muted hover:text-fg transition-colors">
            GitHub
          </a>
          <a href={profile.linkedin} className="text-fg-muted hover:text-fg transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="text-fg-muted hover:text-fg transition-colors">
            Email
          </a>
        </div>

        <p className="text-xs text-fg-subtle">
          © {new Date().getFullYear()} {profile.shortName}
        </p>
      </div>
    </footer>
  )
}
