import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ambassadorApplicationSchema } from '@/lib/validations'

function generateReferralCode(collegeName: string): string {
  const collegeCode = collegeName
    .replace(/[^a-zA-Z]/g, '')
    .substring(0, 6)
    .toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `AMB-${collegeCode}-${random}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ambassadorApplicationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createAdminClient()

    // Check duplicate
    const { data: existing } = await supabase
      .from('ambassadors')
      .select('id, referral_code')
      .eq('email', data.email)
      .single()

    if (existing) {
      return NextResponse.json({
        error: 'You have already applied as an ambassador.',
        referral_code: existing.referral_code,
      }, { status: 409 })
    }

    const referralCode = generateReferralCode(data.college_name)

    const { data: ambassador, error } = await supabase
      .from('ambassadors')
      .insert({
        full_name: data.full_name,
        college_name: data.college_name,
        phone: data.phone,
        email: data.email,
        referral_code: referralCode,
      })
      .select('id, referral_code')
      .single()

    if (error) {
      console.error('Ambassador insert error:', error)
      return NextResponse.json({ error: 'Application failed. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      referral_code: ambassador.referral_code,
      message: 'Welcome aboard! Share your referral code with external students.',
    })
  } catch (error) {
    console.error('Ambassador application error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
