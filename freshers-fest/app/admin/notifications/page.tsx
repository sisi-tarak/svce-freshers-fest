'use client'

import { Bell } from 'lucide-react'

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-text-primary flex items-center gap-2">
        <Bell className="w-7 h-7 text-yellow-400" />
        Notifications
      </h1>

      <div className="rounded-xl bg-bg-secondary border border-border-default p-12 text-center">
        <Bell className="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
          Bulk Notifications
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Send bulk emails to registrants, generate WhatsApp broadcast links, and manage site-wide
          announcement banners. Coming soon.
        </p>
      </div>
    </div>
  )
}
