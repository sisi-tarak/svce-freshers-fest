'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Users, BookOpen, Code2, Trophy, GraduationCap, Globe, Heart } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import { useTheme } from '@/hooks/useTheme'

function AboutCard({
  title,
  description,
  items,
  icon: Icon,
  index,
  isDark,
}: {
  title: string
  description: string
  items: { icon: React.ComponentType<{ className?: string }>; text: string }[]
  icon: React.ComponentType<{ className?: string }>
  index: number
  isDark: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: isDark ? 'rgba(17,17,19,0.6)' : 'rgba(255,255,255,0.7)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full gradient-cta" />

      <div className="p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            }}
          >
            <div style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}>
              <Icon className="w-7 h-7" />
            </div>
          </div>
          <div>
            <h3
              className="font-heading font-bold text-2xl md:text-3xl mb-2"
              style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-base md:text-lg leading-relaxed mb-8"
          style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
        >
          {description}
        </p>

        {/* Feature items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => {
            const ItemIcon = item.icon
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                    <ItemIcon className="w-4 h-4" />
                  </div>
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)' }}
                >
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const sections = [
    {
      title: 'GDG On Campus SVCE',
      icon: Code2,
      description:
        'Google Developer Groups On Campus at SVCE Tirupati is a student-led community powered by Google. We bridge the gap between classroom learning and real-world technology through hands-on workshops, hackathons, and developer events. Our mission is to create a space where curious minds experiment, build, and grow — together.',
      items: [
        { icon: Code2, text: 'Hands-on workshops in AI/ML, Web Dev & Cloud' },
        { icon: Users, text: 'Community of 300+ active student developers' },
        { icon: Trophy, text: 'Hackathons, coding contests & project showcases' },
        { icon: Globe, text: 'Connected to the global GDG ecosystem' },
      ],
    },
    {
      title: 'Student Activity Center (SAC)',
      icon: Users,
      description:
        'The Student Activity Center at SVCE is the heartbeat of campus life beyond academics. SAC coordinates all student-led events, cultural fests, technical symposiums, and inter-college competitions. It serves as the official body that empowers student clubs and communities — including GDG On Campus — to organize large-scale events like Freshers Fest.',
      items: [
        { icon: Heart, text: 'Central hub for all campus events & fests' },
        { icon: Users, text: 'Oversees 15+ student clubs & communities' },
        { icon: Trophy, text: 'Organizes inter-college & national-level events' },
        { icon: BookOpen, text: 'Fosters leadership, teamwork & creativity' },
      ],
    },
    {
      title: 'SVCE Tirupati',
      icon: GraduationCap,
      description:
        'Sri Venkateswara College of Engineering (SVCE), Tirupati is a premier engineering institution committed to excellence in education, research, and innovation. Located in the temple city of Tirupati, Andhra Pradesh, SVCE nurtures future engineers and entrepreneurs with a strong foundation in technical knowledge, industry exposure, and holistic development.',
      items: [
        { icon: GraduationCap, text: 'NAAC Accredited engineering institution' },
        { icon: BookOpen, text: 'Multiple UG & PG programs across departments' },
        { icon: MapPin, text: 'Located in the historic city of Tirupati, AP' },
        { icon: Globe, text: 'Strong industry partnerships & placement record' },
      ],
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section
          ref={ref}
          className="relative overflow-hidden"
          style={{
            backgroundColor: isDark ? '#0A0A0B' : 'var(--bg-primary)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute top-20 -left-32 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.4 }}
          />
          <div
            className="absolute bottom-40 -right-32 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.3 }}
          />

          <div className="max-w-4xl mx-auto relative z-10">
            <SectionHeading
              title="About Us"
              subtitle="The people, the community, and the institution behind SVCE Freshers Fest 2026."
            />

            <div className="flex flex-col gap-8">
              {sections.map((section, i) => (
                <AboutCard
                  key={section.title}
                  title={section.title}
                  description={section.description}
                  items={section.items}
                  icon={section.icon}
                  index={i}
                  isDark={isDark}
                />
              ))}
            </div>

            {/* Contact strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 rounded-2xl p-6 md:p-8 text-center"
              style={{
                backgroundColor: isDark ? 'rgba(17,17,19,0.6)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              <h3
                className="font-heading font-bold text-xl mb-2"
                style={{ color: isDark ? '#ffffff' : '#1A1A2E' }}
              >
                Get In Touch
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              >
                Have questions about the fest or want to collaborate?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:gdsc@svce.edu.in"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-cta text-white font-heading font-semibold text-sm hover:opacity-90 transition-all"
                >
                  gdsc@svce.edu.in
                </a>
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
                >
                  <MapPin className="w-4 h-4" />
                  SVCE, Tirupati, Andhra Pradesh
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
