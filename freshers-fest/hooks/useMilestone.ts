'use client'

import { useState, useEffect, useCallback } from 'react'
import type { MilestoneData } from '@/types'
import { getMilestonePrice } from '@/lib/utils'

export function useMilestone(initialCount: number = 0) {
  const [externalCount, setExternalCount] = useState(initialCount)
  const [milestone, setMilestone] = useState<MilestoneData>(() => {
    const { price, tier, nextThreshold } = getMilestonePrice(initialCount)
    return {
      external_count: initialCount,
      svce_price: price,
      tier,
      next_threshold: nextThreshold,
    }
  })

  const updateMilestone = useCallback((count: number) => {
    const { price, tier, nextThreshold } = getMilestonePrice(count)
    setExternalCount(count)
    setMilestone({
      external_count: count,
      svce_price: price,
      tier,
      next_threshold: nextThreshold,
    })
  }, [])

  // Poll milestone data every 30 seconds
  useEffect(() => {
    const fetchMilestone = async () => {
      try {
        const res = await fetch('/api/milestone')
        if (res.ok) {
          const data = await res.json()
          updateMilestone(data.external_count ?? 0)
        }
      } catch {
        // Silently fail — will retry on next interval
      }
    }

    fetchMilestone()
    const interval = setInterval(fetchMilestone, 30000)
    return () => clearInterval(interval)
  }, [updateMilestone])

  return { externalCount, milestone, updateMilestone }
}
