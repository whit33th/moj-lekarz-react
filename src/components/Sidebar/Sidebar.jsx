import sbLinks from "../../helpers/sbLinks"
import { NavLink, useNavigate } from "react-router-dom"
import exit from "@assets/img/exitIco.png"
import logo from "@assets/img/logoonly.png"
import styles from "./Sidebar.module.css"
import useStore from "../../data/store"
import ExitModal from '../Modals/ExitModal/ExitModal'

function Sidebar({ role, children }) {
  const { setModalActive, setModalContent } = useStore()
  const navigate = useNavigate()

  const sidebarLinkFilters = sbLinks.filter((sbLink) => sbLink.role === role)

  function handleModal() {
    setModalActive(true)
    setModalContent(<ExitModal />)
  }

  return (
    <div className={styles.sidebar} id="sidebar">
      <div className={styles.logo}>
        <img onClick={() => navigate("/")} src={logo} alt="logo" />
      </div>

      <div className={styles.sidebarLinks}>
        {sidebarLinkFilters.map((sidebarLinkFilter, index) => (
          <NavLink
            key={index}
            to={sidebarLinkFilter.url}
            className={({ isActive }) =>
              isActive ? styles.sidebarLinkDivActive : styles.sidebarLinkDiv
            }
          >
            <img src={sidebarLinkFilter.img} alt={sidebarLinkFilter.title} />
            <span>{sidebarLinkFilter.title}</span>
          </NavLink>
        ))}
      </div>

      <div id="exit" className={styles.sidebarLinks} onClick={handleModal}>
        <div className={styles.exit}>
          <img src={exit} alt="exit" />
          <span>Wyjście</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
