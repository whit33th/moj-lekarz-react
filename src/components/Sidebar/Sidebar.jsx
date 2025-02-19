import { useState, useRef } from "react";
import sbLinks from "../../helpers/sbLinks";
import { NavLink, useNavigate } from "react-router-dom";
import exit from "@assets/img/exitIco.png";
import logo from "@assets/img/logoonly.png";
import searchIco from "@assets/img/search.png";
import styles from "./Sidebar.module.css";
import useStore from "../../data/store";
import ExitModal from "../Modals/ExitModal/ExitModal";
import SearchResults from "./../Navbar/SearchResults";

function Sidebar({ role }) {
  const { setModalActive, setModalContent } = useStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const sidebarLinkFilters = sbLinks.filter((sbLink) => sbLink.role === role);

  function handleModal() {
    setModalActive(true);
    setModalContent(<ExitModal />);
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <div className={styles.sidebar} id="sidebar">
      <div className={styles.logo}>
        <img onClick={() => navigate("/")} src={logo} alt="logo" />
      </div>

      <div className={styles.mobileSearch}>
        <img src={searchIco} alt="search" />
        <input
          type="text"
          placeholder="Szukaj..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setSearchActive(true)}
        />
        <div
          className={`${styles.searchResults} ${
            searchActive && searchValue ? styles.active : ""
          }`}
        >
          <SearchResults inputValue={searchValue} />
        </div>
      </div>

      <div
        className={`${styles.sidebarLinks} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
      >
        {sidebarLinkFilters.map((sidebarLinkFilter, index) => (
          <NavLink
            key={index}
            to={sidebarLinkFilter.url}
            className={({ isActive }) =>
              isActive ? styles.sidebarLinkDivActive : styles.sidebarLinkDiv
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src={sidebarLinkFilter.img} alt={sidebarLinkFilter.title} />
            <span>{sidebarLinkFilter.title}</span>
          </NavLink>
        ))}

        <div id="exit" className={styles.exit} onClick={handleModal}>
          <img src={exit} alt="exit" />
          <span>Wyjście</span>
        </div>
      </div>

      <div
        className={`${styles.mobileMenuBtn} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Sidebar;
