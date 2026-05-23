export const skillCategories = [
  { id: 'frontend', label: 'Frontend', color: '#61dafb' },
  { id: 'backend', label: 'Backend & APIs', color: '#3b82f6' },
  { id: 'infra', label: 'Infrastructure', color: '#22d3ee' },
  { id: 'data', label: 'Databases', color: '#336791' },
  { id: 'ai', label: 'AI & Agents', color: '#f472b6' },
  { id: 'creative', label: '3D & Creative', color: '#7c5cff' },
  { id: 'mobile', label: 'Mobile', color: '#54c5f8' },
]

export const skills = [
  // Frontend
  { name: 'React', level: 96, color: '#61dafb', category: 'frontend' },
  { name: 'Next.js', level: 92, color: '#ffffff', category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, color: '#38bdf8', category: 'frontend' },
  { name: 'Three.js', level: 88, color: '#7c5cff', category: 'creative' },

  // Backend
  { name: 'Python', level: 94, color: '#3776ab', category: 'backend' },
  { name: 'FastAPI', level: 92, color: '#009688', category: 'backend' },
  { name: 'NestJS', level: 90, color: '#e0234e', category: 'backend' },
  { name: 'Node.js', level: 93, color: '#34d399', category: 'backend' },

  // Infrastructure
  { name: 'Docker', level: 91, color: '#2496ed', category: 'infra' },
  { name: 'Redis', level: 89, color: '#dc382d', category: 'infra' },
  { name: 'Kafka', level: 86, color: '#ff6600', category: 'infra' },

  // Databases
  { name: 'PostgreSQL', level: 92, color: '#336791', category: 'data' },
  { name: 'MySQL', level: 88, color: '#00758f', category: 'data' },
  { name: 'MongoDB', level: 90, color: '#00ed64', category: 'data' },

  // AI
  { name: 'OpenAI / Agents', level: 93, color: '#22d3ee', category: 'ai' },
  { name: 'LangChain', level: 87, color: '#f472b6', category: 'ai' },
  { name: 'TensorFlow', level: 85, color: '#ff6f00', category: 'ai' },

  // Mobile
  { name: 'Flutter', level: 82, color: '#54c5f8', category: 'mobile' },
]
