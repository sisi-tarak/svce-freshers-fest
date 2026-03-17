import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getMilestonePrice } from '@/lib/utils'

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Fetch all counts in parallel
    const [
      internalResult,
      externalResult,
      ambassadorResult,
      internalCheckedIn,
      externalCheckedIn,
      revenueInternal,
      revenueExternal,
      recentInternal,
      recentExternal,
    ] = await Promise.all([
      supabase.from('internal_registrations').select('*', { count: 'exact', head: true }),
      supabase.from('external_registrations').select('*', { count: 'exact', head: true }).eq('payment_status', 'paid'),
      supabase.from('ambassadors').select('*', { count: 'exact', head: true }),
      supabase.from('internal_registrations').select('*', { count: 'exact', head: true }).eq('checked_in', true),
      supabase.from('external_registrations').select('*', { count: 'exact', head: true }).eq('checked_in', true),
      supabase.from('internal_registrations').select('price_paid').in('payment_status', ['paid', 'free']),
      supabase.from('external_registrations').select('price_paid').eq('payment_status', 'paid'),
      supabase.from('internal_registrations').select('full_name, created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('external_registrations').select('full_name, college_name, created_at').eq('payment_status', 'paid').order('created_at', { ascending: false }).limit(10),
    ])

    const internalCount = internalResult.count || 0
    const externalCount = externalResult.count || 0
    const totalInternalRevenue = (revenueInternal.data || []).reduce((sum, r) => sum + (Number(r.price_paid) || 0), 0)
    const totalExternalRevenue = (revenueExternal.data || []).reduce((sum, r) => sum + (Number(r.price_paid) || 0), 0)
    const checkedIn = (internalCheckedIn.count || 0) + (externalCheckedIn.count || 0)
    const { tier } = getMilestonePrice(externalCount)

    // Merge and sort recent registrations
    const recentRegistrations = [
      ...(recentInternal.data || []).map((r) => ({ ...r, type: 'internal' as const, college: 'SVCE' })),
      ...(recentExternal.data || []).map((r) => ({ full_name: r.full_name, created_at: r.created_at, type: 'external' as const, college: r.college_name })),
    ]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20)

    return NextResponse.json({
      stats: {
        totalRegistrations: internalCount + externalCount,
        internalRegistrations: internalCount,
        externalRegistrations: externalCount,
        totalRevenue: totalInternalRevenue + totalExternalRevenue,
        ambassadorCount: ambassadorResult.count || 0,
        checkedIn,
        currentMilestone: tier,
      },
      recentRegistrations,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats.' }, { status: 500 })
  }
}
