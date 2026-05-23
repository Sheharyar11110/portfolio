export const aiAgents = [
  {
    id: 'orchestrator',
    name: 'Orchestrator Agent',
    role: 'Multi-agent coordinator',
    description:
      'Routes tasks across specialized agents via FastAPI gateway. Redis for session memory, Kafka for async job queues.',
    color: '#7c5cff',
    icon: '🧠',
    stack: ['FastAPI', 'Redis', 'Kafka'],
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'research',
    name: 'Research Agent',
    role: 'Deep web intelligence',
    description:
      'Python workers scrape, embed, and summarize — results stored in PostgreSQL with vector search via Redis cache.',
    color: '#22d3ee',
    icon: '🔍',
    stack: ['Python', 'PostgreSQL', 'Redis'],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'code',
    name: 'Code Agent',
    role: 'Dev automation',
    description:
      'Reviews PRs and generates tests. Dockerized sandbox runners, FastAPI webhooks, and Kafka-triggered CI pipelines.',
    color: '#34d399',
    icon: '⚡',
    stack: ['FastAPI', 'Docker', 'Kafka'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'support',
    name: 'Support Agent',
    role: '24/7 customer AI',
    description:
      'Context-aware chatbot with CRM sync over WebSockets. PostgreSQL conversation history, Redis rate limiting.',
    color: '#f472b6',
    icon: '💬',
    stack: ['FastAPI', 'PostgreSQL', 'Redis'],
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    role: 'Data insights',
    description:
      'Natural language → SQL over PostgreSQL. Kafka streams ingest events; Python + FastAPI serves charts in real time.',
    color: '#fb923c',
    icon: '📊',
    stack: ['Python', 'PostgreSQL', 'Kafka'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
  },
]
