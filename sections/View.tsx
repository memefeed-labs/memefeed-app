import styles from '../styles'

// Section used in view page
const View = () => {
  return (
    <section className={`${styles.paddings} relative z-10`} id="view">
      <div className={`${styles.innerWidth} mx-auto flex flex-col items-center justify-center`}>
        <div className="flex flex-col justify-center items-center">
          <div className={`${styles.secondaryHeading}`}>
            View
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className={`pt-[24px] ${styles.titleTextSubheading}`}>
            Hello World!
          </div>
        </div>
      </div>
    </section>
  )
}

export default View
