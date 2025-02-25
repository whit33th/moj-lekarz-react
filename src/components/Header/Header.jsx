import logo from "@assets/img/logo.svg";
import imgProfile from "@assets/img/Vector23.svg";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useLogout from "../../api/hooks/AuthHooks/useLogout";
import { pageConfig } from "../../config/config";
import styles from "./Header.module.css";

function Header({ isLoggedIn }) {
  const location = useLocation();
  const [mobileMenuState, setMobileMenuState] = useState(false);
  const { logout } = useLogout();

  useEffect(() => {
    if (mobileMenuState) {
      setMobileMenuState(false);
    }
  }, [location.pathname, mobileMenuState]);

  return (
    <header className={styles.header}>
      {/* <div className={styles.headerTopBlock}>tryb dla słabowidzących</div> */}
      <div className={styles.headerBottomBlock}>
        <div className={styles.headerLogo}>
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div
          className={`${styles.headerNavigate} ${
            mobileMenuState ? styles.activeMobileMenu : styles.hiddenMobileMenu
          }`}
        >
          <ul>
            {!isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.howItWorks
                    ? styles.active
                    : "")
                }
              >
                <NavLink to={pageConfig.patient.howItWorks}>
                  Jak to działa
                </NavLink>
              </li>
            )}
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === pageConfig.patient.searchVisits
                  ? styles.active
                  : "")
              }
            >
              <NavLink to={pageConfig.patient.searchVisits}>
                Znajdż lekarza
              </NavLink>
            </li>
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === pageConfig.patient.searchClinics
                  ? styles.active
                  : "")
              }
            >
              <NavLink to={pageConfig.patient.searchClinics}>
                Placówki medyczne
              </NavLink>
            </li>

            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.visits
                    ? styles.active
                    : "")
                }
              >
                <NavLink to={pageConfig.patient.visits}>Moje wizyty</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.recipes
                    ? styles.active
                    : "")
                }
              >
                <NavLink to={pageConfig.patient.recipes}>Moje recepty</NavLink>
              </li>
            )}

            {isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.firm
                    ? styles.active
                    : "")
                }
              >
                <NavLink to={pageConfig.patient.documents}>Documenty</NavLink>
              </li>
            )}
            <li
              className={
                `${styles.headerNavigateItem} ` +
                (location.pathname === pageConfig.patient.blog
                  ? styles.active
                  : "")
              }
            >
              <NavLink to={pageConfig.patient.blog}>Blog</NavLink>
            </li>
            {!isLoggedIn && (
              <li
                className={
                  `${styles.headerNavigateItem} ` +
                  (location.pathname === pageConfig.patient.firm
                    ? styles.active
                    : "")
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
          <>
            <div className={styles.headerProfileBtn}>
              <NavLink to={pageConfig.patient.profile}>
                <img src={imgProfile} alt="profile" />
              </NavLink>
              <button
                className={styles.minimalistButton}
                onClick={() => logout()}
              >
                Wyloguj się
              </button>
            </div>
          </>
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
  );
}

export default Header;
