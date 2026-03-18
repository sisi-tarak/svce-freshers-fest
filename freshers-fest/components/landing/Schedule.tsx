'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DAY1_SCHEDULE, DAY2_SCHEDULE } from '@/lib/constants'
import type { ScheduleItem } from '@/types'
import Tabs from '@/components/ui/Tabs'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import { MapPin } from 'lucide-react'

const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
  hackathon: { border: 'border-l-accent-orange', bg: 'bg-accent-orange/5', text: 'text-accent-orange' },
  tech: { border: 'border-l-accent-cyan', bg: 'bg-accent-cyan/5', text: 'text-accent-cyan' },
  general: { border: 'border-l-accent-orange-light', bg: 'bg-accent-orange-light/5', text: 'text-accent-orange-light' },
  break: { border: 'border-l-text-muted', bg: 'bg-text-muted/5', text: 'text-text-muted' },
  cultural: { border: 'border-l-purple-400', bg: 'bg-purple-400/5', text: 'text-purple-400' },
}

function ScheduleEntry({ item, index }: { item: ScheduleItem; index: number }) {
  const colors = categoryColors[item.category] || categoryColors.general
  const isHighlight = item.title.includes('OFFICIAL') || item.title.includes('HACKATHON ENDS') || item.title.includes('MUSICAL')

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className={cn(
        'flex gap-4 md:gap-6 p-4 rounded-lg border-l-4 transition-colors',
        colors.border,
        isHighlight ? colors.bg : 'hover:bg-bg-tertiary/30'
      )}
    >
      <div className="w-20 shrink-0">
        <span className={cn('font-heading font-semibold text-sm', colors.text)}>
          {item.time}
        </span>
      </div>
      <div className="flex-1">
        <h4 className={cn(
          'font-medium text-text-primary',
          isHighlight && 'font-heading font-bold'
        )}>
          {item.title}
        </h4>
        {item.venue && (
          <p className="text-text-muted text-sm mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.venue}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('day1')
  const ref = useRef(null)
  useInView(ref, { once: true })

  const schedule = activeDay === 'day1' ? DAY1_SCHEDULE : DAY2_SCHEDULE

  return (
    <section id="schedule" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }} ref={ref}>
      {/* Gradient overlay */}
      <div className="absolute top-20 left-0 w-96 h-96 rounded-full bg-accent-orange/3 blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          title="The Complete Schedule"
          subtitle="Every minute planned. Every moment legendary."
        />

        <div className="flex justify-center mb-10">
          <Tabs
            tabs={[
              { id: 'day1', label: 'Day 1 — Technology Day' },
              { id: 'day2', label: 'Day 2 — Celebration Day' },
            ]}
            activeTab={activeDay}
            onTabChange={setActiveDay}
          />
        </div>

        {/* Color Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs text-text-muted">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-accent-orange" /> Hackathon</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-accent-cyan" /> Tech Events</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-accent-orange-light" /> General</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-purple-400" /> Cultural</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-text-muted" /> Breaks</span>
        </div>

        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          {schedule.map((item, i) => (
            <ScheduleEntry key={`${activeDay}-${i}`} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
