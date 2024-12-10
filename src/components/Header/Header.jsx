import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import styles from './Header.module.css'
import logo from '../../assets/img/logo.svg'
import imgProfile from "../../assets/img/Vector23.svg"

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
                (location.pathname === "/how-it-work" ? styles.active : "")
              }
            >
              <NavLink to="/how-it-work">Jak to działa</NavLink>
            </li>
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === "/znajdz-lekarza" ? styles.active : "")
              }
            >
              <NavLink to="/znajdz-lekarza">Znajdż lekarza</NavLink>
            </li>
            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === "/visits" ? styles.active : "")
                }
              >
                <NavLink to="/visits">Moje wizyty</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === "/recipes" ? styles.active : "")
                }
              >
                <NavLink to="/recipes">Moje recepty</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === "/ResearchResult" ? styles.active : "")
                }
              >
                <NavLink to="/ResearchResult">Dokumenty</NavLink>
              </li>
            )}
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === "/mobilna" ? styles.active : "")
              }
            >
              <NavLink to="/mobilna">Aplikacja mobilna</NavLink>
            </li>
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === "/blog" ? styles.active : "")
              }
            >
              <NavLink to="/blog">Blog</NavLink>
            </li>
            {!isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === "/firm" ? styles.active : "")
                }
              >
                <NavLink to="/firm">Dla firm</NavLink>
              </li>
            )}
            {isLoggedIn ? (
              <li className={styles.headerProfileBtnMobile}>
                <NavLink to="/Profile">Profile</NavLink>
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
            <NavLink to="/Profile">
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
