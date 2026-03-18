'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EVENT_HIGHLIGHTS } from '@/lib/constants'
import { Ticket, Calendar, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      x.set(px)
      y.set(py)
    },
    [x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CountUpNumber({ target, suffix }: { target: string; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''))

  // Simple count-up
  useEffect(() => {
    if (isNaN(numericTarget) || !isInView) return
    const duration = 1500
    const steps = 30
    const increment = numericTarget / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, numericTarget])

  const displayValue = isNaN(numericTarget) ? target : isInView ? count : 0

  return (
    <span ref={ref} className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl">
      {typeof displayValue === 'number' ? displayValue : target}
      <span className="text-2xl sm:text-3xl lg:text-4xl">{suffix}</span>
    </span>
  )
}

export default function EventHighlights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="highlights" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }} ref={ref}>
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-accent-orange/5 blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-accent-cyan/5 blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="The Numbers Speak"
          subtitle="One ticket. Two days. Everything included."
          gradient
        />

        {/* Interactive Number Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {EVENT_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full perspective-[1000px]">
                <div
                  className={`h-full rounded-2xl p-6 md:p-8 border cursor-default group transition-all duration-300 ${
                    item.color === 'cyan' ? 'card-hover-cyan' : 'card-hover-orange'
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-default)',
                  }}
                >
                  <div className={`mb-2 ${item.color === 'cyan' ? 'text-accent-cyan' : 'text-accent-orange'}`}>
                    <CountUpNumber target={item.number} suffix={item.suffix} />
                  </div>
                  <p className="text-sm md:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </p>
                  {/* Shimmer line */}
                  <div className="mt-4 h-0.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <motion.div
                      className={`h-full rounded-full ${item.color === 'cyan' ? 'bg-accent-cyan' : 'gradient-cta'}`}
                      initial={{ width: '0%' }}
                      animate={isInView ? { width: '100%' } : {}}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Ticket CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 gradient-hero opacity-20 animate-shimmer" />

          <div
            className="relative rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-default)',
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-cta flex items-center justify-center shrink-0 animate-float">
                <Ticket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                  One Ticket — ₹200 | Register via Ticket9
                </h3>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Workshops + Exhibitions + Musical Evening + All Meals. Hackathon: +₹100 add-on.
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Register → Pay via Ticket9 → QR code via WhatsApp &amp; Email → Show at gate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <Calendar className="w-4 h-4 text-accent-orange" />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  April 10–11, 2026
                </span>
              </div>
              <button
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full gradient-cta text-white font-heading font-semibold text-sm hover:opacity-90 transition-all cursor-pointer group"
              >
                Register via Ticket9
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
