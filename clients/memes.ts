import type { Room, User } from 'models'

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100'

type PostMemeProps = {
  user: User
  room: Room
  memeImage: File
}

const postMeme = async ({ user, room, memeImage }: PostMemeProps) => {
  const sessionToken = localStorage.getItem('session_token');

  const formData = new FormData();
  formData.append('roomId', room.id.toString());
  formData.append('creatorId', user.id.toString());
  formData.append('memeImage', memeImage);

  const response = await fetch(`${BASE_URL}/v1/meme`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sessionToken}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to post meme');
  }
  return response.json();
};

type GetPopularMemesProps = {
  user: User
  room: Room
  startDate: string // ISO 8601 date string
  endDate: string // ISO 8601 date string
  limit?: number
}

const getPopularMemes = async ({ user, room, startDate, endDate, limit = 20 }: GetPopularMemesProps) => {
  const sessionToken = localStorage.getItem('session_token');

  const response = await fetch(
    `${BASE_URL}/v1/memes/popular?roomId=${room.id}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&userId=${user.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      }
    }
  );
  if (!response.ok) {
    throw new Error('Failed to get popular memes');
  }
  return response.json();
};

type GetRecentMemesProps = {
  user: User
  room: Room
  limit?: number
}

const getRecentMemes = async ({ user, room, limit = 20 }: GetRecentMemesProps) => {
  const sessionToken = localStorage.getItem('session_token');

  const response = await fetch(
    `${BASE_URL}/v1/memes/recent?roomId=${room.id}&limit=${limit}&userId=${user.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      }
    }
  );
  if (!response.ok) {
    throw new Error('Failed to get recent memes');
  }
  return response.json();
};

type LikeMemeProps = {
  memeId: number,
  likerId: number
}

const likeMeme = async ({ memeId, likerId }: LikeMemeProps) => {
  const sessionToken = localStorage.getItem('session_token');

  const response = await fetch(`${BASE_URL}/v1/meme/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`
    },
    body: JSON.stringify({ memeId, likerId })
  });

  if (!response.ok) {
    throw new Error('Failed to like meme');
  }
};


const unlikeMeme = async ({ memeId, likerId }: LikeMemeProps) => {
  const sessionToken = localStorage.getItem('session_token');

  const response = await fetch(`${BASE_URL}/v1/meme/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`
    },
    body: JSON.stringify({ memeId, likerId })
  });

  if (!response.ok) {
    throw new Error('Failed to unlike meme');
  }
};

export { getPopularMemes, getRecentMemes, likeMeme, unlikeMeme, postMeme }
