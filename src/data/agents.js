export const aiAgents = [
  {
    id: 'healthcare',
    name: 'Healthcare Diagnosis AI',
    role: 'Medical image analysis',
    description:
      'AI-powered platform for medical image analysis and disease detection — REST APIs for image processing, deep learning inference with TensorFlow/PyTorch, and automated report generation.',
    color: '#22d3ee',
    icon: '🏥',
    stack: ['FastAPI', 'TensorFlow', 'PyTorch', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'support',
    name: 'Customer Support AI',
    role: 'LLM-powered chat',
    description:
      'Intelligent customer support with real-time chat, conversation management, knowledge retrieval, and LLM-based automated responses with analytics dashboards.',
    color: '#34d399',
    icon: '💬',
    stack: ['FastAPI', 'OpenAI', 'Redis', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'wedx-pipeline',
    name: 'WedX Event Pipeline',
    role: 'Real-time event processing',
    description:
      'High-throughput event management with Kafka-based processing, Redis caching, real-time notifications, and role-based authentication deployed on AWS.',
    color: '#c084fc',
    icon: '⚡',
    stack: ['Kafka', 'Redis', 'FastAPI', 'AWS'],
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
  },
]
