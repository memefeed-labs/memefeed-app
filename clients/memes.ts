import type { Room } from 'types'

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3001'

type GetMemesProps = {
  room: Room
  startDate: string // ISO 8601 date string
  endDate: string // ISO 8601 date string
  limit?: number
}

const getPopularMemes = async ({ room, startDate, endDate, limit = 20 }: GetMemesProps) => {
  const response = await fetch(
    `${BASE_URL}/v1/memes/popular?room=${room.id}&startDate=${startDate}&endDate=${endDate}&limit=${limit}`
  )

  console.debug('getPopularMemes/response', response)

  if (!response.ok) {
    throw new Error('Failed to get popular memes')
  }
  return response.json()
}

export { getPopularMemes }
