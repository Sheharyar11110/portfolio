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
  },
]
