import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getMilestonePrice } from '@/lib/utils'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { count, error } = await supabase
      .from('external_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('payment_status', 'paid')

    if (error) {
      console.error('Milestone fetch error:', error)
      // Return default values on error
      return NextResponse.json({
        external_count: 0,
        svce_price: 99,
        tier: 'tier1',
        next_threshold: 201,
      })
    }

    const externalCount = count || 0
    const { price, tier, nextThreshold } = getMilestonePrice(externalCount)

    return NextResponse.json({
      external_count: externalCount,
      svce_price: price,
      tier,
      next_threshold: nextThreshold,
    })
  } catch {
    return NextResponse.json({
      external_count: 0,
      svce_price: 99,
      tier: 'tier1',
      next_threshold: 201,
    })
  }
}
