'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Instagram, Gift, Eye, Sparkles } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

export default function SocialContest() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-bg-primary" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="#PreciousFirstSVCE"
          subtitle="Post. Win. Get Featured."
          gradient
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rules */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="font-heading font-semibold text-lg text-text-primary flex items-center gap-2">
              <Instagram className="w-5 h-5 text-accent-orange" />
              How to Participate
            </h3>
            <div className="space-y-4">
              {[
                'Post about the fest on Instagram during event days',
                'Include #PreciousFirstSVCE + tag @SVCE_GDG',
                'Any format: Reel, photo, story, carousel',
              ].map((rule, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full gradient-cta flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-text-secondary text-sm">{rule}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-primary text-sm font-medium">Judging:</span>
                  <span className="text-text-secondary text-sm ml-2">50% reach/impressions + 50% creativity</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-primary text-sm font-medium">Prizes:</span>
                  <span className="text-text-secondary text-sm ml-2">Premium gift hamper, vouchers, SVCE merchandise</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instagram Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="w-72 rounded-2xl bg-bg-secondary border border-border-default overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-3 border-b border-border-default">
                <div className="w-8 h-8 rounded-full gradient-cta flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-text-primary text-sm font-medium">@SVCE_GDG</span>
              </div>
              {/* Image area */}
              <div className="aspect-square bg-bg-tertiary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 dot-grid opacity-50" />
                <div className="relative z-10 text-center p-6">
                  <p className="gradient-text font-heading font-bold text-2xl mb-2">
                    FRESHERS FEST
                  </p>
                  <p className="text-text-secondary text-xs">
                    #PreciousFirstSVCE
                  </p>
                </div>
              </div>
              {/* Caption */}
              <div className="p-3">
                <p className="text-text-secondary text-xs leading-relaxed">
                  <span className="text-text-primary font-medium">your_name</span>{' '}
                  Best college fest ever! 🔥 #PreciousFirstSVCE @SVCE_GDG
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
