import styles from '../styles'

const FeedToolbar = ({
  tabs,
  selectedTab,
  handleTabClick,
}: {
  tabs: { label: string; value: string }[]
  selectedTab: string
  handleTabClick: (tab: string) => void
}) => {
  return (
    <div className="flex justify-center gap-2 py-2">
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={`${styles.tab} flex items-center ${selectedTab === tab.value ? 'selected-tab' : 'hover:font-bold'}`}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default FeedToolbar
