import React from 'react';
import styles from './Footer.module.css';
import facebook from '../../assets/facebook.svg';
import whatsapp from '../../assets/whatsapp.svg';
import instagram from '../../assets/mage_instagram-circle.svg';
import twiter from '../../assets/twiter.svg';
import phone from '../../assets/Group4.svg';
import arrow from '../../assets/Vectorarrow.svg';
import { NavLink, useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

    React.useEffect(() => {
        // Smooth scrolling to the anchor when the location changes
        const hash = location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                            <h3><a href="tel:+800 000 000">800 000 000</a></h3>
                            <p>lub +48 473 283 333 – dla połączeń komórkowych oraz z zagranicy</p>
                        </div>
                    </div>
                    <p>Infolinia czynna całą dobę, 7 dni w tygodniu. Opłata za połączenie według taryfy operatora. Infolinia w języku polskim.</p>
                </div>

                <div className={styles.footerNavigateBlock}>
                    <div className={styles.footerNavigateBlockTop}>
                        <div className={styles.footerNavigateBlockTopMenu}>
                            <NavLink to="/">Jak to działa</NavLink>
                            <div>/</div>
                            <NavLink to="/mobilna">Aplikacja mobilna</NavLink>
                            <div>/</div>
                            < NavLink to="/blog">Blog</NavLink>
                            <div>/</div>
                            <NavLink to="/firm">Dla firm</NavLink>
                        </div>
                        <div className={styles.footerNavigateBlockTopBtn}><a href="#">Zaloguj się</a></div>
                    </div>
                    <div className={styles.footerNavigateBlockBottom}>
                        <div>
                            <ul>
                                <li><NavLink to="/QA">Dla pacjentów</NavLink></li>
                                <li><a href="#">Lekarze</a></li>
                                <li><NavLink to="Search-clinic">Placówki medyczne</NavLink></li>
                                <li><a href="#">Usługi i zabiegi</a></li>
                                <li><a href="#">Pomoc</a></li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><NavLink to="/firm">Dla firm</NavLink></li>
                                <li><NavLink to="/firm#Formuliarz-kontaktowy">Formuliarz kontaktowy</NavLink></li>
                                <li><NavLink to="/firm#Partnerzy">Partnerzy</NavLink></li>
                            </ul>
                        </div>
                        <div className={styles.footerTopUpBtn}>
                            <button onClick={scrollToTop}><img src={arrow} alt="scroll to top" /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div>© 2024 MyLekarz. Wszelkie prawa są zastrzeżone</div>
                <div className={styles.footerSocialNetwork}>
                    <a href="#"><img src={facebook} alt="facebook" /></a>
                    <a href="#"><img src={whatsapp} alt="whatsapp" /></a>
                    <a href="#"><img src={instagram} alt="instagram" className={styles.instaIcon} /></a>
                    <a href="#"><img src={twiter} alt="twiter" /></a>
                </div>
                <div className={styles.politykaNavigate}>
                    <NavLink to="/policy/privacy">Polityka prywatności</NavLink>
                    <NavLink to="/policy/cookies">Polityka cookies</NavLink>
                </div>
            </div>
        </footer>
    );
}

export default Footer;