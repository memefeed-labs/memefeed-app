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
} => {
  const [liked, setLiked] = useState<boolean>(false)

  useEffect(() => {
    if (!meme.likers) return

    if (meme.likers.includes(likerAddress)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [meme, likerAddress])

  const like = async () => {
    try {
      await likeMeme({ memeId: meme.id, likerAddress })
      setLiked(true)
    } catch (error) {
      console.error('useLikes: Failed to like meme', error)
    }
  }

  const unlike = async () => {
    try {
      await unlikeMeme({ memeId: meme.id, likerAddress })
      setLiked(false)
    } catch (error) {
      console.error('useLikes: Failed to unlike meme', error)
    }
  }

  return { liked, like, unlike }
}

export default useLikes
