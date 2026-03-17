import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { externalRegistrationSchema } from '@/lib/validations'
import { generateTicketId } from '@/lib/utils'

const EXTERNAL_PRICE_AMOUNT = 199

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = externalRegistrationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createAdminClient()

    // Check for duplicate email
    const { data: existing } = await supabase
      .from('external_registrations')
      .select('id')
      .eq('email', data.email)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 })
    }

    // Validate ambassador code if provided
    if (data.ambassador_code) {
      const { data: ambassador } = await supabase
        .from('ambassadors')
        .select('id')
        .eq('referral_code', data.ambassador_code)
        .single()

      if (!ambassador) {
        return NextResponse.json({ error: 'Invalid ambassador referral code.' }, { status: 400 })
      }
    }

    const ticketId = generateTicketId('EXT')

    // Save registration with pending payment
    const { data: registration, error: insertError } = await supabase
      .from('external_registrations')
      .insert({
        full_name: data.full_name,
        college_name: data.college_name,
        course: data.course,
        year: data.year,
        phone: data.phone,
        email: data.email,
        ticket_id: ticketId,
        price_paid: EXTERNAL_PRICE_AMOUNT,
        payment_status: 'pending',
        ambassador_code: data.ambassador_code || null,
      })
      .select('id, ticket_id')
      .single()

    if (insertError) {
      console.error('Registration insert error:', insertError)
      return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
    }

    // Create Razorpay order
    try {
      const Razorpay = (await import('razorpay')).default
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      })

      const order = await razorpay.orders.create({
        amount: EXTERNAL_PRICE_AMOUNT * 100,
        currency: 'INR',
        receipt: ticketId,
        notes: { type: 'external', registrationId: registration.id },
      })

      // Update registration with order ID
      await supabase
        .from('external_registrations')
        .update({ razorpay_order_id: order.id })
        .eq('id', registration.id)

      return NextResponse.json({
        paymentRequired: true,
        amount: EXTERNAL_PRICE_AMOUNT,
        razorpay_order_id: order.id,
        registrationId: registration.id,
        ticket_id: ticketId,
      })
    } catch (razorpayError) {
      console.error('Razorpay order error:', razorpayError)
      // Clean up the registration
      await supabase.from('external_registrations').delete().eq('id', registration.id)
      return NextResponse.json({ error: 'Payment initialization failed.' }, { status: 500 })
    }
  } catch (error) {
    console.error('External registration error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
