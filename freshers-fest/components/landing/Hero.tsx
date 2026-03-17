'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountdown } from '@/hooks/useCountdown'
import { EVENT_DATE } from '@/lib/constants'
import Button from '@/components/ui/Button'

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl bg-bg-secondary border border-border-default flex items-center justify-center glow-orange-subtle">
        <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text-primary">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-text-muted mt-2 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

function AnimatedCounter({ target, label }: { target: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold gradient-text-orange">
        {target}
      </div>
      <div className="text-xs sm:text-sm text-text-muted mt-1">{label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const countdown = useCountdown(EVENT_DATE)

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; shape: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.15 + 0.05,
        shape: Math.floor(Math.random() * 3), // 0=circle, 1=triangle, 2=hex
      })
    }

    const drawShape = (p: typeof particles[0]) => {
      ctx.save()
      ctx.globalAlpha = p.opacity
      ctx.strokeStyle = p.shape < 2 ? '#FF4D00' : '#00E5FF'
      ctx.lineWidth = 0.5
      ctx.translate(p.x, p.y)

      if (p.shape === 0) {
        ctx.beginPath()
        ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2)
        ctx.stroke()
      } else if (p.shape === 1) {
        const s = p.size * 3
        ctx.beginPath()
        ctx.moveTo(0, -s)
        ctx.lineTo(s * 0.866, s * 0.5)
        ctx.lineTo(-s * 0.866, s * 0.5)
        ctx.closePath()
        ctx.stroke()
      } else {
        const s = p.size * 2.5
        ctx.beginPath()
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j - Math.PI / 2
          const x = Math.cos(angle) * s
          const y = Math.sin(angle) * s
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
      }
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        drawShape(p)
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Dot Grid Overlay */}
      <div className="absolute inset-0 dot-grid z-[1]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary z-[2]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
            Precious First — GDG Team @ SVCE Tirupati
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold gradient-text glitch-text mb-6 leading-tight"
        >
          FRESHERS FEST
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">2026</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-2 font-heading"
        >
          Where SVCE Proves It Is Technical. Cultural. Total.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-text-muted mb-8"
        >
          April 10–11, 2026 | SVCE Campus, Tirupati
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 mb-10"
        >
          <CountdownBox value={countdown.days} label="Days" />
          <span className="text-2xl text-text-muted font-bold mt-[-20px]">:</span>
          <CountdownBox value={countdown.hours} label="Hours" />
          <span className="text-2xl text-text-muted font-bold mt-[-20px]">:</span>
          <CountdownBox value={countdown.minutes} label="Minutes" />
          <span className="text-2xl text-text-muted font-bold mt-[-20px]">:</span>
          <CountdownBox value={countdown.seconds} label="Seconds" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button size="lg" glow onClick={() => scrollTo('register')}>
            Register Now — External ₹199
          </Button>
          <Button size="lg" variant="cyan" onClick={() => scrollTo('register')}>
            SVCE Students — Register Free
          </Button>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl mx-auto"
        >
          <AnimatedCounter target="2000+" label="SVCE Students" />
          <AnimatedCounter target="500-700" label="External Target" />
          <AnimatedCounter target="24 HRS" label="Hackathon" />
          <AnimatedCounter target="9" label="Departments" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-text-muted flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
        </motion.div>
      </motion.div>
    </section>
  )
}
