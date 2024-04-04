const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3001'

const getRoom = async () => {
  const response = await fetch(`${BASE_URL}/room`)
  if (!response.ok) {
    throw new Error('Failed to get room information')
  }
  return response.json()
}

export { getRoom }
