import { useState } from 'react'
import { Meme } from 'models'

// Convert ISO date to human readable format, i.e. "2 days ago", "3 months ago", "4 minutes ago"
function getTimeAgoFromISODate(createdAt: string): string {
  const date = new Date(createdAt)
  const now = new Date()
  const seconds: number = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = [
    { unit: 'year', duration: 31536000 },
    { unit: 'month', duration: 2592000 },
    { unit: 'day', duration: 86400 },
    { unit: 'hour', duration: 3600 },
    { unit: 'minute', duration: 60 },
    { unit: 'second', duration: 1 },
  ]

  for (const { unit, duration } of intervals) {
    const interval = Math.floor(seconds / duration)
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`
    }
  }

  return 'just now' // Default value if date is too recent to calculate interval
}

const MemeCard: React.FC<Meme> = (meme) => {
  const [liked, setLiked] = useState(false)

  const handleLikeClick = () => {
    setLiked(!liked)
  }

  const username = meme.creatorAddress
  const timeAgo = getTimeAgoFromISODate(meme.createdAt)

  return (
    <div className="meme-card rounded-lg overflow-hidden bg-white shadow-md pb-2">
      <img
        src={meme.url}
        alt="Meme"
        className="meme-image w-full object-cover cursor-pointer"
        onDoubleClick={handleLikeClick}
      />
      <div className="meme-icons flex items-center justify-between">
        <div className="meme-likes-row flex items-center pt-2 px-2 pb-1 gap-2">
          <button onClick={handleLikeClick} className={`like-button w-6 h-6`}>
            {liked ? <img src="/icons/heart-solid.svg" alt="Loved" /> : <img src="/icons/heart-thin.svg" alt="Love" />}
          </button>
          <div className="meme-likes text-gray-500">{meme.likesCount} loves</div>
        </div>
        <div className="meme-time text-gray-400 text-sm px-2">{timeAgo}</div>
      </div>
      <div className="meme-user text-gray-600 pt-1 px-2">@{username}</div>
    </div>
  )
}

export default MemeCard
