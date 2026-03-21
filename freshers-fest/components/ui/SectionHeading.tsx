'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  gradient?: boolean
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  gradient = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={cn('text-center mb-12 md:mb-16', className)}
    >
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4',
          'gradient-text',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
