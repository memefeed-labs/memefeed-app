import type { Room } from 'models'

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100'

type GetPopularMemesProps = {
  room: Room
  startDate: string // ISO 8601 date string
  endDate: string // ISO 8601 date string
  limit?: number
}

const getPopularMemes = async ({ room, startDate, endDate, limit = 20 }: GetPopularMemesProps) => {
  // TODO: userAddress logic needs to be implemented, using a placeholder for now
  const response = await fetch(
    `${BASE_URL}/v1/memes/popular?roomId=${room.id}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&userAddress=${room.creatorAddress}`
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
  // TODO: userAddress logic needs to be implemented, using a placeholder for now
  const response = await fetch(`${BASE_URL}/v1/memes/recent?roomId=${room.id}&limit=${limit}&userAddress=${room.creatorAddress}`)
  if (!response.ok) {
    throw new Error('Failed to get recent memes')
  }
  return response.json()
}

type LikeMemeProps = {
  memeId: number,
  likerAddress: string
}

const likeMeme = async ({ memeId, likerAddress }: LikeMemeProps) => {
  const response = await fetch(`${BASE_URL}/v1/meme/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memeId, likerAddress })
  })

  if (!response.ok) {
    throw new Error('Failed to like meme')
  }
}

const unlikeMeme = async ({ memeId, likerAddress }: LikeMemeProps) => {
  const response = await fetch(`${BASE_URL}/v1/meme/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memeId, likerAddress })
  })

  if (!response.ok) {
    throw new Error('Failed to unlike meme')
  }
}

export { getPopularMemes, getRecentMemes, likeMeme, unlikeMeme }
