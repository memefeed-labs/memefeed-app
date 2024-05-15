import type { Room } from 'models'

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100'

type PostMemeProps = {
  room: Room
  memeImage: File
}

const postMeme = async ({ room, memeImage }: PostMemeProps) => {
  const formData = new FormData()
  formData.append('roomId', room.id.toString())
  // TODO: userAddress logic needs to be implemented, using a placeholder for now
  formData.append('creatorId', '8')
  formData.append('memeImage', memeImage)

  const response = await fetch(`${BASE_URL}/v1/meme`, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Failed to post meme')
  }
  return response.json()
}

type GetPopularMemesProps = {
  room: Room
  startDate: string // ISO 8601 date string
  endDate: string // ISO 8601 date string
  limit?: number
}

const getPopularMemes = async ({ room, startDate, endDate, limit = 20 }: GetPopularMemesProps) => {
  // TODO: userAddress logic needs to be implemented, using a placeholder for now
  const response = await fetch(
    `${BASE_URL}/v1/memes/popular?roomId=${room.id}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&userId=8`
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
  const response = await fetch(`${BASE_URL}/v1/memes/recent?roomId=${room.id}&limit=${limit}&userId=8`)
  if (!response.ok) {
    throw new Error('Failed to get recent memes')
  }
  return response.json()
}

type LikeMemeProps = {
  memeId: number,
  likerId: number
}

const likeMeme = async ({ memeId, likerId }: LikeMemeProps) => {
  const response = await fetch(`${BASE_URL}/v1/meme/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memeId, likerId })
  })

  if (!response.ok) {
    throw new Error('Failed to like meme')
  }
}

const unlikeMeme = async ({ memeId, likerId }: LikeMemeProps) => {
  const response = await fetch(`${BASE_URL}/v1/meme/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memeId, likerId })
  })

  if (!response.ok) {
    throw new Error('Failed to unlike meme')
  }
}

export { getPopularMemes, getRecentMemes, likeMeme, unlikeMeme, postMeme }
