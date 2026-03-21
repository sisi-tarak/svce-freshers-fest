"use client"

import React from "react"
import { motion } from "motion/react"

export interface Testimonial {
  text: string
  image: string
  name: string
  role: string
}

export function TestimonialsRow(props: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
  reverse?: boolean
}) {
  return (
    <div className={`overflow-hidden ${props.className || ''}`}>
      <motion.div
        animate={{
          translateX: props.reverse ? "0%" : "-50%",
        }}
        initial={{
          translateX: props.reverse ? "-50%" : "0%",
        }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex gap-6 pr-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border shrink-0 w-[340px] md:w-[380px] transition-all duration-300 card-hover-orange"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-default)',
                }}
              >
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-accent-orange/20"
                  />
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-sm tracking-tight leading-5" style={{ color: 'var(--text-primary)' }}>
                      {name}
                    </span>
                    <span className="text-xs leading-5 tracking-tight" style={{ color: 'var(--text-muted)' }}>
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
