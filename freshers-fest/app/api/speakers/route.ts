import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order')

    if (error) {
      console.error('Speakers fetch error:', error)
      return NextResponse.json({ speakers: [] })
    }

    return NextResponse.json({ speakers: data || [] })
  } catch {
    return NextResponse.json({ speakers: [] })
  }
}
