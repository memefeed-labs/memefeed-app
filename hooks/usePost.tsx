import { useState } from 'react'
import { postMeme } from '../clients/memes'
import type { Meme, Room } from 'models'

type UsePostProps = {
  room: Room | undefined
  memeImage: File | null
}

type UsePostReturn = {
  loading: boolean
  postSuccess: boolean
  postError: Error | null
  handlePost: () => Promise<void>
  meme: Meme | null
}

const usePost = ({ room, memeImage }: UsePostProps): UsePostReturn => {
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [postError, setPostError] = useState<Error | null>(null)
  const [meme, setMeme] = useState<Meme | null>(null)

  const handlePost = async () => {
    if (!memeImage || !room) return

    setLoading(true)
    setPostError(null)
    setPostSuccess(false)

    try {
      const data = await postMeme({ room, memeImage })
      setMeme(data?.meme || null)
      setPostSuccess(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setPostError(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, postSuccess, postError, handlePost, meme }
}

export default usePost
