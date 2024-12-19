import styles from "./Tabs.module.css"

function Tabs({ buttons, activeTab, onTabClick, fullWidth = false }) {
  const buttonsArray = buttons.split(",").map((name) => name.trim())



  const handleTabClick = (name) => {
    onTabClick(name)
  }

  return (
    <div style={fullWidth && { width: "100%" }} className={styles.settingNavbarButt}>
      {buttonsArray.map((name) => (
        <button
          style={fullWidth && { width: "100%" }}
          key={name}
          onClick={() => handleTabClick(name)}
          className={activeTab === name ? styles.active : ""}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default Tabs
