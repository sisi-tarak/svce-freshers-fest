import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ sponsors: data || [] })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch sponsors.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('sponsors')
      .insert(body)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ sponsor: data })
  } catch {
    return NextResponse.json({ error: 'Failed to create sponsor.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updates } = body
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('sponsors')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ sponsor: data })
  } catch {
    return NextResponse.json({ error: 'Failed to update sponsor.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const supabase = createAdminClient()

    const { error } = await supabase.from('sponsors').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete sponsor.' }, { status: 500 })
  }
}
