import { useState, useEffect } from 'react'
import styles from '../styles'
import { tabs } from '../utils/constants'
import type { Meme } from 'models'
import { MemeCard, FeedToolbar, PostModal } from '../components'
import { useMemes, useRoom } from '../clients/hooks'
import socket from '../clients/socketIO'

// Section used in feed page
const Feed = () => {
  const [selectedTab, setSelectedTab] = useState('Today')
  const { room } = useRoom() ?? {}
  const [memes, setMemes] = useState<Meme[]>([])
  const { memes: fetchedMemes, loading, error } = useMemes({ selectedTab, room })

  console.debug(
    'Rendered Feed: selectedTab: ',
    selectedTab,
    'room:',
    room,
    'memes:',
    memes,
    'fetchedMemes:',
    fetchedMemes
  )

  // Update memes queue with single new meme
  const updateMemesQueue = (newMeme: Meme) => {
    setMemes((prevMemes) => {
      console.debug('New meme:', newMeme)
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
    setMemes(fetchedMemes)
  }, [fetchedMemes])

  // Listen for new memes in real-time (live only)
  useEffect(() => {
    if (selectedTab === 'Live') {
      console.log('Listening for new memes...')
      socket.on('new_meme', (meme) => {
        updateMemesQueue(meme)
      })
    }

    return () => {
      socket.off('new_meme')
    }
  }, [selectedTab])

  // Handle post button & modal
  const handlePostButtonClick = () => {
    openModal()
  }

  const [isPostModalOpen, setPostModalOpen] = useState(false)
  const openModal = () => {
    setPostModalOpen(true)
  }

  const closeModal = () => {
    setPostModalOpen(false)
  }

  // Change selected tab
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <section className={`${styles.yPaddingsBottom} ${styles.xPaddings} flex-grow relative `} id="feed">
      <div className={`${styles.innerWidth} flex flex-col items-center overflow-hidden`}>
        <div className="flex flex-col md:flex-row w-5/5 md:w-4/5 lg:w-3/5 gap-2 justify-between items-center">
          <FeedToolbar tabs={tabs} selectedTab={selectedTab} handleTabClick={handleTabClick} />
          <button
            className={`${styles.button} accent-button order-first md:order-last`}
            onClick={handlePostButtonClick}
          >
            Post
          </button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        <div className="meme-container flex flex-col gap-8 mt-8 w-5/5 md:w-4/5 lg:w-3/5 pb-1">
          {memes.map((meme, index) => (
            <MemeCard key={index} {...meme} />
          ))}
        </div>
        {isPostModalOpen && <PostModal isOpen={isPostModalOpen} onClose={closeModal} room={room} />}
      </div>
    </section>
  )
}

export default Feed
