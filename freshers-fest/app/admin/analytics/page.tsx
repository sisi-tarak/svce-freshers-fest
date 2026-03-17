'use client'

import { BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-text-primary flex items-center gap-2">
        <BarChart3 className="w-7 h-7 text-accent-cyan" />
        Analytics
      </h1>

      <div className="rounded-xl bg-bg-secondary border border-border-default p-12 text-center">
        <BarChart3 className="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
          Analytics Dashboard
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Detailed charts and analytics (registration funnel, demographic breakdowns, daily trends, referral performance)
          will be available once registrations start coming in. Charts powered by Recharts.
        </p>
      </div>
    </div>
  )
}
