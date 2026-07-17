'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchParkingLogs, ParkingLogEntry } from '../lib/parking-api'

export function useParkingLogs() {
  const [logs, setLogs] = useState<ParkingLogEntry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async (page = 1, limit = 50) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchParkingLogs(page, limit)
      setLogs(data.data)
      setTotal(data.total)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { logs, total, loading, error, refresh }
}
