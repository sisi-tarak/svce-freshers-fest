import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data } = await supabase
      .from('ambassadors')
      .select('*')
      .order('registrations_count', { ascending: false })

    const rows = ['Name,College,Phone,Email,Referral Code,Registrations,Certificate Eligible,Star Ambassador,Created At']

    ;(data || []).forEach((a) => {
      rows.push(`"${a.full_name}","${a.college_name}","${a.phone}","${a.email}","${a.referral_code}",${a.registrations_count},${a.certificate_eligible},${a.star_ambassador},"${a.created_at}"`)
    })

    const csv = rows.join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="ambassadors-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Export failed.' }, { status: 500 })
  }
}
