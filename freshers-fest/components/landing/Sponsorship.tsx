'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SPONSOR_TIERS, FOOD_STALL_TIERS } from '@/lib/constants'
import { Check, Mail, UtensilsCrossed } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Sponsorship() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sponsors" className="section-padding bg-bg-primary" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Partner With Us" subtitle="Three tiers. Unlimited visibility." />

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SPONSOR_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-bg-secondary border border-border-default overflow-hidden card-hover-orange"
            >
              {/* Top gradient bar */}
              <div
                className="h-1.5"
                style={{
                  background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)`,
                }}
              />

              <div className="p-6">
                <h3
                  className="font-heading font-bold text-xl mb-1"
                  style={{ color: tier.color }}
                >
                  {tier.name}
                </h3>
                <p className="text-text-muted text-sm mb-5">{tier.priceRange}</p>

                <ul className="space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-text-secondary text-sm">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tier.color }} />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <a href="mailto:gdg@svce.ac.in?subject=Sponsorship%20Inquiry%20-%20Freshers%20Fest%202026">
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="w-4 h-4" />
                      Partner With Us — Contact GDG SVCE
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Food Stall Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="rounded-xl bg-bg-secondary border border-border-default p-6 max-w-2xl mx-auto card-hover-orange"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <UtensilsCrossed className="w-6 h-6 text-accent-orange" />
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Food Stall Sponsorship
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            {FOOD_STALL_TIERS.map((stall) => (
              <div key={stall.name} className="text-center p-3 rounded-lg bg-bg-tertiary">
                <p className="font-heading font-semibold text-accent-orange text-sm">{stall.price}</p>
                <p className="text-text-primary text-sm font-medium mt-1">{stall.name}</p>
                <p className="text-text-muted text-xs mt-1">{stall.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="mailto:gdg@svce.ac.in?subject=Food%20Stall%20Sponsorship">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4" />
                Partner With Us — Contact GDG SVCE
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
