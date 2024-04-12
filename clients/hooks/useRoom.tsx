import { createContext, useState, useEffect, useContext } from 'react'

import { getRoom } from '../rooms'
import type { Room } from 'models'

const sampleRoom: Room = {
  id: 1,
  name: 'X',
  logoUrl: '/x.webp',
  description: 'Rise from the ashes',
  creatorAddress: 'Gaurang',
  type: 'public',
  createdAt: '2021-09-01T00:00:00Z',
  updatedAt: '2021-09-01T00:00:00Z',
}

type RoomContextValue = {
  room: Room
  setRoom: React.Dispatch<React.SetStateAction<Room>>
}

const RoomContext = createContext<RoomContextValue | null>(null)

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<Room>(sampleRoom)

  useEffect(() => {
    // const fetchRoom = async () => {
    //   try {
    //     const room: Room = await getRoom()
    //     setRoom(room);
    //   } catch (error) {
    //     console.error('Error fetching room details:', error)
    //   }
    // }

    // fetchRoom()

    // Cleanup tasks, if any
    return () => {}
  }, [])

  return <RoomContext.Provider value={{ room, setRoom }}>{children}</RoomContext.Provider>
}

export const useRoom = () => useContext(RoomContext)
