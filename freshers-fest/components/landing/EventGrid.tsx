'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import {
  Code2, GraduationCap, Cpu, Rocket, Users, Zap, Gamepad2, Music,
} from 'lucide-react'
import { EVENTS } from '@/lib/constants'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'
import { useTheme } from '@/hooks/useTheme'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, GraduationCap, Cpu, Rocket, Users, Zap, Gamepad2, Music,
}

// Gradient backgrounds for each card (light, warm tones matching reference)
const cardGradients = [
  { light: 'linear-gradient(160deg, #FFF5EB 0%, #FFE8D6 40%, #FFDBC4 100%)', dark: 'linear-gradient(160deg, #1a1412 0%, #1f1714 40%, #231a15 100%)' },
  { light: 'linear-gradient(160deg, #F0F4FF 0%, #E4ECFF 40%, #D8E2FF 100%)', dark: 'linear-gradient(160deg, #12141a 0%, #141720 40%, #161a25 100%)' },
  { light: 'linear-gradient(160deg, #FFF0F5 0%, #FFE4EE 40%, #FFD6E5 100%)', dark: 'linear-gradient(160deg, #1a1215 0%, #1f1418 40%, #23161b 100%)' },
  { light: 'linear-gradient(160deg, #F0FFF4 0%, #E4FFE8 40%, #D6FFDC 100%)', dark: 'linear-gradient(160deg, #121a14 0%, #142017 40%, #16251a 100%)' },
  { light: 'linear-gradient(160deg, #FFF8E1 0%, #FFF0C2 40%, #FFE8A3 100%)', dark: 'linear-gradient(160deg, #1a1812 0%, #201e14 40%, #252216 100%)' },
  { light: 'linear-gradient(160deg, #F3E5F5 0%, #E8D5EC 40%, #DCC5E2 100%)', dark: 'linear-gradient(160deg, #18121a 0%, #1c1420 40%, #201625 100%)' },
  { light: 'linear-gradient(160deg, #E0F7FA 0%, #D0F0F5 40%, #C0E8EF 100%)', dark: 'linear-gradient(160deg, #121819 0%, #141e1f 40%, #162325 100%)' },
]

export default function EventGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  // Duplicate events for seamless loop
  const duplicatedEvents = [...EVENTS, ...EVENTS]

  return (
    <section
      id="events"
      className="relative overflow-hidden"
      style={{
        backgroundColor: isDark ? '#0A0A0B' : 'var(--bg-primary)',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      }}
      ref={ref}
    >
      {/* Subtle top/bottom gradient overlays for depth */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, rgba(10,10,11,0.8), transparent)'
            : 'linear-gradient(to bottom, rgba(255,251,245,0.8), transparent)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgba(10,10,11,0.8), transparent)'
            : 'linear-gradient(to top, rgba(255,251,245,0.8), transparent)',
        }}
      />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <SectionHeading
            title="Two Days. One Mission. Unlimited Energy."
            subtitle="From code marathons to college band nights — here's everything that's going down."
          />
        </motion.div>

        {/* Marquee container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left fade mask */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(to right, #0A0A0B, transparent)'
                : 'linear-gradient(to right, var(--bg-primary), transparent)',
            }}
          />
          {/* Right fade mask */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(to left, #0A0A0B, transparent)'
                : 'linear-gradient(to left, var(--bg-primary), transparent)',
            }}
          />

          {/* Scrolling track */}
          <div
            className="flex gap-5 md:gap-6"
            style={{
              animation: `marquee-scroll 35s linear infinite`,
              animationPlayState: isHovered ? 'paused' : 'running',
              width: 'max-content',
            }}
          >
            {duplicatedEvents.map((event, i) => {
              const Icon = iconMap[event.icon]
              const gradientIdx = i % cardGradients.length
              const gradient = isDark
                ? cardGradients[gradientIdx].dark
                : cardGradients[gradientIdx].light

              return (
                <div
                  key={`${event.title}-${i}`}
                  className="group relative flex-shrink-0 w-[280px] md:w-[320px] rounded-2xl overflow-hidden cursor-default transition-transform duration-300 hover:scale-[1.03]"
                  style={{
                    background: gradient,
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  }}
                >
                  {/* Card content */}
                  <div className="relative p-6 md:p-7 flex flex-col h-full min-h-[260px]">
                    {/* Icon area */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                      }}
                    >
                      {Icon && (
                        <div style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)' }}>
                          <Icon className="w-8 h-8 transition-colors duration-300" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-heading font-bold text-lg md:text-xl mb-2 tracking-tight"
                      style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-4 flex-1"
                      style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                    >
                      {event.description}
                    </p>

                    {/* Day badge */}
                    <div>
                      <Badge
                        variant={
                          event.day.includes('1') && event.day.includes('2')
                            ? 'cyan'
                            : event.day.includes('1')
                            ? 'orange'
                            : 'default'
                        }
                      >
                        {event.day}
                      </Badge>
                    </div>
                  </div>

                  {/* Subtle hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      boxShadow: isDark
                        ? 'inset 0 0 40px rgba(255,255,255,0.03)'
                        : 'inset 0 0 40px rgba(0,0,0,0.02)',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Marquee keyframe */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
