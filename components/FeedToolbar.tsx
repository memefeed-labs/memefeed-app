import styles from '../styles'

const tabs = [
  { label: 'Live', value: 'Live' },
  { label: 'Hour', value: 'Hour' },
  { label: 'Today', value: 'Today' },
  { label: 'Week', value: 'Week' },
  { label: 'Month', value: 'Month' },
]

const FeedToolbar = ({
  selectedTab,
  handleTabClick,
}: {
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
