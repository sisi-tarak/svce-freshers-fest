import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { internalRegistrationSchema } from '@/lib/validations'
import { generateTicketId, getMilestonePrice } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = internalRegistrationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createAdminClient()

    // Check for duplicate roll number
    const { data: existing } = await supabase
      .from('internal_registrations')
      .select('id')
      .eq('roll_number', data.roll_number)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'This roll number is already registered.' }, { status: 409 })
    }

    // Get current milestone price
    const { count: extCount } = await supabase
      .from('external_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('payment_status', 'paid')

    const { price } = getMilestonePrice(extCount || 0)
    const ticketId = generateTicketId('INT')
    const isFree = price === 0

    // If price > 0, we need payment — create a Razorpay order
    if (!isFree && price > 0) {
      // Save registration with pending status
      const { data: registration, error: insertError } = await supabase
        .from('internal_registrations')
        .insert({
          full_name: data.full_name,
          roll_number: data.roll_number,
          department: data.department,
          year: data.year,
          phone: data.phone,
          email: data.email,
          ticket_id: ticketId,
          price_paid: price,
          payment_status: 'pending',
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
          amount: price * 100,
          currency: 'INR',
          receipt: ticketId,
          notes: { type: 'internal', registrationId: registration.id },
        })

        return NextResponse.json({
          paymentRequired: true,
          amount: price,
          razorpay_order_id: order.id,
          registrationId: registration.id,
          ticket_id: ticketId,
        })
      } catch (razorpayError) {
        console.error('Razorpay order error:', razorpayError)
        return NextResponse.json({ error: 'Payment initialization failed.' }, { status: 500 })
      }
    }

    // Free registration
    const { data: registration, error: insertError } = await supabase
      .from('internal_registrations')
      .insert({
        full_name: data.full_name,
        roll_number: data.roll_number,
        department: data.department,
        year: data.year,
        phone: data.phone,
        email: data.email,
        ticket_id: ticketId,
        price_paid: 0,
        payment_status: 'free',
      })
      .select('id, ticket_id')
      .single()

    if (insertError) {
      console.error('Registration insert error:', insertError)
      return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      paymentRequired: false,
      ticket_id: registration.ticket_id,
      registrationId: registration.id,
      message: 'Registration successful! Check your email for the e-ticket.',
    })
  } catch (error) {
    console.error('Internal registration error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
