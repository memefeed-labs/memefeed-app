import Link from 'next/link'
import styles from '../styles'
import { useRoom } from '../contexts'
import type { Room, User } from 'models'

const Navbar = () => {
  const { room, user } = useRoom() ?? ({} as { room: Room; user: User })

  return (
    <div className={`${styles.xPaddings} py-8 relative z-0`}>
      <div className={`${styles.innerWidth} mx-auto flex justify-between items-center relative`}>
        <Link href="/" className="flex items-center gap-2 md:gap-4">
          {/* Logo */}
          <div className="w-[54px] sm:w-[66px] md:w-[72px]">
            <img className="" src="/logos/baby-phoenix-logo.png" alt="Memefeed Logo" />
          </div>

          {/* Title */}
          <div className={`${styles.titleText}`}>Memefeed</div>
        </Link>

        {/* Navbar Links */}
        {room && (
          <div className="room-details flex flex-col items-center">
            <div className="flex items-center gap-1">
              <div className={`${styles.titleTextSubheading}`}>{room.name}</div>
              <div className="w-[48px] sm:w-[54px] md:w-[66px]">
                <img src={room.logoUrl} alt="Room Logo" />
              </div>
            </div>
            {user && <div className={`${styles.secondaryText}`}>@{user.username}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
