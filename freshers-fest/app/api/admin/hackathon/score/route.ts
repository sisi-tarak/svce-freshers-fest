import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { teamId, scores } = await req.json()

    if (!teamId || !scores) {
      return NextResponse.json({ error: 'Team ID and scores are required.' }, { status: 400 })
    }

    const { innovation, technical, problem_fit, demo, impact } = scores

    const total =
      (innovation || 0) * 0.25 +
      (technical || 0) * 0.20 +
      (problem_fit || 0) * 0.20 +
      (demo || 0) * 0.20 +
      (impact || 0) * 0.15

    const supabase = createAdminClient()

    const { error } = await supabase
      .from('hackathon_teams')
      .update({
        scores: { ...scores, total: Math.round(total * 100) / 100 },
      })
      .eq('id', teamId)

    if (error) throw error

    return NextResponse.json({ success: true, total: Math.round(total * 100) / 100 })
  } catch {
    return NextResponse.json({ error: 'Failed to save scores.' }, { status: 500 })
  }
}
