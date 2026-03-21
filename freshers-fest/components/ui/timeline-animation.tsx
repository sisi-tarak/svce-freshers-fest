'use client'

import { useRef, RefObject, useMemo } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimelineContentProps {
  as?: string
  animationNum: number
  timelineRef: RefObject<HTMLDivElement | null>
  customVariants?: Variants
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  [key: string]: unknown
}

export function TimelineContent({
  as = 'div',
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
  style,
  ...props
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, { once: true, margin: '-100px' })

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
  }

  const variants = customVariants || defaultVariants

  const sharedProps = useMemo(() => ({
    custom: animationNum,
    initial: 'hidden' as const,
    animate: isInView ? ('visible' as const) : ('hidden' as const),
    variants,
    className: cn(className),
    style,
  }), [animationNum, isInView, variants, className, style])

  // Render the appropriate motion element based on `as` prop
  if (as === 'span') return <motion.span {...sharedProps} {...props}>{children}</motion.span>
  if (as === 'p') return <motion.p {...sharedProps} {...props}>{children}</motion.p>
  if (as === 'h1') return <motion.h1 {...sharedProps} {...props}>{children}</motion.h1>
  if (as === 'h2') return <motion.h2 {...sharedProps} {...props}>{children}</motion.h2>
  if (as === 'h3') return <motion.h3 {...sharedProps} {...props}>{children}</motion.h3>
  if (as === 'h4') return <motion.h4 {...sharedProps} {...props}>{children}</motion.h4>
  if (as === 'figure') return <motion.figure {...sharedProps} {...props}>{children}</motion.figure>
  if (as === 'a') return <motion.a {...sharedProps} {...props}>{children}</motion.a>
  if (as === 'button') return <motion.button {...sharedProps} {...props}>{children}</motion.button>
  if (as === 'section') return <motion.section {...sharedProps} {...props}>{children}</motion.section>
  if (as === 'li') return <motion.li {...sharedProps} {...props}>{children}</motion.li>

  return <motion.div {...sharedProps} {...props}>{children}</motion.div>
}
