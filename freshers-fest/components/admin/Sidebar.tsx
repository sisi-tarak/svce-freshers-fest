'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Users, QrCode, Megaphone, Code2,
  Building2, BarChart3, FileText, Bell, LogOut, Menu, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/registrations', label: 'Registrations', icon: Users },
  { href: '/admin/checkin', label: 'Check-In Scanner', icon: QrCode },
  { href: '/admin/ambassadors', label: 'Ambassadors', icon: Megaphone },
  { href: '/admin/hackathon', label: 'Hackathon', icon: Code2 },
  { href: '/admin/sponsors', label: 'Sponsors', icon: Building2 },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const navContent = (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-border-default">
        <h2 className="font-heading font-bold text-lg gradient-text-orange">FF 2026</h2>
        <p className="text-text-muted text-xs">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <button
              key={item.href}
              onClick={() => {
                router.push(item.href)
                setMobileOpen(false)
              }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                active
                  ? 'bg-accent-orange/10 text-accent-orange'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border-default">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-bg-secondary border-r border-border-default flex-col h-screen sticky top-0">
        {navContent}
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass px-4 py-3 flex items-center justify-between">
        <span className="font-heading font-bold gradient-text-orange">FF 2026 Admin</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-text-secondary cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-bg-secondary flex flex-col">
            {navContent}
          </aside>
        </div>
      )}
    </>
  )
}
