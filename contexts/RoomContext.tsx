import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Room, User } from 'models'

interface RoomContextType {
  room: Room | null
  user: User | null
  setRoom: (room: Room) => void
  setUser: (user: User) => void
}

const RoomContext = createContext<RoomContextType | undefined>(undefined)

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [room, setRoomState] = useState<Room | null>(null)
  const [user, setUserState] = useState<User | null>(null)

  useEffect(() => {
    // Load room and user from local storage if available
    const savedRoom = localStorage.getItem('room')
    const savedUser = localStorage.getItem('user')

    if (savedRoom) {
      setRoomState(JSON.parse(savedRoom))
    }

    if (savedUser) {
      setUserState(JSON.parse(savedUser))
    }
  }, [])

  const setRoom = (room: Room) => {
    setRoomState(room)
    localStorage.setItem('room', JSON.stringify(room))
  }

  const setUser = (user: User) => {
    setUserState(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  return <RoomContext.Provider value={{ room, user, setRoom, setUser }}>{children}</RoomContext.Provider>
}

export const useRoom = () => {
  const context = useContext(RoomContext)
  if (!context) throw new Error('useRoom must be used within a RoomProvider')
  return context
}
