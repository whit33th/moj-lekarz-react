import sbLinks from '../../helpers/sbLinks'
import SidebarLink from '../SidebarLink/SidebarLink'
import { NavLink } from 'react-router-dom'

import exit from "../../assets/img/sidebar-settings.png"
import logo from "../../assets/img/logoonly.png"

import styles from './Sidebar.module.css'
import BlueBtn from '../Buttons/BlueBtn/BlueBtn'
import BlueBorderBtn from '../Buttons/BlueBorderBtn/BlueBorderBtn'
import useStore from '../../data/store'

function Sidebar({ role }) {

    const {setModalActive, setModalContent} = useStore();
    const modalContent = (<div>
        <h1>Czy na pewno chcesz wylogować się z konta?</h1>

        <div className={styles.choice}>
            <BlueBorderBtn cb={()=> setModalActive(false)}>Nie</BlueBorderBtn>
            <BlueBtn>Tak</BlueBtn>
        </div>
        
    </div>)

    const sidebarLinkFilters = sbLinks.filter(sbLink => sbLink.role === role)

    function handleModal() {
        setModalActive(true)
        setModalContent(modalContent)
    }

    return (
        <div className={styles.sidebar} id="sidebar">
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>

            <div className={styles.sidebarLinks}>
                {sidebarLinkFilters.map((sidebarLinkFilter, index) => (
                    <SidebarLink
                        key={index}
                        title={sidebarLinkFilter.title}
                        img={sidebarLinkFilter.img}
                        url={sidebarLinkFilter.url}
                    />
                ))}
            </div>

            <div className={styles.sidebarLinks}>
                <NavLink id='exit' className={styles.exit} onClick={handleModal}>
                    <div className={styles.sidebarLinkDiv}>
                        <img src={exit} alt="exit" />
                        Wyjście
                    </div>
                </NavLink>
            </div>


        </div>
    )
}

export default Sidebar
