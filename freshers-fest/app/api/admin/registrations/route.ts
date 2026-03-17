import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(req.url)

    const type = searchParams.get('type') || 'all'
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    let internal: Array<Record<string, unknown>> = []
    let external: Array<Record<string, unknown>> = []

    if (type === 'all' || type === 'internal') {
      let query = supabase
        .from('internal_registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,roll_number.ilike.%${search}%,email.ilike.%${search}%,ticket_id.ilike.%${search}%`)
      }

      if (type === 'internal') {
        query = query.range(offset, offset + limit - 1)
      }

      const { data } = await query
      internal = (data || []).map((r) => ({ ...r, type: 'internal' }))
    }

    if (type === 'all' || type === 'external') {
      let query = supabase
        .from('external_registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,college_name.ilike.%${search}%,email.ilike.%${search}%,ticket_id.ilike.%${search}%`)
      }

      if (type === 'external') {
        query = query.range(offset, offset + limit - 1)
      }

      const { data } = await query
      external = (data || []).map((r) => ({ ...r, type: 'external' }))
    }

    const registrations = [...internal, ...external]
      .sort((a, b) => new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime())

    return NextResponse.json({ registrations })
  } catch (error) {
    console.error('Registrations fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations.' }, { status: 500 })
  }
}
