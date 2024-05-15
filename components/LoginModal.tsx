import React, { useState } from 'react'
import styles from '../styles'
// import { useAuth } from '../clients/hooks';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useEnsName } from 'wagmi'

const LoginModal = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address: address })
  const [username, setUsername] = useState('')
  const [roomName, setRoomName] = useState('')
  const [roomPassword, setRoomPassword] = useState('')
  const [usernameInput, setUsernameInput] = useState('')

  const openWeb3Modal = () => {
    open()
  }

  const showUserID = () => {
    if (ensName) {
      return ensName
    }

    if (!address) {
      throw new Error('No address found when trying to show user ID')
    }

    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Example function to simulate setting a username
  const setUsernameAndProceed = () => {
    if (usernameInput) {
      setUsername('@' + usernameInput)
    }
  }

  // Example function to simulate joining a room
  const joinRoom = () => {
    // Here, implement the actual room joining logic
    console.log('Joining room:', roomName, roomPassword)
  }

  // Handle Enter key press for the Create Account button
  const handleUsernameKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setUsernameAndProceed()
    }
  }

  // Handle Enter key press for the Join button
  const handleJoinKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      joinRoom()
    }
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
              {/* <w3m-button balance="hide" /> */}
              <button className={`${styles.button} accent-button`} onClick={openWeb3Modal}>
                Connect Wallet
              </button>
            </div>
          ) : (
            <>
              {!username ? (
                // Show Username input if no username is set
                <div className="flex flex-col mb-4">
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
                    onKeyPress={handleUsernameKeyPress}
                    className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                  />
                  <div className="flex justify-center">
                    <button className={`${styles.button} accent-button`} onClick={setUsernameAndProceed}>
                      Create Account
                    </button>
                  </div>
                </div>
              ) : (
                // Show room name and password inputs if wallet is connected and username is set
                <>
                  <div className="flex justify-center mb-4">
                    <button className={`${styles.button} accent-button`}>{username}</button>
                  </div>
                  <input
                    type="text"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    onKeyPress={handleJoinKeyPress}
                    className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                  />
                  <input
                    type="password"
                    placeholder="Room Password"
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                    onKeyPress={handleJoinKeyPress}
                    className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                  />
                  <div className="flex justify-center">
                    <button className={`${styles.button} accent-button`} onClick={joinRoom}>
                      Join
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginModal
