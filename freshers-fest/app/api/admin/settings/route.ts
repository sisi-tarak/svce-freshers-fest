import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('site_settings').select('*')
    if (error) throw error

    const settings: Record<string, unknown> = {}
    for (const row of data || []) {
      settings[row.key] = row.value
    }

    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { key, value } = await req.json()
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() })

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update settings.' }, { status: 500 })
  }
}
