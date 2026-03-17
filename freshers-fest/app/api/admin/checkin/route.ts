import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { ticketId } = await req.json()

    if (!ticketId) {
      return NextResponse.json({ error: 'Ticket ID is required.' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Search in internal registrations first
    const { data: internal } = await supabase
      .from('internal_registrations')
      .select('*')
      .eq('ticket_id', ticketId)
      .single()

    if (internal) {
      if (internal.checked_in) {
        return NextResponse.json({
          error: 'Already checked in',
          participant: { ...internal, type: 'internal' },
          status: 'already_checked_in',
        }, { status: 409 })
      }

      await supabase
        .from('internal_registrations')
        .update({ checked_in: true, checked_in_at: new Date().toISOString() })
        .eq('id', internal.id)

      return NextResponse.json({
        success: true,
        participant: { ...internal, type: 'internal', checked_in: true },
        message: `${internal.full_name} checked in successfully!`,
      })
    }

    // Search in external registrations
    const { data: external } = await supabase
      .from('external_registrations')
      .select('*')
      .eq('ticket_id', ticketId)
      .single()

    if (external) {
      if (external.payment_status !== 'paid') {
        return NextResponse.json({
          error: 'Payment not completed',
          participant: { ...external, type: 'external' },
          status: 'payment_pending',
        }, { status: 402 })
      }

      if (external.checked_in) {
        return NextResponse.json({
          error: 'Already checked in',
          participant: { ...external, type: 'external' },
          status: 'already_checked_in',
        }, { status: 409 })
      }

      await supabase
        .from('external_registrations')
        .update({ checked_in: true, checked_in_at: new Date().toISOString() })
        .eq('id', external.id)

      return NextResponse.json({
        success: true,
        participant: { ...external, type: 'external', checked_in: true },
        message: `${external.full_name} checked in successfully!`,
      })
    }

    return NextResponse.json({ error: 'Ticket not found.', status: 'not_found' }, { status: 404 })
  } catch (error) {
    console.error('Check-in error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
