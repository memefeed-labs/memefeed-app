import { useState, useEffect } from 'react'
import { getUser } from '../clients/users'
import type { User } from 'models'

const useUser = (address: `0x${string}` | undefined) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (!address) {
        setUser(null)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const fetchedUserResult = await getUser(address)
        if (fetchedUserResult) {
          setUser(fetchedUserResult.user)
        } else {
          setUser(null) // No user found
        }
      } catch (err) {
        setError('Failed to fetch user')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [address])

  return { user, loading, error }
}

export default useUser
