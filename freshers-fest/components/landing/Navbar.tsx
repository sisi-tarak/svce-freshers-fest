'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'

const NAV_LINKS = [
  { id: 'events', label: 'Events' },
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'faq', label: 'FAQ' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id))
      const scrollPos = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'glass py-2.5 shadow-lg shadow-black/5'
            : 'bg-transparent py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ─── Logo ─── */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg gradient-cta flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm leading-none gradient-text-orange">
                  FRESHERS FEST
                </span>
                <span className="text-[10px] leading-none mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  SVCE Tirupati &middot; 2026
                </span>
              </div>
            </button>

            {/* ─── Desktop Nav Links ─── */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 p-1 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={cn(
                      'relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                      activeSection === link.id
                        ? 'text-white'
                        : 'hover:text-[var(--text-primary)]'
                    )}
                    style={{
                      color: activeSection === link.id ? undefined : 'var(--text-secondary)',
                    }}
                  >
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 gradient-cta rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* ─── Right Actions ─── */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-default)',
                }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Register CTA */}
              <button
                onClick={() => scrollTo('register')}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full gradient-cta text-white text-sm font-heading font-semibold hover:opacity-90 transition-all duration-300 hover:gap-2.5 cursor-pointer group"
              >
                Register
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isMobileOpen ? 'close' : 'open'}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5"
            style={{ backgroundColor: 'var(--overlay)' }}
          >
            {/* Close area */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            {/* Logo */}
            <div className="mb-4">
              <span className="font-heading font-bold text-2xl gradient-text">FRESHERS FEST</span>
            </div>

            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(link.id)}
                className={cn(
                  'text-xl font-heading font-semibold transition-colors cursor-pointer px-6 py-2 rounded-lg',
                  activeSection === link.id
                    ? 'text-accent-orange'
                    : ''
                )}
                style={{ color: activeSection === link.id ? undefined : 'var(--text-primary)' }}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => scrollTo('register')}
              className="mt-4 px-8 py-3 rounded-full gradient-cta text-white text-lg font-heading font-semibold cursor-pointer"
            >
              Register Now — ₹199
            </motion.button>

            {/* Mobile theme toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={toggleTheme}
              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
