'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Trophy, Clock, Users } from 'lucide-react'
import { HACKATHON_DOMAINS, JUDGING_CRITERIA, HACKATHON_TIMELINE } from '@/lib/constants'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'

export default function HackathonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="hackathon" className="section-padding bg-bg-secondary relative overflow-hidden" ref={ref}>
      {/* Cyan gradient accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="24-Hour Hackathon"
          subtitle="Build. Ship. Demo. — April 10, 12:00 PM → April 11, 12:00 PM"
        />

        {/* Domain Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mb-16">
          {HACKATHON_DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl bg-bg-primary border border-border-default p-6 card-hover-cyan relative overflow-hidden group"
            >
              {/* Domain number badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center">
                <span className="text-accent-cyan text-sm font-bold">{domain.number}</span>
              </div>

              {/* Tech pattern bg */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity dot-grid" />

              <Code2 className="w-8 h-8 text-accent-cyan mb-4" />
              <h3 className="font-heading font-semibold text-text-primary mb-3 pr-10">
                {domain.title}
              </h3>
              <div className="space-y-1.5">
                {domain.areas.map((area) => (
                  <p key={area} className="text-text-secondary text-sm flex items-start gap-2">
                    <span className="text-accent-cyan mt-1 text-xs">▸</span>
                    {area}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Judging Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="font-heading font-semibold text-xl text-text-primary mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent-cyan" />
            Judging Criteria
          </h3>
          <div className="space-y-4">
            {JUDGING_CRITERIA.map((criteria) => (
              <div key={criteria.name} className="flex items-center gap-4">
                <span className="text-text-secondary text-sm w-48 shrink-0">{criteria.name}</span>
                <div className="flex-1 h-3 bg-bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${criteria.percentage * 4}%` } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #00E5FF, #00E5FF${Math.round(criteria.percentage * 2.55).toString(16).padStart(2, '0')})`,
                    }}
                  />
                </div>
                <span className="text-accent-cyan font-heading font-bold text-sm w-12 text-right">
                  {criteria.percentage}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="font-heading font-semibold text-xl text-text-primary mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent-cyan" />
            24-Hour Journey
          </h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border-default" />

            <div className="space-y-6">
              {HACKATHON_TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="flex gap-4 md:gap-6 items-start"
                >
                  <div className="relative z-10 w-8 md:w-12 h-8 md:h-12 shrink-0 rounded-full bg-bg-primary border-2 border-accent-cyan/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                  </div>
                  <div className="pt-1 md:pt-2">
                    <span className="text-accent-cyan font-heading font-medium text-sm">{item.time}</span>
                    <p className="text-text-primary font-medium">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4 text-text-secondary">
            <Users className="w-5 h-5" />
            <span>Team size: 2–5 members | Cross-college teams allowed | ~500 slots (limited)</span>
          </div>
          <p className="text-text-muted text-sm">
            Hackathon fee: ₹100 extra for all participants. Judged by Startup Founders + Faculty Panel.
          </p>
          <p className="text-text-muted text-sm">
            Prizes: Cash prizes + trophies + internship offers from Gold sponsors
          </p>
          <Button
            variant="cyan"
            size="lg"
            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Register for Hackathon
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
