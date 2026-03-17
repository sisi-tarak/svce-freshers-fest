'use client'

import { FileText } from 'lucide-react'

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-text-primary flex items-center gap-2">
        <FileText className="w-7 h-7 text-accent-orange" />
        Content Management
      </h1>

      <div className="rounded-xl bg-bg-secondary border border-border-default p-12 text-center">
        <FileText className="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
          Content CMS
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Manage speaker cards, FAQ entries, sponsor logos, and toggle event sections.
          Content is currently managed through Supabase dashboard. Full CMS coming soon.
        </p>
      </div>
    </div>
  )
}
