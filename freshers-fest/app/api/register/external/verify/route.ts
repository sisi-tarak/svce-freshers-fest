import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, registrationId } = body

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !registrationId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed. Invalid signature.' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Try external_registrations first
    const { data: extReg } = await supabase
      .from('external_registrations')
      .select('*')
      .eq('id', registrationId)
      .single()

    if (extReg) {
      // Update payment status
      const { error: updateError } = await supabase
        .from('external_registrations')
        .update({
          razorpay_payment_id,
          payment_status: 'paid',
        })
        .eq('id', registrationId)

      if (updateError) {
        console.error('Update error:', updateError)
        return NextResponse.json({ error: 'Failed to update payment status.' }, { status: 500 })
      }

      // Increment ambassador count if referral code exists
      if (extReg.ambassador_code) {
        try {
          const { data: amb } = await supabase
            .from('ambassadors')
            .select('registrations_count')
            .eq('referral_code', extReg.ambassador_code)
            .single()

          if (amb) {
            await supabase
              .from('ambassadors')
              .update({
                registrations_count: amb.registrations_count + 1,
                certificate_eligible: amb.registrations_count + 1 >= 5,
              })
              .eq('referral_code', extReg.ambassador_code)
          }
        } catch {
          // Non-critical: log but don't fail the payment verification
          console.error('Failed to increment ambassador count')
        }
      }

      return NextResponse.json({
        success: true,
        ticket_id: extReg.ticket_id,
        message: 'Payment verified! Your e-ticket is ready.',
      })
    }

    // Try internal_registrations
    const { data: intReg } = await supabase
      .from('internal_registrations')
      .select('*')
      .eq('id', registrationId)
      .single()

    if (intReg) {
      const { error: updateError } = await supabase
        .from('internal_registrations')
        .update({
          payment_id: razorpay_payment_id,
          payment_status: 'paid',
        })
        .eq('id', registrationId)

      if (updateError) {
        return NextResponse.json({ error: 'Failed to update payment status.' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        ticket_id: intReg.ticket_id,
        message: 'Payment verified! Your e-ticket is ready.',
      })
    }

    return NextResponse.json({ error: 'Registration not found.' }, { status: 404 })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
