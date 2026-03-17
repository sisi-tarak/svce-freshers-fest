'use client'

import { useState, useEffect } from 'react'
import { Code2, Trophy } from 'lucide-react'
import type { HackathonTeam } from '@/types'
import { cn } from '@/lib/utils'

export default function HackathonPage() {
  const [teams, setTeams] = useState<HackathonTeam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/hackathon/leaderboard')
      .then((r) => r.json())
      .then((data) => setTeams(data.leaderboard || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-text-primary flex items-center gap-2">
        <Code2 className="w-7 h-7 text-accent-cyan" />
        Hackathon Management
      </h1>

      {/* Teams Table */}
      <div className="rounded-xl border border-border-default overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-tertiary">
              <tr>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Rank</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Team</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Domain</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Members</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Score</th>
                <th className="px-4 py-3 text-left text-text-muted font-medium">Lab</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-bg-tertiary rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : teams.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-text-muted">No hackathon teams registered yet.</td></tr>
              ) : (
                teams.map((team) => (
                  <tr key={team.id} className="hover:bg-bg-secondary/50">
                    <td className="px-4 py-3">
                      {team.final_rank && team.final_rank <= 3 ? (
                        <Trophy className={cn('w-5 h-5', {
                          'text-yellow-400': team.final_rank === 1,
                          'text-gray-300': team.final_rank === 2,
                          'text-amber-600': team.final_rank === 3,
                        })} />
                      ) : (
                        <span className="text-text-muted">{team.final_rank || '–'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-primary font-medium">{team.team_name}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-cyan/15 text-accent-cyan">
                        {team.domain}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {team.member_names?.length || 0} members
                    </td>
                    <td className="px-4 py-3 font-heading font-bold text-accent-orange">
                      {team.scores?.total?.toFixed(1) || '–'}
                    </td>
                    <td className="px-4 py-3 text-text-muted">{team.lab_assignment || '–'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
