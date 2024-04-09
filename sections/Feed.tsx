import { useState, useEffect } from 'react'
import Link from 'next/link'

import styles from '../styles'
import { tabs } from '../utils/constants'
import type { Meme } from 'models'
import { MemeCard, FeedToolbar } from '../components'
import { useMemes, useRoom } from '../clients/hooks'
import socket from '../clients/socketIO'

// Section used in feed page
const Feed = () => {
  const [selectedTab, setSelectedTab] = useState('Today')
  const { room } = useRoom() ?? {}
  const [memes, setMemes] = useState<Meme[]>([])
  const { memes: fetchedMemes, loading, error } = useMemes({ selectedTab, room })

  const updateMemesQueue = (newMeme: Meme) => {
    setMemes((prevMemes) => {
      console.log('New meme:', newMeme)
      // TODO: Implement a max limit for memes (this conflicts with fetching memes that are larger)
      const maxMemes = 100
      if (prevMemes.length >= maxMemes) {
        prevMemes.pop()
      }

      return [newMeme, ...prevMemes]
    })
  }

  // Update memes when new memes are fetched
  useEffect(() => {
    if (fetchedMemes) {
      setMemes(fetchedMemes)
    }
  }, [fetchedMemes])

  // Listen for new memes in real-time (live only)
  useEffect(() => {
    if (selectedTab !== 'Live') return

    console.log('Listening for new memes...')
    socket.on('new_meme', (meme) => {
      updateMemesQueue(meme)
    })

    return () => {
      socket.off('new_meme')
    }
  }, [selectedTab])

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <section className={`${styles.yPaddingsBottom} ${styles.xPaddings} relative z-10`} id="feed">
      <div className={`${styles.innerWidth} flex flex-col items-center overflow-hidden`}>
        <div className="flex flex-col md:flex-row w-5/5 md:w-4/5 lg:w-3/5 gap-2 justify-between items-center">
          <FeedToolbar tabs={tabs} selectedTab={selectedTab} handleTabClick={handleTabClick} />
          <Link href="/post" className={`${styles.button} accent-button order-first md:order-last`}>
            Post
          </Link>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        <div className="meme-container flex flex-col gap-8 mt-8 w-5/5 md:w-4/5 lg:w-3/5 pb-1">
          {memes.map((meme, index) => (
            <MemeCard key={index} {...meme} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feed
