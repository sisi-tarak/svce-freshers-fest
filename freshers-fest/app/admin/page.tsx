'use client'

import { useState, useEffect } from 'react'
import { Users, IndianRupee, Megaphone, QrCode, TrendingUp, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DashboardStats {
  totalRegistrations: number
  internalRegistrations: number
  externalRegistrations: number
  totalRevenue: number
  ambassadorCount: number
  checkedIn: number
  currentMilestone: string
}

function MetricCard({
  title, value, subtitle, icon: Icon, trend, color = 'orange',
}: {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  trend?: string
  color?: 'orange' | 'cyan' | 'green' | 'purple'
}) {
  const colorMap = {
    orange: 'bg-accent-orange/10 text-accent-orange',
    cyan: 'bg-accent-cyan/10 text-accent-cyan',
    green: 'bg-green-500/10 text-green-400',
    purple: 'bg-purple-500/10 text-purple-400',
  }

  return (
    <div className="rounded-xl bg-bg-secondary border border-border-default p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="flex items-center gap-0.5 text-green-400 text-xs font-medium">
            <ArrowUpRight className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-heading font-bold text-text-primary">{value}</h3>
      <p className="text-text-muted text-sm mt-0.5">{title}</p>
      {subtitle && <p className="text-text-secondary text-xs mt-1">{subtitle}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    internalRegistrations: 0,
    externalRegistrations: 0,
    totalRevenue: 0,
    ambassadorCount: 0,
    checkedIn: 0,
    currentMilestone: 'tier1',
  })
  const [recentRegistrations, setRecentRegistrations] = useState<Array<{
    full_name: string; type: string; created_at: string; college?: string
  }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/dashboard')
        if (res.ok) {
          const data = await res.json()
          setStats(data.stats)
          setRecentRegistrations(data.recentRegistrations || [])
        }
      } catch (e) {
        console.error('Failed to fetch stats:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="font-heading font-bold text-2xl text-text-primary">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl bg-bg-secondary border border-border-default p-5 h-32 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-text-primary">Dashboard</h1>
        <span className="text-text-muted text-sm">
          Auto-refreshes every 30s
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Registrations"
          value={stats.totalRegistrations}
          icon={Users}
          subtitle={`${stats.internalRegistrations} internal + ${stats.externalRegistrations} external`}
          color="orange"
        />
        <MetricCard
          title="External Registrations"
          value={stats.externalRegistrations}
          icon={TrendingUp}
          subtitle={`Milestone: ${stats.currentMilestone}`}
          color="cyan"
        />
        <MetricCard
          title="Revenue Collected"
          value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`}
          icon={IndianRupee}
          color="green"
        />
        <MetricCard
          title="Ambassadors"
          value={stats.ambassadorCount}
          icon={Megaphone}
          color="purple"
        />
      </div>

      {/* Check-in + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-in Progress */}
        <div className="rounded-xl bg-bg-secondary border border-border-default p-6">
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-accent-cyan" />
            Check-In Progress
          </h3>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-3xl font-heading font-bold text-accent-cyan">{stats.checkedIn}</span>
            <span className="text-text-muted">/ {stats.totalRegistrations} checked in</span>
          </div>
          <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-cyan rounded-full transition-all duration-500"
              style={{
                width: `${stats.totalRegistrations > 0 ? (stats.checkedIn / stats.totalRegistrations) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="rounded-xl bg-bg-secondary border border-border-default p-6">
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
            Recent Registrations
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentRegistrations.length === 0 ? (
              <p className="text-text-muted text-sm">No registrations yet.</p>
            ) : (
              recentRegistrations.map((reg, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border-default last:border-0">
                  <div>
                    <p className="text-text-primary text-sm font-medium">{reg.full_name}</p>
                    <p className="text-text-muted text-xs">{reg.college || 'SVCE'}</p>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      reg.type === 'internal' ? 'bg-accent-cyan/15 text-accent-cyan' : 'bg-accent-orange/15 text-accent-orange'
                    )}>
                      {reg.type}
                    </span>
                    <p className="text-text-muted text-xs mt-0.5">
                      {new Date(reg.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
