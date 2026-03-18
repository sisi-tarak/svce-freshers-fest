'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crown, Users } from 'lucide-react'
import { TEAM_MEMBERS } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="section-padding bg-bg-secondary" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="The Team Behind The Fest"
          subtitle="150+ organizers. One mission."
        />

        {/* Event Lead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-center mb-12"
        >
          <div className="w-20 h-20 rounded-full bg-accent-orange/10 border-2 border-accent-orange/30 flex items-center justify-center mb-4 glow-orange-subtle">
            <Crown className="w-8 h-8 text-accent-orange" />
          </div>
          <h3 className="font-heading font-bold text-xl text-text-primary">{TEAM_MEMBERS.lead.name}</h3>
          <p className="text-accent-orange text-sm font-medium">{TEAM_MEMBERS.lead.role}</p>
        </motion.div>

        {/* Core Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-6 flex items-center gap-2 justify-center">
            <Users className="w-5 h-5 text-accent-cyan" />
            Core Team Heads
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TEAM_MEMBERS.core.map((member, i) => (
              <motion.div
                key={`${member.role}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.04 }}
                className="text-center p-4 rounded-xl bg-bg-primary border border-border-default"
              >
                <p className="font-heading font-semibold text-sm text-text-primary">{member.name}</p>
                <p className="text-text-muted text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Events Sub-Heads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-6 flex items-center gap-2 justify-center">
            <Users className="w-5 h-5 text-accent-orange" />
            Events Sub-Heads
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {TEAM_MEMBERS.events.map((member, i) => (
              <motion.div
                key={`${member.role}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.04 }}
                className="text-center p-4 rounded-xl bg-bg-primary border border-border-default"
              >
                <p className="font-heading font-semibold text-sm text-text-primary">{member.name}</p>
                <p className="text-text-muted text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
