import { useState, useEffect } from 'react'
import { getPopularMemes, getRecentMemes } from '../clients/memes'
import type { Meme } from 'models'

import { useRoom } from '../contexts'

const getDatesFromTab = (tab: string) => {
  const now = new Date()
  const startDate = new Date(now)

  switch (tab) {
    case 'Live':
      return { startDate: null, endDate: null } // No specific date range for "Live"
    case 'Hour':
      startDate.setHours(startDate.getHours() - 1)
      return { startDate: startDate.toISOString(), endDate: now.toISOString() }
    case 'Today':
      // Adjust the start date to the user's timezone
      const userTimezoneOffset = now.getTimezoneOffset()
      startDate.setHours(0 - userTimezoneOffset / 60, 0, 0, 0)
      return { startDate: startDate.toISOString(), endDate: now.toISOString() }
    case 'Week':
      startDate.setDate(now.getDate() - 7)
      return { startDate: startDate.toISOString(), endDate: now.toISOString() }
    case 'Month':
      startDate.setMonth(now.getMonth() - 1)
      startDate.setDate(1) // Start from the beginning of the previous month
      return { startDate: startDate.toISOString(), endDate: now.toISOString() }
    default:
      return { startDate: null, endDate: null }
  }
}

type UseMemesProps = {
  selectedTab: string
}

type UseMemesReturn = {
  memes: Meme[]
  loading: boolean
  error: string | null
}

const useMemes = ({ selectedTab }: UseMemesProps): UseMemesReturn => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { room, user } = useRoom()

  useEffect(() => {
    if (!room || Object.keys(room).length === 0) {
      console.error('useMemes: Unauthorized access - no valid room.')
      return
    }

    if (!user || Object.keys(user).length === 0) {
      console.error('useMemes: Unauthorized access - no valid user.')
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        let data
        if (selectedTab === 'Live') {
          data = await getRecentMemes({ user, room, limit: 20 })
        } else {
          const { startDate, endDate } = getDatesFromTab(selectedTab)
          if (!startDate || !endDate) {
            console.error('useMemes: Invalid date range.')
            return
          }
          data = await getPopularMemes({ user, room, startDate, endDate })
        }
        setMemes(data?.popularMemes || data?.recentMemes || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      // Cleanup
    }
  }, [selectedTab, room, user])

  return { memes, loading, error }
}

export default useMemes
