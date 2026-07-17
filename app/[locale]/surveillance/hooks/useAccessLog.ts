'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  fetchRecentActivity,
  fetchTodayStats,
  AccessLogEntry,
  AccessStatsToday,
} from '../lib/parking-api'

const DEFAULT_STATS: AccessStatsToday = {
  detected_today: 0,
  residents: 0,
  visitors: 0,
  staff: 0,
  blacklist_hits: 0,
  unknown: 0,
}

export function useAccessLog() {
  const [activity, setActivity] = useState<AccessLogEntry[]>([])
  const [stats, setStats] = useState<AccessStatsToday>(DEFAULT_STATS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [logs, todayStats] = await Promise.all([
        fetchRecentActivity(50),
        fetchTodayStats(),
      ])
      setActivity(logs)
      setStats(todayStats)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { activity, stats, loading, error, refresh }
}
