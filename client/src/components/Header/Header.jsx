import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import imgProfile from '../../assets/Vector23.svg';
import cx from 'classnames';

function Header({ isLoggedIn }) {
  const location = useLocation();
  const [mobileMenuState, setMobileMenuState] = useState(false);
  useEffect(() => {
    if (mobileMenuState) {
      setMobileMenuState(false);
    }
  }, [location.pathname]);
  return (
    <header className={styles.header}>
      <div className={styles.headerTopBlock}>tryb dla słabowidzących</div>
      <div className={styles.headerBottomBlock}>
        <div className={styles.headerLogo}>
          <NavLink to="/"><img src={logo} alt="Logo" /></NavLink>
        </div>
        <div className={`${styles.headerNavigate} ${mobileMenuState ? styles.activeMobileMenu : styles.hiddenMobileMenu}`}>
          <ul>
            <li className={cx(styles.headerNavigateItem, { [styles.active]: location.pathname === '/howitwork' })}>
              <NavLink to="/howitwork">Jak to działa</NavLink>
            </li>
            <li className={cx(styles.headerNavigateItem, { [styles.active]: location.pathname === '/znajdz-lekarza' })}>
              <NavLink to="/znajdz-lekarza">Znajdż lekarza</NavLink>
            </li>
            {
              isLoggedIn && <li className={cx(styles.headerNavigateItem, { [styles.active]: location.pathname === '/visits' })}>
                <NavLink to="/visits">Moje wizyty</NavLink>
              </li>

            }
            {
              isLoggedIn && <li className={cx(styles.headerNavigateItem, { [styles.active]: location.pathname === '/recipes' })}>
                <NavLink to="/recipes">Moje recepty</NavLink>
              </li>

            }
            {
              isLoggedIn && <li className={cx(styles.headerNavigateItem, { [styles.active]: location.pathname === '/ResearchResult' })}>
                <NavLink to="/ResearchResult">Dokumenty</NavLink>
              </li>

            }
            <li className={cx(styles.headerNavigateItem, { [styles.active]: location.pathname === '/mobilna' })}>
              <NavLink to="/mobilna">Aplikacja mobilna</NavLink>
            </li>
            <li className={cx(styles.headerNavigateItem, { [styles.active]: location.pathname === '/blog' })}>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            {
              !isLoggedIn && <li className={cx(styles.headerNavigateItem, { [styles.active]: location.pathname === '/firm' })}>
                <NavLink to="/firm">Dla firm</NavLink>
              </li>
            }
            {
              isLoggedIn
                ? <li className={styles.headerProfileBtnMobile}><NavLink to="/Profile">Profile</NavLink></li>
                : <li className={styles.headerSignBtnMobile}><NavLink to="/Auth">Zaloguj się</NavLink></li>
            }
          </ul>
        </div>
        {
          isLoggedIn
            ? <div className={styles.headerProfileBtn}><NavLink to="/Profile"><img src={imgProfile} alt="profile" /></NavLink></div>
            : <div className={styles.headerSignBtn}><NavLink to="/Auth">Zaloguj się</NavLink></div>
        }
        <div className={styles.headerMobileBtn} onClick={() => setMobileMenuState(!mobileMenuState)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </header>
  );
}

export default Header;