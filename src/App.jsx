import { lazy, Suspense, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useLenis } from './hooks/useLenis'
import Particles from './components/effects/Particles'
import Cursor from './components/layout/Cursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/layout/Navbar'
import CommandPalette from './components/layout/CommandPalette'
import Dock from './components/layout/Dock'
import Footer from './components/layout/Footer'
import Marquee from './components/effects/Marquee'
import Hero from './sections/Hero'

const About = lazy(() => import('./sections/About'))
const AIAgents = lazy(() => import('./sections/AIAgents'))
const HorizontalShowcase = lazy(() => import('./sections/HorizontalShowcase'))
const Skills = lazy(() => import('./sections/Skills'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Testimonials = lazy(() => import('./sections/Testimonials'))
const Contact = lazy(() => import('./sections/Contact'))

const marqueeItems = [
  'Full Stack Developer',
  'Python · FastAPI',
  'Docker · Redis · Kafka',
  'PostgreSQL',
  'AI Agents',
  'React',
  'Sheharyar Liaqat',
]

function AppContent() {
  const [commandOpen, setCommandOpen] = useState(false)
  useLenis()

  return (
    <>
      <Particles />
      <div className="fixed inset-0 noise-overlay z-[2] pointer-events-none" aria-hidden />
      <Cursor />
      <ScrollProgress />
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onClose={setCommandOpen} />
      <Dock />

      <main className="relative z-10">
        <Hero />
        <Marquee items={marqueeItems} />
        <Suspense fallback={null}>
          <About />
          <AIAgents />
          <HorizontalShowcase />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
