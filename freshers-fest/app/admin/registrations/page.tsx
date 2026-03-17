'use client'

import { useState, useEffect } from 'react'
import { Search, Download, Filter } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Tabs from '@/components/ui/Tabs'
import { cn } from '@/lib/utils'

interface Registration {
  id: string
  full_name: string
  email: string
  phone: string
  ticket_id: string
  type: string
  payment_status: string
  checked_in: boolean
  created_at: string
  roll_number?: string
  department?: string
  college_name?: string
  course?: string
  ambassador_code?: string
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const fetchRegistrations = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ type: typeFilter })
      if (search) params.set('search', search)
      const res = await fetch(`/api/admin/registrations?${params}`)
      if (res.ok) {
        const data = await res.json()
        setRegistrations(data.registrations || [])
      }
    } catch (e) {
      console.error('Failed to fetch:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRegistrations() }, [typeFilter])

  const filteredRegistrations = search
    ? registrations.filter((r) =>
        r.full_name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.ticket_id.toLowerCase().includes(search.toLowerCase())
      )
    : registrations

  const handleExport = () => {
    window.open(`/api/admin/export/registrations?type=${typeFilter}`, '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-heading font-bold text-2xl text-text-primary">Registrations</h1>
        <Button variant="secondary" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Tabs
          tabs={[
            { id: 'all', label: 'All' },
            { id: 'internal', label: 'Internal' },
            { id: 'external', label: 'External' },
          ]}
          activeTab={typeFilter}
          onTabChange={setTypeFilter}
        />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name, email, or ticket ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-bg-tertiary border border-border-default text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border-default overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-tertiary">
              <tr>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Name</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Type</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium hidden md:table-cell">College/Roll</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium hidden lg:table-cell">Email</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Ticket ID</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Payment</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Check-In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-bg-tertiary rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-text-muted">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-bg-secondary/50">
                    <td className="px-4 py-3 text-text-primary font-medium">{reg.full_name}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        reg.type === 'internal' ? 'bg-accent-cyan/15 text-accent-cyan' : 'bg-accent-orange/15 text-accent-orange'
                      )}>
                        {reg.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                      {reg.type === 'internal' ? reg.roll_number : reg.college_name}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{reg.email}</td>
                    <td className="px-4 py-3 font-mono text-text-muted text-xs">{reg.ticket_id}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        reg.payment_status === 'paid' || reg.payment_status === 'free'
                          ? 'bg-green-500/15 text-green-400'
                          : reg.payment_status === 'pending'
                          ? 'bg-yellow-500/15 text-yellow-400'
                          : 'bg-red-500/15 text-red-400'
                      )}>
                        {reg.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'w-3 h-3 rounded-full inline-block',
                        reg.checked_in ? 'bg-green-400' : 'bg-text-muted/30'
                      )} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-text-muted text-sm text-right">
        Showing {filteredRegistrations.length} registration{filteredRegistrations.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
