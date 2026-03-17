import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('hackathon_teams')
      .select('*')
      .not('scores', 'is', null)
      .order('scores->total', { ascending: false })

    if (error) throw error

    // Assign ranks
    const ranked = (data || []).map((team, i) => ({
      ...team,
      final_rank: i + 1,
    }))

    return NextResponse.json({ leaderboard: ranked })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leaderboard.' }, { status: 500 })
  }
}
