'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-orange/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          {
            'gradient-cta text-white hover:opacity-90': variant === 'primary',
            'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80 border border-border-default': variant === 'secondary',
            'bg-transparent border-2 border-accent-orange text-accent-orange hover:bg-accent-orange/10': variant === 'outline',
            'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary': variant === 'ghost',
            'bg-transparent border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10': variant === 'cyan',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-5 py-2.5 text-base': size === 'md',
            'px-8 py-3.5 text-lg': size === 'lg',
          },
          glow && variant === 'primary' && 'pulse-glow',
          glow && variant === 'cyan' && 'glow-cyan',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
