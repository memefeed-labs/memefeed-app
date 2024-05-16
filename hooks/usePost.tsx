import { useState } from 'react'
import { postMeme } from '../clients/memes'
import type { Meme } from 'models'
import { useRoom } from '../contexts'

type UsePostProps = {
  memeImage: File | null
}

type UsePostReturn = {
  loading: boolean
  postSuccess: boolean
  postError: Error | null
  handlePost: () => Promise<void>
  meme: Meme | null
}

const usePost = ({ memeImage }: UsePostProps): UsePostReturn => {
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [postError, setPostError] = useState<Error | null>(null)
  const [meme, setMeme] = useState<Meme | null>(null)
  const { room, user } = useRoom()

  const handlePost = async () => {
    if (!memeImage || !room || !user) return

    setLoading(true)
    setPostError(null)
    setPostSuccess(false)

    try {
      const data = await postMeme({ user, room, memeImage })
      const newMeme = { ...data.meme, creator: { id: user.id, username: user.username, address: user.address } }
      setMeme(newMeme)
      setPostSuccess(true)
    } catch (error) {
      setPostError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, postSuccess, postError, handlePost, meme }
}

export default usePost
