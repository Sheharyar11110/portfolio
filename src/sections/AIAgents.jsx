import { motion } from 'framer-motion'
import { Bot, Zap, Shield, GitBranch } from 'lucide-react'
import { aiAgents } from '../data/agents'
import SectionHeading from '../components/ui/SectionHeading'
import { Stagger, StaggerItem } from '../components/ui/Reveal'

const features = [
  { icon: Bot, title: 'Multi-Agent', desc: 'Orchestrated workflows with memory & tools' },
  { icon: Zap, title: 'Real-time', desc: 'WebSocket streams & live token analytics' },
  { icon: Shield, title: 'Secure', desc: 'RBAC, audit logs, rate limiting' },
  { icon: GitBranch, title: 'Integrable', desc: 'REST, webhooks, MCP server support' },
]

export default function AIAgents() {
  return (
    <section id="agents" className="section-padding border-b border-border bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="02"
          label="AI Systems"
          title="Intelligent agents that work for you"
          description="Production-ready orchestration with FastAPI, Redis, Kafka, and PostgreSQL — deployed with Docker."
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-16" stagger={0.08}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="bg-bg p-6 md:p-8 h-full group hover:bg-bg-elevated transition-colors">
                <f.icon className="w-5 h-5 mb-4 text-fg group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h3 className="font-display font-semibold text-sm">{f.title}</h3>
                <p className="text-sm text-fg-muted mt-2 leading-relaxed">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {aiAgents.map((agent, i) => (
            <StaggerItem key={agent.id}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden border border-border bg-bg card-shine h-full"
              >
                {agent.image && (
                  <div className="aspect-[16/10] overflow-hidden border-b border-border">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <p className="text-xs tracking-label uppercase text-fg-subtle">{agent.role}</p>
                  <h3 className="font-display text-xl font-semibold mt-2">{agent.name}</h3>
                  <p className="text-fg-muted text-sm mt-3 leading-relaxed">{agent.description}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {agent.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] uppercase tracking-wider px-2.5 py-1 border border-border text-fg-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-fg"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.8 }}
                />
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
