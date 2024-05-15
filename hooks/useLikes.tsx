import { useState, useEffect } from 'react'
import { likeMeme, unlikeMeme } from '../clients/memes'
import type { Meme } from 'models'

const useLikes = ({
  meme,
  likerId,
}: {
  meme: Meme
  likerId: number
}): {
  liked: boolean
  like: () => void
  unlike: () => void
  likesCount: number
} => {
  const [liked, setLiked] = useState<boolean>(false)
  const [likesCount, setLikesCount] = useState(meme.likesCount) // Initial likesCount

  useEffect(() => {
    if (!meme.likers) return

    // Check if the likerId is in the likers array
    console.log('useLikes: meme.likers', meme.likers)
    console.log('useLikes: likerId', likerId)
    const hasLiked = meme.likers.some((liker) => liker.id === likerId)
    console.log('useLikes: hasLiked', hasLiked)
    setLiked(hasLiked)
    setLikesCount(meme.likesCount)
  }, [meme.likers, likerId, meme.likesCount])

  const like = async () => {
    try {
      await likeMeme({ memeId: meme.id, likerId })
      setLiked(true)
      setLikesCount(likesCount + 1) // Optimistic update for likesCount
    } catch (error) {
      console.error('useLikes: Failed to like meme', error)
    }
  }

  const unlike = async () => {
    try {
      await unlikeMeme({ memeId: meme.id, likerId })
      setLiked(false)
      setLikesCount(likesCount - 1) // Optimistic update for likesCount
    } catch (error) {
      console.error('useLikes: Failed to unlike meme', error)
    }
  }

  return { liked, like, unlike, likesCount }
}

export default useLikes
