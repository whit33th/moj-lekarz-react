import React from "react";
import styles from "./Footer.module.css";
import facebook from "@assets/img/facebook.svg";
import whatsapp from "@assets/img/whatsapp.svg";
import instagram from "@assets/img/mage_instagram-circle.svg";
import twitter from "@assets/img/twiter.svg";
import phone from "@assets/img/Group4.svg";
import arrow from "@assets/img/Vectorarrow.svg";
import { NavLink, useLocation } from "react-router-dom";
import { pageConfig } from "../../config/config";

function Footer() {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.phoneBlocks}>
          <div className={styles.phoneBlocksTitle}>
            <img src={phone} alt="phone" />
            <p>Wystąpił problem? Zadzwoń do nas!</p>
          </div>
          <div className={styles.numberBlock}>
            <p>Infolinia:</p>
            <div>
              <h3>
                <a href="tel:+800 000 000">800 000 000</a>
              </h3>
              <p>
                lub +48 473 283 333 – dla połączeń komórkowych oraz z zagranicy
              </p>
            </div>
          </div>
          <p>
            Infolinia czynna całą dobę, 7 dni w tygodniu. Opłata za połączenie
            według taryfy operatora. Infolinia w języku polskim.
          </p>
        </div>

        <div className={styles.footerNavigateBlock}>
          <div className={styles.footerNavigateBlockTop}>
            <div className={styles.footerNavigateBlockTopMenu}>
              <NavLink to={pageConfig.patient.howItWorks}>
                Jak to działa
              </NavLink>
              <div>/</div>
              <NavLink to={pageConfig.patient.blog}>Blog</NavLink>
              <div>/</div>
              <NavLink to={pageConfig.patient.firm}>Dla firm</NavLink>
              <div>/</div>
              <NavLink to={pageConfig.patient.mobileApp}>
                Aplikacja mobilna
              </NavLink>
            </div>
          </div>
          <div className={styles.footerNavigateBlockBottom}>
            <div>
              <ul>
                <li>
                  <NavLink to="/QA">Dla pacjentów</NavLink>
                </li>
                {/* <li>
                  <a href="#">Lekarze</a>
                </li> */}

                {/* <li>
                  <a href="#">Usługi i zabiegi</a>
                </li> */}
                <li>
                  <a href="#">Pomoc</a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <NavLink to="/firm#Formuliarz-kontaktowy">
                    Formuliarz kontaktowy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/firm#Partnerzy">Partnerzy</NavLink>
                </li>
              </ul>
            </div>
            <div className={styles.footerTopUpBtn}>
              <button onClick={scrollToTop}>
                <img src={arrow} alt="scroll to top" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div>© 2025 MójLekarz. Wszelkie prawa są zastrzeżone</div>
        <div className={styles.footerSocialNetwork}>
          <a target="_blank" href="https://www.facebook.com/">
            <img src={facebook} alt="facebook" />
          </a>
          <a target="_blank" href="https://www.whatsapp.com/">
            <img src={whatsapp} alt="whatsapp" />
          </a>
          <a target="_blank" href="https://www.instagram.com/">
            <img src={instagram} alt="instagram" className={styles.instaIcon} />
          </a>
          <a target="_blank" href="https://x.com/">
            <img src={twitter} alt="twitter/x" />
          </a>
        </div>
        <div className={styles.politykaNavigate}>
          <NavLink to={pageConfig.patient.policy.cookies}>
            Polityka cookies
          </NavLink>
          <NavLink to={pageConfig.patient.policy.privacy}>
            Polityka prywatności
          </NavLink>
          <NavLink to={pageConfig.patient.policy.regulations}>
            Regulamin
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
