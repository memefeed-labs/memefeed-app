import Link from 'next/link'
import styles from '../styles'

import { useRoom } from 'clients/hooks'
import type { Room } from 'types'

const Navbar = () => {
  const { room } = useRoom() ?? ({} as { room: Room })

  return (
    <div className={`${styles.xPaddings} py-8 relative z-10`}>
      <div className={`${styles.innerWidth} mx-auto flex justify-between items-center relative`}>
        <Link href="/" className="flex items-center gap-2 md:gap-4">
          {/* Logo */}
          <div className="w-[48px] sm:w-[54px] md:w-[66px]">
            <img src="/logos/logo.svg" alt="Memefeed Logo" />
          </div>

          {/* Title */}
          <div className={`${styles.titleText}`}>Memefeed</div>
        </Link>

        {/* Navbar Links */}
        {room && (
          <div className="room-details flex items-center gap-2 md:gap-4">
            <div className={`${styles.titleTextSubheading}`}>{room.name}</div>
            <div className="w-[48px] sm:w-[54px] md:w-[66px]">
              <img src={room.logo_url} alt="Room Logo" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
