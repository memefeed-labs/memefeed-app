import { useState, useEffect } from 'react'
import { likeMeme, unlikeMeme } from '../clients/memes'
import type { Meme } from 'models'

import { useRoom } from '../contexts'

type UseLikesProps = {
  meme: Meme
}

type UseLikesReturn = {
  liked: boolean
  like: () => void
  unlike: () => void
  likesCount: number
}

const useLikes = ({ meme }: UseLikesProps): UseLikesReturn => {
  const [liked, setLiked] = useState<boolean>(false)
  const [likesCount, setLikesCount] = useState(meme.likesCount) // Initial likesCount
  const { user } = useRoom()

  useEffect(() => {
    if (!meme.likers || !user) return

    // Check if the likerId is in the likers array
    const hasLiked = meme.likers.some((liker) => liker.id === Number(user.id))
    setLiked(hasLiked)
    setLikesCount(meme.likesCount)
  }, [meme.likers, user, meme.likesCount])

  const like = async () => {
    if (!user) {
      console.error('like: User is not authenticated.')
      return
    }

    try {
      await likeMeme({ memeId: meme.id, likerId: user.id })
      setLiked(true)
      setLikesCount(likesCount + 1) // Optimistic update for likesCount
    } catch (error) {
      console.error('useLikes: Failed to like meme', error)
    }
  }

  const unlike = async () => {
    if (!user) {
      console.error('unlike: User is not authenticated.')
      return
    }

    try {
      await unlikeMeme({ memeId: meme.id, likerId: user.id })
      setLiked(false)
      setLikesCount(likesCount - 1) // Optimistic update for likesCount
    } catch (error) {
      console.error('useLikes: Failed to unlike meme', error)
    }
  }

  return { liked, like, unlike, likesCount }
}

export default useLikes
