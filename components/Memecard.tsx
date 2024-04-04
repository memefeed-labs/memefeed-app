import { useState } from 'react'

interface MemeCardProps {
  imageUrl: string
  username: string
  likes: number
  timeAgo: string
}

const MemeCard: React.FC<MemeCardProps> = ({ imageUrl, username, likes, timeAgo }) => {
  const [liked, setLiked] = useState(false)

  const handleLikeClick = () => {
    setLiked(!liked)
  }

  return (
    <div className="meme-card rounded-lg overflow-hidden bg-white shadow-md pb-2">
      <img
        src={imageUrl}
        alt="Meme"
        className="meme-image w-full object-cover cursor-pointer"
        onDoubleClick={handleLikeClick}
      />
      <div className="meme-icons flex items-center justify-between">
        <div className="meme-likes-row flex items-center pt-2 px-2 pb-1 gap-2">
          <button onClick={handleLikeClick} className={`like-button w-6 h-6`}>
            {liked ? <img src="/icons/heart-solid.svg" alt="Loved" /> : <img src="/icons/heart-thin.svg" alt="Love" />}
          </button>
          <div className="meme-likes text-gray-500">{likes} loves</div>
        </div>
        <div className="meme-time text-gray-400 text-sm px-2">{timeAgo}</div>
      </div>
      <div className="meme-user text-gray-600 pt-1 px-2">@{username}</div>
    </div>
  )
}

export default MemeCard
