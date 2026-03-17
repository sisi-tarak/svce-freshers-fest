import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function generateTicketId(type: 'INT' | 'EXT'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `FFEST-${type}-${code}`
}

export function getMilestonePrice(externalCount: number): {
  price: number
  tier: 'tier1' | 'tier2' | 'tier3' | 'free'
  nextThreshold: number | null
} {
  if (externalCount > 600) {
    return { price: 0, tier: 'free', nextThreshold: null }
  }
  if (externalCount > 400) {
    return { price: 19, tier: 'tier3', nextThreshold: 601 }
  }
  if (externalCount > 200) {
    return { price: 49, tier: 'tier2', nextThreshold: 401 }
  }
  return { price: 99, tier: 'tier1', nextThreshold: 201 }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
