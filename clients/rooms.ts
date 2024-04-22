const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100'

const getRoom = async (roomId: number, name?: string) => {
  // one of them must be present
  if (!roomId && !name) {
    throw new Error('Room ID or name must be provided')
  }

  const response = await fetch(`${BASE_URL}/v1/room?roomId=${roomId}&name=${name}`)
  if (!response.ok) {
    throw new Error('Failed to get room')
  }
  return response.json()
}

export { getRoom }
