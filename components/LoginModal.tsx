import React, { useState, useEffect } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useEnsName, useSignMessage } from 'wagmi'
import { useRouter } from 'next/router'

import styles from '../styles'
import { useAuth, useRoom } from 'contexts'
import { useUser } from 'hooks'
import { createUser } from 'clients/users'
import { getRoom, loginRoom } from 'clients/rooms'
import { User } from 'models'

const LoginModal = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address: address })
  const { user: fetchedUser, loading: fetchingUserLoading, error: fetchingUserError } = useUser(address)
  const [user, setUser] = useState<User | null>(null)
  const [userCreationError, setUserCreationError] = useState<string | null>(null)
  const [roomJoiningError, setRoomJoiningError] = useState<string | null>(null)
  const [roomName, setRoomName] = useState('')
  const [roomPassword, setRoomPassword] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [displayUsername, setDisplayUsername] = useState('')
  const { signMessageAsync } = useSignMessage()
  const router = useRouter()
  const { login } = useAuth()
  const { setRoom: setRoomContext, setUser: setUserContext } = useRoom()

  // Redirect to home if user is already logged in
  useEffect(() => {
    // Check for a valid session token and corresponding wallet address
    const sessionToken = localStorage.getItem('session_token')
    const storedAddress = localStorage.getItem('session_wallet_address')

    if (sessionToken && storedAddress === address) {
      login()
      router.push('/')
    }
  }, [login, router, address])

  const openWeb3Modal = () => {
    open()
  }

  const showUserID = () => {
    if (!address) {
      throw new Error('No address found when trying to show user ID')
    }

    if (ensName) {
      return ensName
    }

    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Set user if fetched user is available
  useEffect(() => {
    if (fetchedUser && fetchedUser.username) {
      setUser(fetchedUser)
    }
  }, [fetchedUser])

  // show username for room joining UI
  useEffect(() => {
    if (user && user.username) {
      if (user.username.length > 15) {
        setDisplayUsername(`@${user.username.substring(0, 15)}...`)
      } else {
        setDisplayUsername(`@${user.username}`)
      }
    }
  }, [user])

  const createAccount = async (e: React.FormEvent) => {
    // Prevent form submission & reload
    e.preventDefault()

    if (!usernameInput || !address) return

    try {
      const newUserResponse = await createUser(address, usernameInput, signMessageAsync)
      setUser(newUserResponse.user)
      setUserCreationError(null) // Clear any previous errors
    } catch (error) {
      console.error('Error creating account:', error)
      setUserCreationError('Error creating account. Try again.')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    // Prevent form submission & reload
    e.preventDefault()

    try {
      const roomResponse = await getRoom(undefined, roomName)
      const roomId = roomResponse.room.id

      const loginResponse = await loginRoom(roomId, roomPassword, address, signMessageAsync)
      console.debug('Logged in:', loginResponse)

      localStorage.setItem('session_token', loginResponse.sessionToken)
      localStorage.setItem('session_wallet_address', address as string)

      // Set context for logged in room / user
      setRoomContext(roomResponse.room)
      setUserContext(user as User)

      login()
      setRoomJoiningError(null) // Clear any previous errors

      router.push(`/`)
    } catch (error) {
      console.error('Error logging into room:', error)
      setRoomJoiningError('Error logging into room. Try again.')
    }
  }

  // Ensure consistent initial rendering (server / client next.js)
  if (typeof window === 'undefined' || fetchingUserLoading) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg" style={{ width: '320px' }}>
          <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-t-lg">
            <span>Log on to Memefeed</span>
          </div>
          <div className="flex justify-center p-8">
            <img src="/logos/baby-phoenix-logo.png" alt="Memefeed Logo" className="w-[54px] sm:w-[66px] md:w-[72px]" />
          </div>
          <div className="flex justify-center pb-8">
            <div>Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg" style={{ width: '320px' }}>
        {/* Title Bar */}
        <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-t-lg">
          <span>Log on to Memefeed</span>
        </div>

        {/* Modal Content */}
        <div className="bg-white p-8 rounded-b-lg shadow-lg">
          <div className="flex justify-center mb-4">
            <img src="/logos/baby-phoenix-logo.png" alt="Memefeed Logo" className="w-[54px] sm:w-[66px] md:w-[72px]" />
          </div>

          {!isConnected ? (
            // Show Connect Wallet button if no wallet is connected
            <div className="flex justify-center mb-4">
              <button className={`${styles.button} accent-button`} onClick={openWeb3Modal}>
                Connect Wallet
              </button>
            </div>
          ) : (
            <>
              {fetchingUserLoading ? (
                <div>Loading...</div>
              ) : fetchingUserError ? (
                <div>Error: {fetchingUserError}</div>
              ) : user ? (
                // Show room name and password inputs if wallet is connected and username is set
                <>
                  <div className="flex justify-center mb-4">
                    <button className={`${styles.smallButton} small-accent-button`} onClick={openWeb3Modal}>
                      {showUserID()}
                    </button>
                  </div>
                  <div className="flex justify-center mb-4">{displayUsername}</div>
                  <form onSubmit={handleLogin}>
                    <input
                      type="text"
                      placeholder="Room Name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                    />
                    <input
                      type="password"
                      placeholder="Room Password"
                      value={roomPassword}
                      onChange={(e) => setRoomPassword(e.target.value)}
                      className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                    />
                    {roomJoiningError && (
                      <div className="text-sm text-red-500 text-center mb-4">{roomJoiningError}</div>
                    )}
                    <div className="flex justify-center">
                      <button type="submit" className={`${styles.button} accent-button`}>
                        Join
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                // Show Username input if no username is set
                <form onSubmit={createAccount} className="flex flex-col mb-4">
                  <div className="flex justify-center mb-4">
                    <button className={`${styles.smallButton} small-accent-button`} onClick={openWeb3Modal}>
                      {showUserID()}
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                  />
                  {userCreationError && (
                    <div className="text-sm text-red-500 text-center mb-4">{userCreationError}</div>
                  )}
                  <div className="flex justify-center">
                    <button type="submit" className={`${styles.button} accent-button`}>
                      Create Account
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginModal
