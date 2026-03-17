import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('ambassadors')
      .select('*')
      .order('registrations_count', { ascending: false })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch ambassadors.' }, { status: 500 })
    }

    return NextResponse.json({ ambassadors: data || [] })
  } catch (error) {
    console.error('Ambassadors fetch error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
