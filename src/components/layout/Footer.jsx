import { profile } from '../../data/profile'

export default function Footer() {
  return (
    <footer className="section-padding border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-xl font-bold text-gradient-warm">{profile.name}</p>
          <p className="text-sm text-silver mt-1">
            {profile.title} · FastAPI · Kafka · AI Agents
          </p>
        </div>
        <div className="flex gap-8 text-sm">
          <a href={profile.github} className="text-silver hover:text-cyan transition-colors">
            GitHub
          </a>
          <a href={profile.linkedin} className="text-silver hover:text-cyan transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="text-silver hover:text-cyan transition-colors">
            {profile.email}
          </a>
        </div>
        <p className="text-xs text-silver">
          © {new Date().getFullYear()} {profile.shortName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
