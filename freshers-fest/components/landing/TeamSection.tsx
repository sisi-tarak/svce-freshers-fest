'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crown, ChevronDown } from 'lucide-react'
import { TEAM_MEMBERS } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'

function ArrowConnector({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center py-3 ${className || ''}`}>
      <div className="w-0.5 h-8 bg-gradient-to-b from-accent-orange to-accent-orange/30" />
      <ChevronDown className="w-5 h-5 text-accent-orange -mt-1" />
    </div>
  )
}

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }} ref={ref}>
      {/* Gradient decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-orange/3 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="The Team Behind The Fest"
          subtitle="150+ organizers. One mission."
        />

        {/* Event Lead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-orange/20 to-accent-orange/5 border-2 border-accent-orange/40 flex items-center justify-center glow-orange-subtle">
              <Crown className="w-10 h-10 text-accent-orange" />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-accent-orange/20 animate-ping" style={{ animationDuration: '3s' }} />
          </div>
          <h3 className="font-heading font-bold text-xl mt-4" style={{ color: 'var(--text-primary)' }}>{TEAM_MEMBERS.lead.name}</h3>
          <p className="text-accent-orange text-sm font-semibold tracking-wide uppercase">{TEAM_MEMBERS.lead.role}</p>
        </motion.div>

        {/* Arrow from Lead to Core Team */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <ArrowConnector />
        </motion.div>

        {/* Core Team Heads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-heading font-semibold" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' }}>
              Core Team Heads
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TEAM_MEMBERS.core.map((member, i) => (
              <motion.div
                key={`${member.role}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.04 }}
                className="text-center p-4 rounded-xl border card-hover-orange group"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-default)' }}
              >
                <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-accent-orange/20 transition-colors">
                  <span className="font-heading font-bold text-accent-orange text-sm">{member.name.charAt(0)}</span>
                </div>
                <p className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{member.name}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arrow from Core to Events Sub-Heads */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <ArrowConnector />
        </motion.div>

        {/* Events Sub-Heads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-heading font-semibold" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' }}>
              Events Sub-Heads
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {TEAM_MEMBERS.events.map((member, i) => (
              <motion.div
                key={`${member.role}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65 + i * 0.04 }}
                className="text-center p-4 rounded-xl border card-hover-orange group"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-default)' }}
              >
                <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-accent-orange/20 transition-colors">
                  <span className="font-heading font-bold text-accent-orange text-sm">{member.name.charAt(0)}</span>
                </div>
                <p className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{member.name}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
