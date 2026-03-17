'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MILESTONES, EXTERNAL_PRICE } from '@/lib/constants'
import { useMilestone } from '@/hooks/useMilestone'
import { Check, Zap, PartyPopper } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/ui/SectionHeading'

export default function MilestonePricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { externalCount, milestone } = useMilestone(0)

  const progressPercent = Math.min((externalCount / 600) * 100, 100)

  return (
    <section id="milestone" className="section-padding bg-bg-primary relative overflow-hidden" ref={ref}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-orange/[0.02] to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Live Milestone Pricing"
          subtitle="As more external students register, SVCE students pay less. Help us hit 600!"
          gradient
        />

        {/* Live Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-accent-orange/20">
            <Zap className="w-5 h-5 text-accent-orange" />
            <span className="text-lg font-heading">
              <span className="text-accent-orange font-bold text-2xl">{externalCount}</span>
              <span className="text-text-secondary ml-2">external students registered</span>
            </span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative h-4 bg-bg-tertiary rounded-full overflow-hidden border border-border-default">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${progressPercent}%` } : {}}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
              className="absolute inset-y-0 left-0 gradient-cta rounded-full"
            />
            {/* Milestone markers */}
            {[200, 400, 600].map((mark) => (
              <div
                key={mark}
                className="absolute top-0 bottom-0 w-0.5 bg-text-muted/30"
                style={{ left: `${(mark / 600) * 100}%` }}
              />
            ))}
          </div>

          {/* Milestone labels */}
          <div className="flex justify-between mt-2 text-xs text-text-muted px-1">
            <span>0</span>
            <span>200</span>
            <span>400</span>
            <span>600+</span>
          </div>
        </motion.div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MILESTONES.map((m, i) => {
            const isPassed = externalCount > m.max
            const isCurrent = milestone.tier === m.tier
            const isFree = m.tier === 'free'

            return (
              <motion.div
                key={m.tier}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={cn(
                  'relative rounded-xl p-5 border transition-all duration-500',
                  isCurrent
                    ? 'bg-accent-orange/10 border-accent-orange/40 glow-orange-subtle'
                    : isPassed
                    ? 'bg-bg-secondary border-green-500/30'
                    : 'bg-bg-secondary border-border-default'
                )}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-0.5 rounded-full bg-accent-orange text-white text-xs font-bold uppercase">
                      Current
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                  {isPassed ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : isFree ? (
                    <PartyPopper className="w-5 h-5 text-accent-cyan" />
                  ) : (
                    <div className={cn(
                      'w-5 h-5 rounded-full border-2',
                      isCurrent ? 'border-accent-orange bg-accent-orange/30' : 'border-text-muted'
                    )} />
                  )}
                  <span className="text-sm text-text-secondary">{m.label}</span>
                </div>

                <div className="text-center">
                  <span className="text-sm text-text-muted block mb-1">SVCE Students pay</span>
                  <span className={cn(
                    'text-3xl font-heading font-bold',
                    isFree ? 'text-accent-cyan' : 'text-text-primary'
                  )}>
                    {isFree ? 'FREE' : `₹${m.svcePrice}`}
                  </span>
                  {isFree && <span className="block text-accent-cyan text-sm mt-1">🎉</span>}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* External price note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 space-y-2"
        >
          <p className="text-text-secondary">
            External student price:{' '}
            <span className="text-text-primary font-heading font-bold">₹{EXTERNAL_PRICE}</span>
            {' '}(fixed)
          </p>
          <p className="text-text-muted text-sm italic">
            Help us hit 600 external registrations and ALL SVCE students get in FREE!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
