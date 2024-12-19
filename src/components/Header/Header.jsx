import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import styles from './Header.module.css'
import logo from '@assets/img/logo.svg'
import imgProfile from "@assets/img/Vector23.svg"

import { pageConfig } from '../../config/config'

function Header({ isLoggedIn }) {
  const location = useLocation()
  const [mobileMenuState, setMobileMenuState] = useState(false)

  useEffect(() => {
    if (mobileMenuState) {
      setMobileMenuState(false)
    }
  }, [location.pathname])

  return (
    <header className={styles.header}>
      <div className={styles.headerTopBlock}>tryb dla słabowidzących</div>
      <div className={styles.headerBottomBlock}>
        <div className={styles.headerLogo}>
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div
          className={`${styles.headerNavigate} ${mobileMenuState ? styles.activeMobileMenu : styles.hiddenMobileMenu
            }`}
        >
          <ul>
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === pageConfig.patient.howItWorks ? styles.active : "")
              }
            >
              <NavLink to={pageConfig.patient.howItWorks}>Jak to działa</NavLink>
            </li>
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === pageConfig.patient.searchDoctor ? styles.active : "")
              }
            >
              <NavLink to={pageConfig.patient.searchDoctor}>Znajdż lekarza</NavLink>
            </li>
            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.visits ? styles.active : "")
                }
              >
                <NavLink to={pageConfig.patient.visits}>Moje wizyty</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.recipes ? styles.active : "")
                }
              >
                <NavLink to={pageConfig.patient.recipes}>Moje recepty</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.researchResults ? styles.active : "")
                }
              >
                <NavLink to={pageConfig.patient.researchResults}>Dokumenty</NavLink>
              </li>
            )}
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === pageConfig.patient.mobileApp ? styles.active : "")
              }
            >
              <NavLink to={pageConfig.patient.mobileApp}>Aplikacja mobilna</NavLink>
            </li>
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === pageConfig.patient.blog ? styles.active : "")
              }
            >
              <NavLink to={pageConfig.patient.blog}>Blog</NavLink>
            </li>
            {!isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.firm ? styles.active : "")
                }
              >
                <NavLink to={pageConfig.patient.firm}>Dla firm</NavLink>
              </li>
            )}
            {isLoggedIn ? (
              <li className={styles.headerProfileBtnMobile}>
                <NavLink to={pageConfig.patient.profile}>Profile</NavLink>
              </li>
            ) : (
              <li className={styles.headerSignBtnMobile}>
                <NavLink to={pageConfig.login}>Zaloguj się</NavLink>
              </li>
            )}
          </ul>
        </div>
        {isLoggedIn ? (
          <div className={styles.headerProfileBtn}>
            <NavLink to={pageConfig.patient.profile}>
              <img src={imgProfile} alt="profile" />
            </NavLink>
          </div>
        ) : (
          <div className={styles.headerSignBtn}>
            <NavLink to={pageConfig.login}>Zaloguj się</NavLink>
          </div>
        )}
        <div
          className={styles.headerMobileBtn}
          onClick={() => setMobileMenuState(!mobileMenuState)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  )
}

export default Header
