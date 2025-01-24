import styles from "./Tabs.module.css"

function Tabs({ buttons, activeTab, onTabClick, fullWidth = false }) {
  const buttonsArray = buttons.split(",").map((name) => name.trim())

  const handleTabClick = (name) => {
    onTabClick(name)
  }

  const containerStyle = fullWidth ? { width: "100%" } : {}
  const buttonStyle = fullWidth ? { width: "100%" } : {}

  return (
    <div className={styles.settingNavbarButt} style={containerStyle}>
      {buttonsArray.map((name) => (
        <button
          key={name}
          onClick={() => handleTabClick(name)}
          className={`${styles.tabButton} ${activeTab === name ? styles.active : ""}`}
          style={buttonStyle}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default Tabs
