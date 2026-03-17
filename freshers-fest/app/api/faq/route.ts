import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('faq_entries')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order')

    if (error) {
      console.error('FAQ fetch error:', error)
      return NextResponse.json({ faq: [] })
    }

    return NextResponse.json({ faq: data || [] })
  } catch {
    return NextResponse.json({ faq: [] })
  }
}
