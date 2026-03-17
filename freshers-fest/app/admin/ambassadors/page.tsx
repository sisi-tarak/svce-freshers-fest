'use client'

import { useState, useEffect } from 'react'
import { Download, Megaphone, Award, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Ambassador } from '@/types'

export default function AmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/ambassadors')
      .then((r) => r.json())
      .then((data) => setAmbassadors(data.ambassadors || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-text-primary flex items-center gap-2">
          <Megaphone className="w-7 h-7 text-purple-400" />
          Ambassadors
        </h1>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => window.open('/api/admin/export/ambassadors', '_blank')}
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-xl border border-border-default overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-tertiary">
              <tr>
                <th className="px-4 py-3 text-left text-text-muted font-medium">#</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Name</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">College</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Referral Code</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Registrations</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-bg-tertiary rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : ambassadors.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-text-muted">No ambassadors yet.</td></tr>
              ) : (
                ambassadors.map((amb, i) => (
                  <tr key={amb.id} className="hover:bg-bg-secondary/50">
                    <td className="px-4 py-3 text-text-muted">
                      {i === 0 && ambassadors.length > 1 ? (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ) : (
                        i + 1
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-primary font-medium">{amb.full_name}</td>
                    <td className="px-4 py-3 text-text-secondary">{amb.college_name}</td>
                    <td className="px-4 py-3 font-mono text-accent-orange text-xs">{amb.referral_code}</td>
                    <td className="px-4 py-3 font-heading font-bold text-text-primary">{amb.registrations_count}</td>
                    <td className="px-4 py-3">
                      {amb.certificate_eligible ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs">
                          <Award className="w-3.5 h-3.5" /> Certificate Eligible
                        </span>
                      ) : (
                        <span className="text-text-muted text-xs">
                          {5 - amb.registrations_count} more needed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
