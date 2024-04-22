import { createContext, useContext, useEffect, useState } from 'react'

import type { Room } from 'models'
import { getRoom } from '../rooms'

type RoomContextValue = {
  room: Room
  setRoom: React.Dispatch<React.SetStateAction<Room>>
}

const RoomContext = createContext<RoomContextValue | null>(null)

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<Room>({} as Room)

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        // TODO: using default roomId atm, add in auth logic
        const data = await getRoom(1)
        setRoom(data?.room || ({} as Room))
      } catch (error) {
        console.error('RoomProvider: Failed to get room', error)
      }
    }

    fetchRoom()
  }, [])

  return <RoomContext.Provider value={{ room, setRoom }}>{children}</RoomContext.Provider>
}

export const useRoom = () => useContext(RoomContext)
