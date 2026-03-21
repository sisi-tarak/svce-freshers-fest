'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Code2, GraduationCap, Cpu, Rocket, Users, Zap, Gamepad2, Music,
} from 'lucide-react'
import { EVENTS } from '@/lib/constants'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, GraduationCap, Cpu, Rocket, Users, Zap, Gamepad2, Music,
}

export default function EventGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="events" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }} ref={ref}>
      {/* Subtle decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.4 }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.3 }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Two Days. One Mission. Unlimited Energy."
          subtitle="From code marathons to college band nights — here's everything that's going down."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EVENTS.map((event, i) => {
            const Icon = iconMap[event.icon]
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group rounded-xl bg-bg-secondary border border-border-default p-6 card-hover-orange"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  {Icon && <Icon className="w-6 h-6 text-text-secondary" />}
                </div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">{event.title}</h3>
                <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                  {event.description}
                </p>
                <Badge variant={event.day.includes('1') && event.day.includes('2') ? 'cyan' : event.day.includes('1') ? 'orange' : 'default'}>
                  {event.day}
                </Badge>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
