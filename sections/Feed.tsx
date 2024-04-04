import styles from '../styles'
import { useState } from 'react'
import Link from 'next/link'

import { MemeCard, FeedToolbar } from '../components'
import { useMemes, useRoom } from '../clients/hooks'

// sample meme cards
const sampleMemes = [
  { imageUrl: '/memes/success_kid.jpeg', username: 'gaurang', likes: 10, timeAgo: '1 hour ago' },
  { imageUrl: '/memes/success_kid.jpeg', username: 'avni', likes: 20, timeAgo: '2 hours ago' },
  { imageUrl: '/memes/success_kid.jpeg', username: 'garfield', likes: 30, timeAgo: '3 hours ago' },
  { imageUrl: '/memes/success_kid.jpeg', username: 'hammie', likes: 40, timeAgo: '4 hours ago' },
]

// Section used in feed page
const Feed = () => {
  const [selectedTab, setSelectedTab] = useState('Today')
  const { room } = useRoom() ?? {}
  const { memes, loading, error } = useMemes({ selectedTab, room })

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <section className={`${styles.yPaddingsBottom} ${styles.xPaddings} relative z-10`} id="feed">
      <div className={`${styles.innerWidth} flex flex-col items-center overflow-hidden`}>
        <div className="flex flex-col gap-2 justify-between items-center w-full">
          <Link href="/post" className={`${styles.button} accent-button`}>
            Post
          </Link>
          <FeedToolbar selectedTab={selectedTab} handleTabClick={handleTabClick} />
        </div>

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        <div className="meme-container flex flex-col gap-8 mt-8 w-4/5 md:w-3/5 lg:w-2/5 pb-1">
          {memes.map((meme, index) => (
            <MemeCard key={index} {...meme} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feed
