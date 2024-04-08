import type { Room } from 'models'

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100'

type GetPopularMemesProps = {
  room: Room
  startDate: string // ISO 8601 date string
  endDate: string // ISO 8601 date string
  limit?: number
}

const getPopularMemes = async ({ room, startDate, endDate, limit = 20 }: GetPopularMemesProps) => {
  const response = await fetch(
    `${BASE_URL}/v1/memes/popular?roomId=${room.id}&startDate=${startDate}&endDate=${endDate}&limit=${limit}`
  )
  if (!response.ok) {
    throw new Error('Failed to get popular memes')
  }
  return response.json()
}

type GetRecentMemesProps = {
  room: Room
  limit?: number
}

const getRecentMemes = async ({ room, limit = 20 }: GetRecentMemesProps) => {
  const response = await fetch(`${BASE_URL}/v1/memes/recent?roomId=${room.id}&limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to get recent memes')
  }
  return response.json()
}

export { getPopularMemes, getRecentMemes }
