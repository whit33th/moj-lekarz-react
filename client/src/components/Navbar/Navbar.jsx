import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import searchIco from '../../assets/img/search.png'
import bell from '../../assets/img/bell.png'
import profil from '../../assets/img/profil.webp'

function Navbar() {
    const [searchActive, setSearchActive] = useState(false)
    const searchInputRef = useRef(null)
    const searchResultsRef = useRef(null)
    const searchFormRef = useRef(null)

    function showSearchResults() {
        setSearchActive(true)
    }

    function hideSearchResults() {
        setSearchActive(false)
    }

    function handleInput() {
        if (searchInputRef.current.value.trim() !== '') {
            showSearchResults()
        } else {
            hideSearchResults()
        }
    }

    
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target) &&
                searchResultsRef.current &&
                !searchResultsRef.current.contains(event.target)
            ) {
                hideSearchResults()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={styles.navbar}>
            <form
                id="searchForm"
                ref={searchFormRef}
                className={`${styles.search} ${searchActive ? styles.transform : ''}`}
                onSubmit={(e) => e.preventDefault()}
            >
                <img src={searchIco} alt="search" />
                <input
                    ref={searchInputRef}
                    className={styles.searchInput}
                    placeholder="Szukaj..."
                    type="text"
                    name="search"
                    id="search"
                    onInput={handleInput}
                    onClick={() => handleInput() }
                />
                <div
                    ref={searchResultsRef}
                    className={`${styles.searchResults} ${searchActive ? styles.show : ''}`}
                >
                    <div className={styles.searchItem}>Lorem ipsum kalendarz consectetur adipiscing elit.</div>
                    <div className={styles.searchItem}>Lorem kalendarz dolor sit amet, consectetur</div>
                    <div className={styles.searchItem}>Kalendarz nullam non iaculis massa</div>
                    <div className={styles.searchItem}>Nunc kalendarz aliquam metus</div>
                </div>
            </form>

            <div id="messages" className={styles.messages}>
                <div id="message-icon">
                    <img className={styles.bell} src={bell} alt="bell" />
                </div>

                <div className={styles.incomingMessages}>
                    <div className={styles.message}>
                        <p>Masz nową wiadomość od Marcina Wojceha</p>
                        <button className={styles.buttDef}>
                            {/* <Link to="">Zobacz</Link> */}
                        </button>
                    </div>
                    <div className={styles.message}>
                        <p>Masz nową wiadomość</p>
                        <button className={styles.buttDef}>
                            {/* <Link to="">Zobacz</Link> */}
                        </button>
                    </div>
                </div>
            </div>
            <NavLink to="/profile">
                <div className={styles.profile}>
                    <img src={profil} alt="profil" />
                </div>
            </NavLink>
        </div>
    )
}

export default Navbar
