import { useState, useEffect } from 'react'
import { likeMeme, unlikeMeme } from '../memes'
import type { Meme } from 'models'

const useLikes = ({
  meme,
  likerAddress,
}: {
  meme: Meme
  likerAddress: string
}): {
  liked: boolean
  like: () => void
  unlike: () => void
  likesCount: number
} => {
  const [liked, setLiked] = useState<boolean>(false)
  const [likesCount, setLikesCount] = useState(meme.likesCount) // Initial likesCount

  // Update liked based on initial likers
  useEffect(() => {
    if (!meme.likers) return

    setLiked(meme.likers.includes(likerAddress))
    setLikesCount(meme.likesCount)
  }, [meme.likers, likerAddress, meme.likesCount])

  const like = async () => {
    try {
      await likeMeme({ memeId: meme.id, likerAddress })
      setLiked(true)
      setLikesCount(likesCount + 1) // Optimistic update for likesCount
    } catch (error) {
      console.error('useLikes: Failed to like meme', error)
    }
  }

  const unlike = async () => {
    try {
      await unlikeMeme({ memeId: meme.id, likerAddress })
      setLiked(false)
      setLikesCount(likesCount - 1) // Optimistic update for likesCount
    } catch (error) {
      console.error('useLikes: Failed to unlike meme', error)
    }
  }

  return { liked, like, unlike, likesCount }
}

export default useLikes
