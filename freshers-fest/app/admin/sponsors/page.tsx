'use client'

import { useState, useEffect } from 'react'
import { Building2, Plus, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { cn } from '@/lib/utils'
import type { Sponsor } from '@/types'

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    company_name: '', tier: 'bronze', contact_person: '', contact_email: '', amount: '', notes: '',
  })

  const fetchSponsors = () => {
    fetch('/api/admin/sponsors')
      .then((r) => r.json())
      .then((data) => setSponsors(data.sponsors || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchSponsors() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/sponsors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount: parseFloat(form.amount) || 0 }),
    })
    if (res.ok) {
      setShowForm(false)
      setForm({ company_name: '', tier: 'bronze', contact_person: '', contact_email: '', amount: '', notes: '' })
      fetchSponsors()
    }
  }

  const handleToggleConfirm = async (sponsor: Sponsor) => {
    await fetch('/api/admin/sponsors', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: sponsor.id, is_confirmed: !sponsor.is_confirmed }),
    })
    fetchSponsors()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this sponsor?')) return
    await fetch('/api/admin/sponsors', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchSponsors()
  }

  const tierColors: Record<string, string> = {
    gold: 'text-yellow-400 bg-yellow-500/10',
    silver: 'text-gray-300 bg-gray-500/10',
    bronze: 'text-amber-600 bg-amber-600/10',
    food: 'text-green-400 bg-green-500/10',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-text-primary flex items-center gap-2">
          <Building2 className="w-7 h-7 text-yellow-400" />
          Sponsors
        </h1>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />
          Add Sponsor
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="rounded-xl bg-bg-secondary border border-border-default p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Company Name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} required />
            <Select label="Tier" options={[
              { value: 'bronze', label: 'Bronze' }, { value: 'silver', label: 'Silver' },
              { value: 'gold', label: 'Gold' }, { value: 'food', label: 'Food Stall' },
            ]} value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} />
            <Input label="Contact Person" value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} />
            <Input label="Contact Email" type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} />
            <Input label="Amount (₹)" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button type="submit" size="sm">Save Sponsor</Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-bg-secondary border border-border-default rounded-xl animate-pulse" />
          ))
        ) : sponsors.length === 0 ? (
          <p className="text-text-muted col-span-full text-center py-8">No sponsors added yet.</p>
        ) : (
          sponsors.map((s) => (
            <div key={s.id} className="rounded-xl bg-bg-secondary border border-border-default p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading font-semibold text-text-primary">{s.company_name}</h3>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full mt-1 inline-block', tierColors[s.tier])}>
                    {s.tier.charAt(0).toUpperCase() + s.tier.slice(1)}
                  </span>
                </div>
                <button onClick={() => handleDelete(s.id)} className="text-text-muted hover:text-red-400 cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {s.amount && <p className="text-text-secondary text-sm">₹{Number(s.amount).toLocaleString('en-IN')}</p>}
              {s.contact_person && <p className="text-text-muted text-xs mt-1">{s.contact_person}</p>}
              <button
                onClick={() => handleToggleConfirm(s)}
                className={cn(
                  'mt-3 text-xs px-3 py-1 rounded-full cursor-pointer transition-colors',
                  s.is_confirmed
                    ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25'
                    : 'bg-bg-tertiary text-text-muted hover:text-text-primary'
                )}
              >
                {s.is_confirmed ? 'Confirmed ✓' : 'Mark as Confirmed'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
