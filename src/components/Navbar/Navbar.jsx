import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import searchIco from '@assets/img/search.png'
import bell from '@assets/img/bell.png'
import grey from '@assets/img/grey.png'
import useGetUserInfo from '@hooks/UserHooks/useGetUserInfo'

function Navbar() {
    const [searchActive, setSearchActive] = useState(false)
    const searchInputRef = useRef(null)
    const searchResultsRef = useRef(null)
    const searchFormRef = useRef(null)

    const [isMessageActive, setIsMessageActive] = useState(false)
    const messagesRef = useRef(null) // Создаем ссылку для блока с сообщениями

    function toggleMessage() {
        setIsMessageActive((prev) => !prev)
    }

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
            // Закрываем результаты поиска, если клик был вне поля поиска
            if (
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target) &&
                searchResultsRef.current &&
                !searchResultsRef.current.contains(event.target)
            ) {
                hideSearchResults()
            }

            // Закрываем сообщения, если клик был вне блока сообщений
            if (
                messagesRef.current &&
                !messagesRef.current.contains(event.target) &&
                !document.getElementById("messages").contains(event.target)
            ) {
                setIsMessageActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const { data } = useGetUserInfo()
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
                    onInput={handleInput}
                    onClick={() => handleInput()}
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

            <div
                onClick={toggleMessage}
                id="messages"
                className={styles.messages}
                ref={messagesRef} // Добавляем ссылку для блока сообщений
            >
                <button className={styles.notification} >
                    <img className={styles.bell} src={bell} alt="bell" />
                </button>

                <div
                    style={isMessageActive ? { display: 'block' } : { display: 'none' }}
                    className={styles.incomingMessages}
                >
                    <div className={styles.message}>
                        <p>Masz nową wiadomość od Marcina Wojceha</p>
                        <button className={styles.buttDef}>Zobacz</button>
                    </div>
                    <div className={styles.message}>
                        <p>Masz nową wiadomość</p>
                        <button className={styles.buttDef}>Zobacz</button>
                    </div>
                </div>
            </div>

            <NavLink to="/profile">
                <div className={styles.profile}>
                    <img src={data?.photo || grey} alt="profil" />
                </div>
            </NavLink>
        </div>
    )
}

export default Navbar
