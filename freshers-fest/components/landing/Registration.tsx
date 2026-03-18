'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Ticket, ArrowRight, QrCode, MessageCircle, Mail } from 'lucide-react'
import { TICKET_PRICE, HACKATHON_FEE, TICKET9_URL } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Registration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="register" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }} ref={ref}>
      {/* Gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent-orange/3 blur-3xl pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeading
          title="Secure Your Spot"
          subtitle="Get your QR-coded ticket instantly via WhatsApp & Email."
          gradient
        />

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
        >
          {/* General Entry */}
          <div
            className="rounded-2xl p-6 border card-hover-orange"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-default)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-accent-orange" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Event Entry
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>For ALL students</p>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-heading font-bold text-accent-orange">₹{TICKET_PRICE}</span>
              <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>per person</span>
            </div>
            <ul className="space-y-2 mb-4">
              {[
                'Workshops (3 parallel tracks)',
                'Project Exhibition & Startup Showcase',
                'SVCEians Success Stories + Q&A',
                'Musical Evening (closed event)',
                'Fun Stalls access',
                'All meals included',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-accent-orange mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
              *SVCE students: ₹{TICKET_PRICE} or Free — subject to internal survey result.
            </p>
          </div>

          {/* Hackathon Add-On */}
          <div
            className="rounded-2xl p-6 border card-hover-cyan"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-default)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-accent-cyan" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Hackathon Add-On
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>On top of event entry</p>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-heading font-bold text-accent-cyan">+₹{HACKATHON_FEE}</span>
              <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>extra</span>
            </div>
            <ul className="space-y-2 mb-4">
              {[
                '24-hour hackathon access',
                '4 student-friendly domains',
                'Day 1 dinner + 2 snack rounds',
                'Mentoring sessions',
                'Cash prizes + trophies',
                'Internship offers from Gold sponsors',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-accent-cyan mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Hackathon fee covers dinner + snacks for participants.
            </p>
          </div>
        </motion.div>

        {/* Ticket Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 border mb-8"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-default)' }}
        >
          <h3 className="font-heading font-semibold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
            How It Works
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: '1', label: 'Register on this page', icon: '📝' },
              { step: '2', label: 'Pay via Ticket9', icon: '💳' },
              { step: '3', label: 'Get QR via WhatsApp & Email', icon: '📱' },
              { step: '4', label: 'Show QR at gate for entry', icon: '🎫' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="w-7 h-7 rounded-full gradient-cta text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ambassador Code Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="rounded-xl p-4 border mb-8 text-center"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-default)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Have a referral code from a Campus Ambassador? Enter it during registration on Ticket9 for them to earn rewards.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a
            href={TICKET9_URL}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full gradient-cta text-white text-lg font-heading font-semibold hover:opacity-90 transition-all cursor-pointer group pulse-glow"
          >
            Register Now — ₹{TICKET_PRICE}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <MessageCircle className="w-3.5 h-3.5" /> QR via WhatsApp
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <Mail className="w-3.5 h-3.5" /> QR via Email
            </span>
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
            Powered by Ticket9 — QR codes sent instantly via WhatsApp & Email
          </p>
        </motion.div>
      </div>
    </section>
  )
}
