'use client'

import { TimelineContent } from '@/components/ui/timeline-animation'
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal'
import {
  ArrowRight,
  MapPin,
  Users,
  Code2,
  Trophy,
  GraduationCap,
  Globe,
  BookOpen,
  Heart,
  Mail,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react'
import { useRef } from 'react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { useTheme } from '@/hooks/useTheme'

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const gdgRef = useRef<HTMLDivElement>(null)
  const sacRef = useRef<HTMLDivElement>(null)
  const svceRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: -20,
      opacity: 0,
    },
  }

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      scale: 0.95,
    },
  }

  const slideUpVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
    hidden: {
      filter: 'blur(8px)',
      y: 30,
      opacity: 0,
    },
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ═══════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
          style={{
            backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5',
            paddingTop: 'clamp(3rem, 8vw, 6rem)',
            paddingBottom: 'clamp(2rem, 4vw, 3rem)',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          {/* Decorative gradient blobs */}
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
            style={{ backgroundColor: isDark ? 'rgba(139,92,246,0.08)' : 'rgba(255,77,0,0.04)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
            style={{ backgroundColor: isDark ? 'rgba(245,158,11,0.06)' : 'rgba(245,158,11,0.04)' }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Top bar: label + social links */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-xl" style={{ color: '#FF4D00' }}>&#10038;</span>
                <TimelineContent
                  as="span"
                  animationNum={0}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-sm font-semibold tracking-[0.15em] uppercase"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                >
                  WHO WE ARE
                </TimelineContent>
              </div>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/gdg_svce/', label: 'Instagram' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/company/gdg-on-campus-svce/', label: 'LinkedIn' },
                  { icon: Youtube, href: 'https://www.youtube.com/@gdgsvce', label: 'YouTube' },
                ].map((social, i) => (
                  <TimelineContent
                    key={social.label}
                    as="a"
                    animationNum={i + 1}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                      color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                    }}
                  >
                    <social.icon className="w-4 h-4" />
                  </TimelineContent>
                ))}
              </div>
            </div>

            {/* Hero image with SVG clip path */}
            <TimelineContent
              as="figure"
              animationNum={4}
              timelineRef={heroRef}
              customVariants={scaleVariants}
              className="relative mb-6 rounded-2xl overflow-hidden"
            >
              <div
                className="w-full aspect-[2.5/1] rounded-2xl overflow-hidden relative"
                style={{
                  backgroundColor: isDark ? '#111113' : '#f0ebe4',
                }}
              >
                {/* Gradient overlay simulating campus image */}
                <div className="absolute inset-0" style={{
                  background: isDark
                    ? 'linear-gradient(135deg, #0f0f12 0%, rgba(139,92,246,0.15) 30%, rgba(245,158,11,0.1) 60%, #0f0f12 100%)'
                    : 'linear-gradient(135deg, #FFFBF5 0%, rgba(255,107,43,0.08) 30%, rgba(245,158,11,0.06) 60%, #FFFBF5 100%)',
                }} />
                {/* Large watermark text */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                  <span
                    className="font-heading font-bold text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] leading-none tracking-tight"
                    style={{ color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
                  >
                    SVCE
                  </span>
                </div>
                {/* Centered branding */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p
                    className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-2"
                    style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)' }}
                  >
                    GDG On Campus &bull; SAC &bull; SVCE Tirupati
                  </p>
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text text-center">
                    Freshers Fest 2026
                  </h2>
                  <p
                    className="text-xs sm:text-sm mt-2"
                    style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)' }}
                  >
                    April 10–11, 2026 &bull; SVCE Campus, Tirupati
                  </p>
                </div>
              </div>
            </TimelineContent>

            {/* Stats row */}
            <div className="flex flex-wrap justify-between items-center py-3">
              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex gap-4 flex-wrap"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold" style={{ color: '#FF4D00' }}>150+</span>
                  <span style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Organizers</span>
                  <span style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}>|</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold" style={{ color: '#FF4D00' }}>9</span>
                  <span style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Departments</span>
                  <span style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}>|</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold" style={{ color: '#FF4D00' }}>2</span>
                  <span style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Days of Energy</span>
                </div>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl mt-2 lg:mt-0"
              >
                <span className="font-heading font-bold" style={{ color: '#FF4D00' }}>1,000+</span>
                <span className="font-heading uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}>Attendees</span>
              </TimelineContent>
            </div>

            {/* Main heading + description */}
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl !leading-[110%] font-heading font-bold mb-8"
                  style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}
                >
                  <VerticalCutReveal
                    splitBy="words"
                    staggerDuration={0.1}
                    staggerFrom="first"
                    reverse={true}
                    transition={{
                      type: 'spring',
                      stiffness: 250,
                      damping: 30,
                      delay: 2,
                    }}
                  >
                    The Community Behind the Fest.
                  </VerticalCutReveal>
                </h1>
                <TimelineContent
                  as="div"
                  animationNum={8}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <TimelineContent
                    as="div"
                    animationNum={9}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    className="text-sm sm:text-base"
                  >
                    <p className="leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}>
                      SVCE Freshers Fest 2026 is organized by GDG On Campus SVCE in
                      collaboration with the Student Affairs Committee. Together, we bring
                      technology, culture, and community under one roof.
                    </p>
                  </TimelineContent>
                  <TimelineContent
                    as="div"
                    animationNum={10}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    className="text-sm sm:text-base"
                  >
                    <p className="leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}>
                      From a 24-hour hackathon to workshops, exhibitions, success stories,
                      and a musical evening — every moment is designed to inspire, connect,
                      and celebrate the next generation of engineers.
                    </p>
                  </TimelineContent>
                </TimelineContent>
              </div>
              <div className="md:col-span-1">
                <div className="text-right">
                  <TimelineContent
                    as="div"
                    animationNum={11}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    className="text-2xl font-heading font-bold mb-2 gradient-text inline-block"
                  >
                    PRECIOUS FIRST
                  </TimelineContent>
                  <TimelineContent
                    as="div"
                    animationNum={12}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    className="text-sm mb-8"
                    style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}
                  >
                    Powered by GDG On Campus SVCE
                  </TimelineContent>
                  <TimelineContent
                    as="div"
                    animationNum={13}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    className="mb-6"
                  >
                    <p className="font-medium mb-4 text-sm sm:text-base" style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}>
                      Ready to be part of the biggest freshers event in Tirupati?
                    </p>
                  </TimelineContent>
                  <TimelineContent
                    as="a"
                    animationNum={14}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    href="/"
                    className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 gradient-cta text-white px-5 py-3 rounded-lg cursor-pointer font-heading font-semibold text-sm"
                  >
                    EXPLORE THE FEST <ArrowRight className="w-4 h-4" />
                  </TimelineContent>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            GDG ON CAMPUS SVCE
        ═══════════════════════════════════════════════════ */}
        <section
          ref={gdgRef}
          className="relative overflow-hidden"
          style={{
            backgroundColor: isDark ? '#111113' : '#ffffff',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10 items-start">
              {/* Left: content */}
              <div className="md:col-span-3">
                <TimelineContent
                  as="div"
                  animationNum={0}
                  timelineRef={gdgRef}
                  customVariants={revealVariants}
                  className="flex items-center gap-2 mb-4"
                >
                  <div style={{ color: '#FF4D00' }}>
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span
                    className="text-xs font-semibold tracking-[0.2em] uppercase"
                    style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
                  >
                    Developer Community
                  </span>
                </TimelineContent>

                <TimelineContent
                  as="h2"
                  animationNum={1}
                  timelineRef={gdgRef}
                  customVariants={revealVariants}
                  className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text"
                >
                  GDG On Campus SVCE
                </TimelineContent>

                <TimelineContent
                  as="p"
                  animationNum={2}
                  timelineRef={gdgRef}
                  customVariants={revealVariants}
                  className="text-base md:text-lg leading-relaxed mb-8"
                  style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}
                >
                  Google Developer Groups On Campus at SVCE Tirupati is a student-led
                  community powered by Google. We bridge the gap between classroom
                  learning and real-world technology through hands-on workshops,
                  hackathons, and developer events. Our mission is to create a space
                  where curious minds experiment, build, and grow — together.
                </TimelineContent>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: Code2, text: 'Hands-on workshops in AI/ML, Web Dev & Cloud' },
                    { icon: Users, text: 'Community of 300+ active student developers' },
                    { icon: Trophy, text: 'Hackathons, coding contests & project showcases' },
                    { icon: Globe, text: 'Connected to the global GDG ecosystem' },
                  ].map((item, i) => (
                    <TimelineContent
                      key={i}
                      as="div"
                      animationNum={3 + i}
                      timelineRef={gdgRef}
                      customVariants={slideUpVariants}
                      className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)' }}
                      >
                        {item.text}
                      </span>
                    </TimelineContent>
                  ))}
                </div>
              </div>

              {/* Right: large stat */}
              <div className="md:col-span-2 flex flex-col items-end justify-between h-full">
                <TimelineContent
                  as="div"
                  animationNum={7}
                  timelineRef={gdgRef}
                  customVariants={scaleVariants}
                  className="text-right"
                >
                  <span
                    className="font-heading font-bold text-6xl sm:text-7xl lg:text-8xl block"
                    style={{ color: '#FF4D00' }}
                  >
                    300+
                  </span>
                  <span
                    className="font-heading text-xl uppercase tracking-wider"
                    style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)' }}
                  >
                    Student Developers
                  </span>
                </TimelineContent>
                <TimelineContent
                  as="div"
                  animationNum={8}
                  timelineRef={gdgRef}
                  customVariants={revealVariants}
                  className="text-right mt-8"
                >
                  <span
                    className="font-heading font-bold text-4xl block"
                    style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
                  >
                    10+
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}
                  >
                    Events per year
                  </span>
                </TimelineContent>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            STUDENT ACTIVITY CENTER (SAC)
        ═══════════════════════════════════════════════════ */}
        <section
          ref={sacRef}
          className="relative overflow-hidden"
          style={{
            backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10 items-start">
              {/* Left: large stat (reversed layout) */}
              <div className="md:col-span-2 flex flex-col items-start justify-between h-full order-2 md:order-1">
                <TimelineContent
                  as="div"
                  animationNum={0}
                  timelineRef={sacRef}
                  customVariants={scaleVariants}
                >
                  <span
                    className="font-heading font-bold text-6xl sm:text-7xl lg:text-8xl block"
                    style={{ color: '#F59E0B' }}
                  >
                    15+
                  </span>
                  <span
                    className="font-heading text-xl uppercase tracking-wider"
                    style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)' }}
                  >
                    Student Clubs
                  </span>
                </TimelineContent>
                <TimelineContent
                  as="div"
                  animationNum={1}
                  timelineRef={sacRef}
                  customVariants={revealVariants}
                  className="mt-8"
                >
                  <span
                    className="font-heading font-bold text-4xl block"
                    style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
                  >
                    50+
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}
                  >
                    Events coordinated annually
                  </span>
                </TimelineContent>
              </div>

              {/* Right: content */}
              <div className="md:col-span-3 order-1 md:order-2">
                <TimelineContent
                  as="div"
                  animationNum={2}
                  timelineRef={sacRef}
                  customVariants={revealVariants}
                  className="flex items-center gap-2 mb-4"
                >
                  <div style={{ color: '#F59E0B' }}>
                    <Users className="w-5 h-5" />
                  </div>
                  <span
                    className="text-xs font-semibold tracking-[0.2em] uppercase"
                    style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
                  >
                    Campus Life
                  </span>
                </TimelineContent>

                <TimelineContent
                  as="h2"
                  animationNum={3}
                  timelineRef={sacRef}
                  customVariants={revealVariants}
                  className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text"
                >
                  Student Affairs Committee
                </TimelineContent>

                <TimelineContent
                  as="p"
                  animationNum={4}
                  timelineRef={sacRef}
                  customVariants={revealVariants}
                  className="text-base md:text-lg leading-relaxed mb-8"
                  style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}
                >
                  The Student Affairs Committee at SVCE is the heartbeat of campus life
                  beyond academics. SAC coordinates all student-led events, cultural
                  fests, technical symposiums, and inter-college competitions. It serves
                  as the official body that empowers student clubs and communities —
                  including GDG On Campus — to organize large-scale events like Freshers Fest.
                </TimelineContent>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: Heart, text: 'Central hub for all campus events & fests' },
                    { icon: Users, text: 'Oversees 15+ student clubs & communities' },
                    { icon: Trophy, text: 'Organizes inter-college & national-level events' },
                    { icon: BookOpen, text: 'Fosters leadership, teamwork & creativity' },
                  ].map((item, i) => (
                    <TimelineContent
                      key={i}
                      as="div"
                      animationNum={5 + i}
                      timelineRef={sacRef}
                      customVariants={slideUpVariants}
                      className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)' }}
                      >
                        {item.text}
                      </span>
                    </TimelineContent>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SVCE TIRUPATI
        ═══════════════════════════════════════════════════ */}
        <section
          ref={svceRef}
          className="relative overflow-hidden"
          style={{
            backgroundColor: isDark ? '#111113' : '#ffffff',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10 items-start">
              {/* Left: content */}
              <div className="md:col-span-3">
                <TimelineContent
                  as="div"
                  animationNum={0}
                  timelineRef={svceRef}
                  customVariants={revealVariants}
                  className="flex items-center gap-2 mb-4"
                >
                  <div style={{ color: '#FF6B2B' }}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span
                    className="text-xs font-semibold tracking-[0.2em] uppercase"
                    style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
                  >
                    The Institution
                  </span>
                </TimelineContent>

                <TimelineContent
                  as="h2"
                  animationNum={1}
                  timelineRef={svceRef}
                  customVariants={revealVariants}
                  className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text"
                >
                  SVCE Tirupati
                </TimelineContent>

                <TimelineContent
                  as="p"
                  animationNum={2}
                  timelineRef={svceRef}
                  customVariants={revealVariants}
                  className="text-base md:text-lg leading-relaxed mb-8"
                  style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}
                >
                  Sri Venkateswara College of Engineering (SVCE), Tirupati is a premier
                  engineering institution committed to excellence in education, research,
                  and innovation. Located in the temple city of Tirupati, Andhra Pradesh,
                  SVCE nurtures future engineers and entrepreneurs with a strong
                  foundation in technical knowledge, industry exposure, and holistic development.
                </TimelineContent>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: GraduationCap, text: 'NAAC Accredited engineering institution' },
                    { icon: BookOpen, text: 'Multiple UG & PG programs across departments' },
                    { icon: MapPin, text: 'Located in the historic city of Tirupati, AP' },
                    { icon: Globe, text: 'Strong industry partnerships & placement record' },
                  ].map((item, i) => (
                    <TimelineContent
                      key={i}
                      as="div"
                      animationNum={3 + i}
                      timelineRef={svceRef}
                      customVariants={slideUpVariants}
                      className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)' }}
                      >
                        {item.text}
                      </span>
                    </TimelineContent>
                  ))}
                </div>
              </div>

              {/* Right: large stat */}
              <div className="md:col-span-2 flex flex-col items-end justify-between h-full">
                <TimelineContent
                  as="div"
                  animationNum={7}
                  timelineRef={svceRef}
                  customVariants={scaleVariants}
                  className="text-right"
                >
                  <span
                    className="font-heading font-bold text-6xl sm:text-7xl lg:text-8xl block"
                    style={{ color: '#FF6B2B' }}
                  >
                    9
                  </span>
                  <span
                    className="font-heading text-xl uppercase tracking-wider"
                    style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)' }}
                  >
                    Departments
                  </span>
                </TimelineContent>
                <TimelineContent
                  as="div"
                  animationNum={8}
                  timelineRef={svceRef}
                  customVariants={revealVariants}
                  className="text-right mt-8"
                >
                  <div className="flex items-center gap-2 justify-end">
                    <MapPin className="w-4 h-4" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }} />
                    <span
                      className="text-sm"
                      style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}
                    >
                      Tirupati, Andhra Pradesh
                    </span>
                  </div>
                </TimelineContent>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CONTACT SECTION
        ═══════════════════════════════════════════════════ */}
        <section
          ref={contactRef}
          className="relative overflow-hidden"
          style={{
            backgroundColor: isDark ? '#0A0A0B' : '#FFFBF5',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <TimelineContent
              as="div"
              animationNum={0}
              timelineRef={contactRef}
              customVariants={scaleVariants}
              className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
              style={{
                backgroundColor: isDark ? 'rgba(17,17,19,0.6)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 gradient-cta" />

              <TimelineContent
                as="h3"
                animationNum={1}
                timelineRef={contactRef}
                customVariants={revealVariants}
                className="font-heading font-bold text-2xl md:text-3xl mb-3 gradient-text"
              >
                Get In Touch
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={2}
                timelineRef={contactRef}
                customVariants={revealVariants}
                className="text-sm mb-6"
                style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}
              >
                Have questions about the fest or want to collaborate?
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={contactRef}
                customVariants={slideUpVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="mailto:gdsc@svce.edu.in"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-white font-heading font-semibold text-sm hover:opacity-90 transition-all hover:gap-3"
                >
                  <Mail className="w-4 h-4" />
                  gdsc@svce.edu.in
                </a>
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
                >
                  <MapPin className="w-4 h-4" />
                  SVCE, Tirupati, Andhra Pradesh
                </span>
              </TimelineContent>
            </TimelineContent>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
