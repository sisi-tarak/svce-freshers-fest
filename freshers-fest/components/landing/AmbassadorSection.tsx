'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Ticket, Award, KeyRound, Globe, Star } from 'lucide-react'
import { AMBASSADOR_BENEFITS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ticket, Award, KeyRound, Globe, Star,
}

export default function AmbassadorSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ambassador" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }} ref={ref}>
      <div className="absolute top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.4 }} />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          title="Become a Campus Ambassador"
          subtitle="1 ambassador per college. Every 10 registrations using your code = 1 FREE PASS."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-bg-primary border border-border-default p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {AMBASSADOR_BENEFITS.map((benefit, i) => {
              const Icon = iconMap[benefit.icon]
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    {Icon && <Icon className="w-5 h-5 text-text-secondary" />}
                  </div>
                  <span className="text-text-secondary text-sm">{benefit.text}</span>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              glow
              onClick={() => window.open('https://forms.google.com', '_blank')}
            >
              Apply as Ambassador
            </Button>
            <p className="text-text-muted text-xs mt-4">
              Each ambassador gets a unique referral code. Students must register WITH your code for it to count.
              Have a referral code? Enter it during registration on Ticket9.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
