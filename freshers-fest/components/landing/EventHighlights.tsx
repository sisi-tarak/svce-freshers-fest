'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EVENT_HIGHLIGHTS } from '@/lib/constants'
import { ArrowRight, MapPin, Calendar, Clock, Users, Scissors } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { useTheme } from '@/hooks/useTheme'

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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

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

function CountUpNumber({ target, suffix, isDark }: { target: string; suffix: string; isDark: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''))

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
    <span ref={ref} className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl" style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}>
      {typeof displayValue === 'number' ? displayValue : target}
      <span className="text-xl sm:text-2xl lg:text-3xl font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>{suffix}</span>
    </span>
  )
}

/* ─── Perforated circle for ticket edges ─── */
function TicketPerforations({ side, isDark }: { side: 'left' | 'right'; isDark: boolean }) {
  const dots = Array.from({ length: 12 })
  return (
    <div
      className={`absolute top-0 bottom-0 flex flex-col justify-between py-2 z-20 ${side === 'left' ? '-left-[6px]' : '-right-[6px]'}`}
    >
      {dots.map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
        />
      ))}
    </div>
  )
}

export default function EventHighlights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section id="highlights" className="relative overflow-hidden" style={{ backgroundColor: isDark ? '#0A0A0B' : 'var(--bg-primary)', paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)', paddingLeft: '1.5rem', paddingRight: '1.5rem' }} ref={ref}>
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.5 }} />
      <div className="absolute bottom-20 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.3 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="The Numbers Speak"
          subtitle="One ticket. Two days. Everything included."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
          {EVENT_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full">
                <div
                  className="h-full rounded-2xl p-6 md:p-8 border cursor-default group transition-all duration-300 card-hover-orange"
                  style={{
                    backgroundColor: isDark ? 'rgba(17,17,19,0.6)' : 'rgba(255,255,255,0.8)',
                    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="mb-2">
                    <CountUpNumber target={item.number} suffix={item.suffix} isDark={isDark} />
                  </div>
                  <p className="text-sm md:text-base font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                    {item.label}
                  </p>
                  {/* Shimmer line */}
                  <div className="mt-4 h-0.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full gradient-cta"
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

        {/* ─── Event Ticket ─── */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          <TiltCard className="w-full">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: isDark ? '#111113' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: isDark
                  ? '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
                  : '0 25px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)',
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* ─── Left: Main ticket body ─── */}
                <div className="flex-1 p-6 md:p-8 relative">
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 gradient-cta" />

                  {/* Event branding */}
                  <div className="flex items-start justify-between mb-6 pt-2">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: '#FF4D00' }}>
                        SVCE Freshers Fest 2026
                      </p>
                      <h3 className="font-heading font-bold text-2xl md:text-3xl" style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}>
                        PRECIOUS FIRST
                      </h3>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,77,0,0.15)' : 'rgba(255,77,0,0.1)',
                        color: '#FF4D00',
                      }}
                    >
                      ALL ACCESS
                    </div>
                  </div>

                  {/* Ticket details grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}>
                        <Calendar className="w-4 h-4" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>Date</p>
                        <p className="text-sm font-semibold" style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}>April 10–11, 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}>
                        <Clock className="w-4 h-4" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>Time</p>
                        <p className="text-sm font-semibold" style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}>9:00 AM onwards</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}>
                        <MapPin className="w-4 h-4" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>Venue</p>
                        <p className="text-sm font-semibold" style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}>SVCE, Tirupati</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}>
                        <Users className="w-4 h-4" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>Capacity</p>
                        <p className="text-sm font-semibold" style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}>1,000+ Attendees</p>
                      </div>
                    </div>
                  </div>

                  {/* What's included */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>
                      Includes
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)' }}>
                      Workshops + Project Exhibition + Startup Showcase + Musical Evening + All Meals + Fun Stalls
                    </p>
                  </div>
                </div>

                {/* ─── Perforation divider ─── */}
                <div className="relative hidden md:flex items-center justify-center" style={{ width: '1px' }}>
                  {/* Top notch */}
                  <div
                    className="absolute -top-3 w-6 h-6 rounded-full z-30"
                    style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
                  />
                  {/* Bottom notch */}
                  <div
                    className="absolute -bottom-3 w-6 h-6 rounded-full z-30"
                    style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
                  />
                  {/* Dashed line */}
                  <div
                    className="absolute top-4 bottom-4 w-px"
                    style={{
                      backgroundImage: `repeating-linear-gradient(to bottom, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'} 0px, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'} 6px, transparent 6px, transparent 12px)`,
                    }}
                  />
                  {/* Scissors icon */}
                  <div className="absolute top-6 z-30" style={{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
                    <Scissors className="w-3 h-3 rotate-90" />
                  </div>
                </div>

                {/* Mobile horizontal divider */}
                <div className="relative md:hidden flex items-center justify-center" style={{ height: '1px' }}>
                  <div
                    className="absolute -left-3 w-6 h-6 rounded-full z-30"
                    style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
                  />
                  <div
                    className="absolute -right-3 w-6 h-6 rounded-full z-30"
                    style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
                  />
                  <div
                    className="absolute left-4 right-4 h-px"
                    style={{
                      backgroundImage: `repeating-linear-gradient(to right, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'} 0px, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'} 6px, transparent 6px, transparent 12px)`,
                    }}
                  />
                </div>

                {/* ─── Right: Price stub ─── */}
                <div className="w-full md:w-56 p-6 md:p-8 flex flex-col items-center justify-center text-center relative">
                  {/* Top accent bar (mobile) */}
                  <div className="absolute top-0 left-0 right-0 h-1 gradient-cta md:hidden" />

                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>
                    Entry Price
                  </p>

                  <div className="mb-1">
                    <span className="font-heading font-bold text-5xl md:text-6xl gradient-text">
                      &#8377;200
                    </span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                    per person
                  </p>
                  <p className="text-[10px] mb-5" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
                    Hackathon: +&#8377;100 add-on
                  </p>

                  {/* QR placeholder */}
                  <div
                    className="w-20 h-20 rounded-lg mb-4 flex items-center justify-center"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      border: `1px dashed ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    }}
                  >
                    <div className="grid grid-cols-4 gap-[2px]">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-[1px]"
                          style={{
                            backgroundColor: [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 15].includes(i)
                              ? (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)')
                              : 'transparent',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full gradient-cta text-white font-heading font-semibold text-sm hover:opacity-90 transition-all cursor-pointer group w-full justify-center"
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <p className="text-[10px] mt-3" style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)' }}>
                    Powered by Ticket9
                  </p>
                </div>
              </div>

              {/* Bottom info strip */}
              <div
                className="px-6 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                }}
              >
                <p className="text-[10px] tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
                  Register &#8594; Pay via Ticket9 &#8594; QR code via WhatsApp &amp; Email &#8594; Show at gate
                </p>
                <p className="text-[10px] font-mono tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
                  SVCE-FF-2026-XXXX
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
