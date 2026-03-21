'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crown, ChevronDown, Users, Zap } from 'lucide-react'
import { TEAM_MEMBERS } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'
import { DottedSurface } from '@/components/ui/dotted-surface'
import { useTheme } from '@/hooks/useTheme'

function ArrowConnector() {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, var(--border-default), transparent)' }} />
      <ChevronDown className="w-4 h-4 -mt-1" style={{ color: 'var(--text-muted)' }} />
    </div>
  )
}

function MemberCard({ name, role, delay, isInView }: { name: string; role: string; delay: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="text-center px-3 py-4 rounded-xl border transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-default)',
      }}
    >
      <p className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{name}</p>
      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{role}</p>
    </motion.div>
  )
}

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { theme } = useTheme()

  return (
    <section
      id="team"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      ref={ref}
    >
      {/* 3D Dotted Surface background */}
      <DottedSurface isDark={theme === 'dark'} className="opacity-20 z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="The Team Behind The Fest"
          subtitle="150+ organizers making it happen."
        />

        {/* Event Lead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border-2"
            style={{
              borderColor: 'var(--border-default)',
              backgroundColor: 'var(--bg-primary)',
            }}
          >
            <Crown className="w-7 h-7 text-accent-orange" />
          </div>
          <h3 className="font-heading font-bold text-lg mt-3" style={{ color: 'var(--text-primary)' }}>
            {TEAM_MEMBERS.lead.name}
          </h3>
          <p className="text-accent-orange text-xs font-semibold tracking-wider uppercase mt-0.5">
            {TEAM_MEMBERS.lead.role}
          </p>
        </motion.div>

        <ArrowConnector />

        {/* Core Team Heads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <Users className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <span className="text-sm font-heading font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Core Team Heads
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TEAM_MEMBERS.core.map((member, i) => (
              <MemberCard
                key={`${member.role}-${i}`}
                name={member.name}
                role={member.role}
                delay={0.25 + i * 0.03}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        <ArrowConnector />

        {/* Events Sub-Heads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <Zap className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <span className="text-sm font-heading font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Events Sub-Heads
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {TEAM_MEMBERS.events.map((member, i) => (
              <MemberCard
                key={`${member.role}-${i}`}
                name={member.name}
                role={member.role}
                delay={0.55 + i * 0.03}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
