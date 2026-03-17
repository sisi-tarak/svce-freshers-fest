import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('sponsors')
      .select('id, company_name, tier, logo_url')
      .eq('is_confirmed', true)
      .order('tier')

    if (error) {
      console.error('Sponsors fetch error:', error)
      return NextResponse.json({ sponsors: [] })
    }

    return NextResponse.json({ sponsors: data || [] })
  } catch {
    return NextResponse.json({ sponsors: [] })
  }
}
