import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: 'orange' | 'cyan' | 'none'
  glow?: boolean
}

export default function Card({
  className,
  hover = 'orange',
  glow = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-bg-secondary border border-border-default p-6',
        hover === 'orange' && 'card-hover-orange',
        hover === 'cyan' && 'card-hover-cyan',
        glow && hover === 'orange' && 'glow-orange-subtle',
        glow && hover === 'cyan' && 'glow-cyan-subtle',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
