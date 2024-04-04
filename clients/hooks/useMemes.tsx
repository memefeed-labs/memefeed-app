import { useState, useEffect } from 'react'

import { getPopularMemes } from '../memes'
import type { Meme, Room } from 'types'

type UseMemesProps = {
  selectedTab: string
  room: Room | undefined
}

type UseMemesReturn = {
  memes: Meme[]
  loading: boolean
  error: string | null
}

const useMemes = ({ selectedTab, room }: UseMemesProps): UseMemesReturn => {
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!room) {
      console.error('useMemes/unauthorized access: no valid room.')
      return
    }

    const fetchMemes = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getPopularMemes({
          room,
          startDate: '2021-09-01T00:00:00Z',
          endDate: '2021-09-30T23:59:59Z',
        })

        setMemes(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMemes()

    return () => {
      // Cleanup code if needed
    }
  }, [selectedTab, room])

  return { memes, loading, error }
}

export default useMemes
