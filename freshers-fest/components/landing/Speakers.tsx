'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SPEAKER_PLACEHOLDERS } from '@/lib/constants'
import { User, MessageCircle } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Speakers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="speakers" className="section-padding bg-bg-secondary" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="SVCEians Who Made It"
          subtitle="Real alumni. Real stories. No filter."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPEAKER_PLACEHOLDERS.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-bg-primary border border-border-default p-6 text-center card-hover-orange"
            >
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-bg-tertiary border-2 border-accent-orange/30 flex items-center justify-center glow-orange-subtle">
                <User className="w-10 h-10 text-text-muted" />
              </div>

              <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">
                {speaker.name}
              </h3>
              <p className="text-accent-orange text-sm font-medium mb-1">
                {speaker.current_role}
              </p>
              <p className="text-text-muted text-sm mb-3">{speaker.company}</p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {speaker.description}
              </p>

              <div className="mt-4 inline-flex items-center gap-1 text-xs text-accent-orange/70">
                <span className="px-2 py-0.5 rounded-full bg-accent-orange/10">{speaker.speaker_type}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 flex items-center justify-center gap-2 text-text-muted text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Students ask questions directly — raw, unfiltered. No moderator.
        </motion.div>
      </div>
    </section>
  )
}
