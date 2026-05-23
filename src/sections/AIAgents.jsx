import { motion } from 'framer-motion'
import { Bot, Zap, Shield, GitBranch } from 'lucide-react'
import { aiAgents } from '../data/agents'
import SectionHeading from '../components/ui/SectionHeading'

const features = [
  { icon: Bot, title: 'Multi-Agent', desc: 'Orchestrated workflows with memory & tools' },
  { icon: Zap, title: 'Real-time', desc: 'WebSocket streams & live token analytics' },
  { icon: Shield, title: 'Secure', desc: 'RBAC, audit logs, rate limiting' },
  { icon: GitBranch, title: 'Integrable', desc: 'REST, webhooks, MCP server support' },
]

export default function AIAgents() {
  return (
    <section id="agents" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-ambient pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          label="AI Systems"
          title="Intelligent agents that work for you"
          description="AI agents powered by FastAPI, Redis, Kafka, and PostgreSQL — production-ready orchestration with Docker deployments."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-colored rounded-2xl p-6 text-center"
            >
              <f.icon className="w-8 h-8 mx-auto text-cyan mb-4" />
              <h3 className="font-display font-semibold">{f.title}</h3>
              <p className="text-sm text-silver mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -12, rotateY: 5 }}
              className="glass rounded-3xl p-8 relative overflow-hidden group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
                style={{ background: agent.color }}
              />
              <span className="text-4xl">{agent.icon}</span>
              <h3 className="font-display text-xl font-semibold mt-4">{agent.name}</h3>
              <p className="text-xs uppercase tracking-widest mt-1" style={{ color: agent.color }}>
                {agent.role}
              </p>
              <p className="text-silver text-sm mt-4 leading-relaxed">{agent.description}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {agent.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2.5 py-1 rounded-full border border-white/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <motion.div
                className="absolute bottom-0 left-0 h-1 rounded-full"
                style={{ background: agent.color }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
