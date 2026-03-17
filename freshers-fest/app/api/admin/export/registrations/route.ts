import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'all'

    let rows: string[] = []

    if (type === 'all' || type === 'internal') {
      const { data } = await supabase
        .from('internal_registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        if (rows.length === 0) {
          rows.push('Type,Name,Roll Number/College,Department/Course,Year,Phone,Email,Ticket ID,Price Paid,Payment Status,Checked In,Created At')
        }
        data.forEach((r) => {
          rows.push(`Internal,"${r.full_name}","${r.roll_number}","${r.department}",${r.year},"${r.phone}","${r.email}","${r.ticket_id}",${r.price_paid},${r.payment_status},${r.checked_in},"${r.created_at}"`)
        })
      }
    }

    if (type === 'all' || type === 'external') {
      const { data } = await supabase
        .from('external_registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        if (rows.length === 0) {
          rows.push('Type,Name,Roll Number/College,Department/Course,Year,Phone,Email,Ticket ID,Price Paid,Payment Status,Checked In,Created At')
        }
        data.forEach((r) => {
          rows.push(`External,"${r.full_name}","${r.college_name}","${r.course}",${r.year},"${r.phone}","${r.email}","${r.ticket_id}",${r.price_paid},${r.payment_status},${r.checked_in},"${r.created_at}"`)
        })
      }
    }

    if (rows.length === 0) {
      rows.push('No data')
    }

    const csv = rows.join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="registrations-${type}-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Export failed.' }, { status: 500 })
  }
}
