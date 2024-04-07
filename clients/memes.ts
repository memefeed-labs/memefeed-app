import type { Room } from 'models'

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100'

type GetMemesProps = {
  room: Room
  startDate: string // ISO 8601 date string
  endDate: string // ISO 8601 date string
  limit?: number
}

const getPopularMemes = async ({ room, startDate, endDate, limit = 20 }: GetMemesProps) => {
  const response = await fetch(
    `${BASE_URL}/v1/memes/popular?roomId=${room.id}&startDate=${startDate}&endDate=${endDate}&limit=${limit}`
  )
  if (!response.ok) {
    throw new Error('Failed to get popular memes')
  }
  return response.json()
}

export { getPopularMemes }
