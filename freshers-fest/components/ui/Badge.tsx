import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'orange' | 'cyan' | 'default' | 'success' | 'warning'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-accent-orange/15 text-accent-orange': variant === 'orange',
          'bg-accent-cyan/15 text-accent-cyan': variant === 'cyan',
          'bg-bg-tertiary text-text-secondary': variant === 'default',
          'bg-green-500/15 text-green-400': variant === 'success',
          'bg-yellow-500/15 text-yellow-400': variant === 'warning',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
