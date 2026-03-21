'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { TestimonialsRow } from '@/components/ui/TestimonialsRow'
import type { Testimonial } from '@/components/ui/TestimonialsRow'
import SectionHeading from '@/components/ui/SectionHeading'

const testimonials: Testimonial[] = [
  {
    text: "SVCE gave me the foundation to build real products. The hackathons here pushed me beyond textbooks into solving actual problems with code.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    name: "Rahul Venkat",
    role: "CSE '24 — SDE @ Google",
  },
  {
    text: "The GDG community at SVCE is what made me fall in love with tech. From workshops to late-night coding sessions, this campus breeds builders.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    name: "Priya Sharma",
    role: "ECE '23 — ML Engineer @ Microsoft",
  },
  {
    text: "Freshers Fest was my first taste of SVCE's energy. The hackathon that year changed my entire career trajectory. I started building startups right after.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "Aravind Krishna",
    role: "IT '22 — Founder, TechStack Labs",
  },
  {
    text: "SVCE's technical culture is unmatched in Tirupati. The project exhibitions and startup showcases taught me more than any classroom ever could.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    name: "Keerthi Reddy",
    role: "CSE '24 — Product Manager @ Flipkart",
  },
  {
    text: "From zero coding experience to winning the inter-college hackathon — SVCE's ecosystem of mentors and peer developers made that possible.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: "Suresh Babu",
    role: "AIML '25 — Research Intern @ IISc",
  },
  {
    text: "The workshops at Freshers Fest introduced me to cybersecurity. Now I lead the college CTF team and we've won 3 state-level competitions.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    name: "Divya Lakshmi",
    role: "CSE '25 — Cybersecurity Club Lead",
  },
  {
    text: "SVCE doesn't just teach engineering — it builds entrepreneurs. The startup showcase here got me my first investor meeting while still in 3rd year.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Karthik Nair",
    role: "EEE '23 — Co-founder, GreenWatt Energy",
  },
  {
    text: "The alumni network from SVCE is incredible. Every Freshers Fest, seniors come back and share real career insights. That mentorship is priceless.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    name: "Meera Iyer",
    role: "MECH '24 — Design Engineer @ Tesla",
  },
  {
    text: "I joined SVCE as a non-coder. The GDG team, the hackathons, the peer culture — everything here turned me into a full-stack developer in one year.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
    name: "Vikram Reddy",
    role: "IT '25 — Full Stack Developer",
  },
]

const firstRow = testimonials.slice(0, 5)
const secondRow = testimonials.slice(4, 9)

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }} ref={ref}>
      {/* Gradient accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-accent-orange/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="What SVCEians Say"
          subtitle="Alumni and students on SVCE's technical culture and what makes this campus different."
          gradient
        />

        {/* Row-wise scrolling testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          <TestimonialsRow testimonials={firstRow} duration={25} />
          <TestimonialsRow testimonials={secondRow} duration={30} reverse />
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          Real words from SVCE students & alumni. Technical. Cultural. Total.
        </motion.p>
      </div>
    </section>
  )
}
