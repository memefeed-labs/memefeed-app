const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100'

const getRoom = async (roomId?: number, name?: string) => {
  if (!roomId && !name) {
    throw new Error('Room ID or name must be provided');
  }

  // Construct the query string based on provided parameters
  let queryString = `${BASE_URL}/v1/room?`;
  if (roomId) {
    queryString += `roomId=${roomId}`;
  }
  if (name) {
    queryString += `${roomId ? '&' : ''}name=${name}`;
  }

  const response = await fetch(queryString);
  if (!response.ok) {
    throw new Error('Failed to get room');
  }
  return response.json();
};


type SignMessageAsync = (args: { message: string }) => Promise<string>;
const loginRoom = async (roomId: number, password: string, address: `0x${string}` | undefined, signMessageAsync: SignMessageAsync) => {
  if (!address) {
    throw new Error('No address found when trying to login to room')
  }

  try {
    // Generate a signature
    const message = `Login to room with id: ${roomId} and address: ${address}`;
    const signature = await signMessageAsync({ message });

    const response = await fetch(`${BASE_URL}/v1/room/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId,
        password,
        address,
        signature,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to login to room');
    }

    return response.json();
  } catch (error) {
    console.error('Error logging in to room:', error);
    throw error;
  }
}

export { getRoom, loginRoom }
