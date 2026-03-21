'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EVENT_HIGHLIGHTS } from '@/lib/constants'
import { ArrowRight, Scissors } from 'lucide-react'
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

        {/* ─── Event Ticket (Cinema-style with scalloped edges) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <TiltCard className="w-full">
            {/* Outer wrapper — scalloped edges via SVG masks */}
            <div className="relative">
              {/* ── Left scalloped edge (punched holes) ── */}
              <div className="absolute left-0 top-0 bottom-0 w-3 z-30 hidden md:block">
                <svg width="12" height="100%" viewBox="0 0 12 100%" preserveAspectRatio="none" className="h-full">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <circle
                      key={`l-${i}`}
                      cx="0"
                      cy={`${((i + 0.5) / 18) * 100}%`}
                      r="5"
                      fill={isDark ? '#0A0A0B' : '#FFFBF5'}
                    />
                  ))}
                </svg>
              </div>

              {/* ── Right scalloped edge (punched holes) ── */}
              <div className="absolute right-0 top-0 bottom-0 w-3 z-30 hidden md:block">
                <svg width="12" height="100%" viewBox="0 0 12 100%" preserveAspectRatio="none" className="h-full">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <circle
                      key={`r-${i}`}
                      cx="12"
                      cy={`${((i + 0.5) / 18) * 100}%`}
                      r="5"
                      fill={isDark ? '#0A0A0B' : '#FFFBF5'}
                    />
                  ))}
                </svg>
              </div>

              {/* ── Top scalloped edge (mobile) ── */}
              <div className="absolute top-0 left-0 right-0 h-3 z-30 md:hidden">
                <svg width="100%" height="12" preserveAspectRatio="none">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <circle
                      key={`t-${i}`}
                      cx={`${((i + 0.5) / 30) * 100}%`}
                      cy="0"
                      r="5"
                      fill={isDark ? '#0A0A0B' : '#FFFBF5'}
                    />
                  ))}
                </svg>
              </div>

              {/* ── Bottom scalloped edge (mobile) ── */}
              <div className="absolute bottom-0 left-0 right-0 h-3 z-30 md:hidden">
                <svg width="100%" height="12" preserveAspectRatio="none">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <circle
                      key={`b-${i}`}
                      cx={`${((i + 0.5) / 30) * 100}%`}
                      cy="12"
                      r="5"
                      fill={isDark ? '#0A0A0B' : '#FFFBF5'}
                    />
                  ))}
                </svg>
              </div>

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.08)',
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* ═══════════ LEFT: Main Ticket Body ═══════════ */}
                  <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: '#0f0f12' }}>
                    {/* Purple/amber gradient glow background */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(139,92,246,0.15)' }} />
                      <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full blur-[80px]" style={{ backgroundColor: 'rgba(245,158,11,0.08)' }} />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(139,92,246,0.06)' }} />
                    </div>

                    {/* Vertical side text */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-8 hidden md:flex items-center justify-center"
                      style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span
                        className="text-[9px] font-bold tracking-[0.3em] uppercase whitespace-nowrap"
                        style={{
                          color: 'rgba(255,255,255,0.15)',
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        FRESHERS FEST &bull; APRIL 2026 &bull; TIRUPATI
                      </span>
                    </div>

                    {/* Main content */}
                    <div className="relative z-10 p-6 md:pl-12 md:pr-8 md:py-8">
                      {/* Top bar */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            GDG &amp; SAC &bull; SVCE TIRUPATI
                          </p>
                          <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            Sri Venkateswara College of Engineering, Tirupati, AP
                          </p>
                        </div>
                        <div
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold tracking-[0.15em] uppercase"
                          style={{
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'rgba(255,255,255,0.7)',
                          }}
                        >
                          <span style={{ color: '#F59E0B' }}>&#9654;</span>
                          ALL EVENT PASS
                        </div>
                      </div>

                      {/* Event name */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          SVCE &bull; FRESHERS FEST
                        </p>
                        <h3 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95]" style={{ color: '#F59E0B' }}>
                          Freshers
                        </h3>
                        <h3 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95]" style={{ color: '#ffffff' }}>
                          Fest
                        </h3>
                      </div>

                      {/* Large faded year behind */}
                      <div
                        className="absolute right-8 top-1/2 -translate-y-1/2 font-heading font-bold text-[120px] md:text-[160px] leading-none select-none pointer-events-none hidden md:block"
                        style={{ color: 'rgba(255,255,255,0.04)' }}
                      >
                        2026
                      </div>

                      {/* Bottom details row */}
                      <div className="flex flex-wrap items-end gap-6 mt-2">
                        <div>
                          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Date</p>
                          <p className="text-sm font-heading font-bold" style={{ color: '#ffffff' }}>Apr 10 &amp; 11, 2026</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Venue</p>
                          <p className="text-sm font-heading font-bold" style={{ color: '#ffffff' }}>SVCE Campus, Tirupati</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Includes</p>
                          <p className="text-sm font-heading font-bold" style={{ color: '#ffffff' }}>Everything</p>
                        </div>
                      </div>
                    </div>

                    {/* Faded bottom year text */}
                    <div
                      className="absolute bottom-2 left-12 font-heading font-bold text-5xl select-none pointer-events-none hidden md:block"
                      style={{ color: 'rgba(255,255,255,0.03)' }}
                    >
                      2026
                    </div>
                  </div>

                  {/* ═══════════ Perforation tear-line ═══════════ */}
                  <div className="relative hidden md:flex items-center justify-center" style={{ width: '2px' }}>
                    {/* Large semicircle notch — top */}
                    <div
                      className="absolute -top-4 w-8 h-8 rounded-full z-30"
                      style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
                    />
                    {/* Large semicircle notch — bottom */}
                    <div
                      className="absolute -bottom-4 w-8 h-8 rounded-full z-30"
                      style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
                    />
                    {/* Dotted perforation line */}
                    <div className="absolute top-6 bottom-6 flex flex-col items-center justify-between">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-[3px] h-[3px] rounded-full"
                          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                        />
                      ))}
                    </div>
                    {/* Scissors icon positioned on the line */}
                    <div className="absolute top-8 z-40 bg-[#0f0f12] px-0.5 py-1 rounded-sm">
                      <Scissors className="w-3.5 h-3.5 rotate-90" style={{ color: 'rgba(255,255,255,0.35)' }} />
                    </div>
                  </div>

                  {/* Mobile horizontal perforation */}
                  <div className="relative md:hidden flex items-center justify-center py-0" style={{ backgroundColor: '#0f0f12' }}>
                    {/* Left notch */}
                    <div
                      className="absolute -left-4 w-8 h-8 rounded-full z-30"
                      style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
                    />
                    {/* Right notch */}
                    <div
                      className="absolute -right-4 w-8 h-8 rounded-full z-30"
                      style={{ backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5' }}
                    />
                    {/* Dotted line */}
                    <div className="flex items-center justify-between w-full px-8">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-[3px] h-[3px] rounded-full"
                          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                        />
                      ))}
                    </div>
                    {/* Scissors */}
                    <div className="absolute left-10 z-40 bg-[#0f0f12] px-1 py-0.5 rounded-sm">
                      <Scissors className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.35)' }} />
                    </div>
                  </div>

                  {/* ═══════════ RIGHT: Tear-off Stub ═══════════ */}
                  <div
                    className="w-full md:w-56 relative overflow-hidden flex flex-col items-center justify-center text-center p-6 md:p-6"
                    style={{ backgroundColor: '#0f0f12' }}
                  >
                    {/* Subtle glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] pointer-events-none" style={{ backgroundColor: 'rgba(139,92,246,0.08)' }} />

                    {/* ALL EVENT PASS badge */}
                    <div
                      className="px-3 py-1 rounded text-[9px] font-bold tracking-[0.2em] uppercase mb-4 relative z-10"
                      style={{ backgroundColor: '#F59E0B', color: '#0f0f12' }}
                    >
                      ALL EVENT PASS
                    </div>

                    {/* Event name */}
                    <p className="font-heading font-bold text-sm mb-0.5 relative z-10" style={{ color: '#ffffff' }}>SVCE</p>
                    <p className="font-heading font-bold text-sm mb-0.5 relative z-10" style={{ color: '#ffffff' }}>Freshers Fest</p>
                    <p className="font-heading font-bold text-3xl mb-4 relative z-10" style={{ color: '#F59E0B' }}>2026</p>

                    {/* QR code placeholder */}
                    <div
                      className="w-24 h-24 rounded-lg mb-2 flex items-center justify-center relative z-10"
                      style={{
                        backgroundColor: '#ffffff',
                        padding: '6px',
                      }}
                    >
                      <div className="w-full h-full grid grid-cols-7 gap-[1px]">
                        {Array.from({ length: 49 }).map((_, i) => {
                          const pattern = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,8,9,10,11,12,15,16,19,22,23,26,29,30,33]
                          return (
                            <div
                              key={i}
                              className="rounded-[0.5px]"
                              style={{
                                backgroundColor: pattern.includes(i) ? '#0f0f12' : '#e5e5e5',
                              }}
                            />
                          )
                        })}
                      </div>
                    </div>
                    <p className="text-[8px] font-semibold tracking-[0.2em] uppercase mb-5 relative z-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      SCAN TO VERIFY
                    </p>

                    {/* Separator line */}
                    <div className="w-full h-px mb-4 relative z-10" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

                    {/* Bottom info grid */}
                    <div className="w-full grid grid-cols-2 gap-3 text-left mb-3 relative z-10">
                      <div>
                        <p className="text-[8px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Date</p>
                        <p className="text-xs font-heading font-bold" style={{ color: '#ffffff' }}>Apr 10 &amp; 11</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Entry</p>
                        <p className="text-xs font-heading font-bold" style={{ color: '#F59E0B' }}>&#8377;200</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Hackathon</p>
                        <p className="text-xs font-heading font-bold" style={{ color: '#F59E0B' }}>+&#8377;100</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Platform</p>
                        <p className="text-xs font-heading font-bold" style={{ color: '#ffffff' }}>Ticket9</p>
                      </div>
                    </div>

                    {/* Register CTA */}
                    <button
                      onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-heading font-semibold hover:opacity-90 transition-all cursor-pointer group w-full justify-center mt-1 relative z-10"
                      style={{ backgroundColor: '#F59E0B', color: '#0f0f12' }}
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
