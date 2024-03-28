import Link from 'next/link'

import styles from '../styles'

const Navbar = () => (
  <div className={`${styles.xPaddings} py-8 relative z-10`}>
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-4`}>
      <div className="flex justify-center items-center gap-4">
        <Link href="/" className="w-[54px] sm:w-[66px] md:w-[81px]">
          <img src="/logo.svg" alt="Memefeed Logo" />
        </Link>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <Link href="/post" className={`${styles.blackLink}`}>
          Post
        </Link>
      </div>
    </div>
  </div>
)

export default Navbar
