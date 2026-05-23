import { lazy, Suspense, useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useLenis } from './hooks/useLenis'
import { useMouse } from './hooks/useMouse'
import FloatingBubbles from './components/effects/FloatingBubbles'
import Marquee from './components/effects/Marquee'
import LoadingScreen from './components/layout/LoadingScreen'
import Navbar from './components/layout/Navbar'
import Cursor from './components/layout/Cursor'
import CommandPalette from './components/layout/CommandPalette'
import Dock from './components/layout/Dock'
import Footer from './components/layout/Footer'
import AmbientAudio from './components/layout/AmbientAudio'
import Hero from './sections/Hero'
import About from './sections/About'
import AIAgents from './sections/AIAgents'
import HorizontalShowcase from './sections/HorizontalShowcase'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'

const Assistant = lazy(() => import('./components/layout/Assistant'))

const marqueeItems = [
  'Sheharyar Liaqat',
  'Python · FastAPI',
  'Docker · Redis · Kafka',
  'PostgreSQL',
  'AI Agents',
  'React · Three.js',
  'Full Stack Developer',
  'OpenAI · LangChain',
]

function AppContent() {
  const [loading, setLoading] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const mouse = useMouse()

  useLenis()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <FloatingBubbles />
      <LoadingScreen isLoading={loading} />
      <AmbientAudio />
      <Cursor mouse={mouse} />
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onClose={setCommandOpen} />
      <Dock />

      <main className="relative z-10">
        <Hero mouse={mouse} />
        <Marquee items={marqueeItems} />
        <About />
        <AIAgents />
        <HorizontalShowcase />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <Suspense fallback={null}>
        <Assistant />
      </Suspense>
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
