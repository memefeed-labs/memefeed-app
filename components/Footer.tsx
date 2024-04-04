import Link from 'next/link'
import { socials } from '../utils/constants'
import styles from '../styles'

const Footer = () => (
  <footer className={`${styles.smallXPaddings} py-8 relative z-10`}>
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex flex-col">
        <div className="md:mb-[24px] mb-[12px] h-[2px] bg-black opacity-20" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-col">
            <Link href="/" className="font-extrabold text-[24px] text-black">
              Memefeed
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <div key={index} className="w-[27px] h-[27px] object-contain cursor-pointer">
                <a href={social.linkUrl} target="_blank" rel="noopener noreferrer">
                  <img key={social.name} src={social.url} alt={social.name} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center mt-[8px]">
          <p className="font-normal text-[14px] text-black">© Copyright 2024. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
