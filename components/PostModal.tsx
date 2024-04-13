import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles'

import { usePost } from '../clients/hooks'
import type { Room } from 'models'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  room: Room | undefined
}

const PostModal = ({ isOpen, onClose, room }: ModalProps) => {
  const [shouldRender, setShouldRender] = useState(false)
  const [selectedMemeImage, setSelectedMemeImage] = useState<File | null>(null)
  const { loading, postSuccess, postError, isPostDisabled, handlePost } = usePost({
    room,
    memeImage: selectedMemeImage,
  })

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    } else {
      setTimeout(() => setShouldRender(false), 100)
    }
  }, [isOpen])

  const handleClickOutside = () => {
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setSelectedMemeImage(file)
    }
  }

  // Handle drag and drop for images
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedMemeImage(file)
    }
  }

  if (!shouldRender) return null

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" onClick={handleClickOutside}>
      <div className={`${styles.innerWidth} flex flex-col justify-center items-center h-full`}>
        <div
          className="flex flex-col bg-white w-4/5 md:w-3/5 lg:w-2/5 rounded-lg p-4 modal-content mx-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center justify-center">
            <div></div> {/* Empty div for spacing */}
            <div className="text-2xl font-bold">Post Meme</div>
            <button onClick={onClose}>
              <img
                src="/icons/close.svg"
                className="w-6 h-6 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
                alt="Close"
              />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-md gap-2">
            <div
              className={`flex items-center justify-center p-1 w-full my-1 cursor-pointer
                ${isPostDisabled ? 'border-4 border-dashed border-gray-300' : ''}`}
            >
              <button className="flex items-center justify-center p-2">
                <input type="file" id="meme-image" name="meme-image" className="hidden" onChange={handleFileChange} />
                {!selectedMemeImage && (
                  <label
                    htmlFor="meme-image"
                    className="flex flex-col items-center justify-center h-[420px] gap-2 cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <img src="/icons/upload-icon.png" alt="Image Icon" className="w-32 h-32 mb-2" />
                    <div className="text-center text-lg">
                      Drop your image here, or <span className="text-blue-500 cursor-pointer">browse</span>
                    </div>
                    <div className="text-gray-500 text-md">
                      For now, visit{' '}
                      <Link href="https://tenor.com" target="_blank" rel="noreferrer" className="text-blue-500">
                        Tenor
                      </Link>{' '}
                      for meme template inspiration
                    </div>
                    <div className="text-gray-500 text-sm">Supports JPG, JPEG, PNG, GIF, WEBP</div>
                    <div className="text-gray-500 text-sm">Max Size: 2MB</div>
                  </label>
                )}
              </button>

              {selectedMemeImage && (
                <label htmlFor="meme-image" className="cursor-pointer">
                  <img
                    src={URL.createObjectURL(selectedMemeImage)}
                    alt="Selected Image"
                    className="h-[420px] object-cover"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <button
              className={`${styles.button} w-full ${isPostDisabled ? 'accent-button-disabled' : 'accent-button'}`}
              disabled={isPostDisabled}
              onClick={handlePost}
            >
              <div className="flex items-center justify-center p-1">
                {/* Loading spinner first, then success icon, then error icon, then default post text */}
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-4 border-white-900"></div>
                    <div>Posting...</div>
                  </div>
                ) : postSuccess ? (
                  <div className="flex items-center justify-center gap-2">
                    <img src="/memes/success_kid.jpg" alt="Success" className="w-16 h-12 rounded-lg" />
                    <div>Posted Successfully!</div>
                  </div>
                ) : postError ? (
                  <div className="flex items-center justify-center gap-2">
                    <div>Error Posting! Try again later...</div>
                  </div>
                ) : (
                  <span>Send it!</span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default PostModal
