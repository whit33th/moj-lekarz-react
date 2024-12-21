import { useState, useRef, useEffect, lazy } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import searchIco from '@assets/img/search.png'
import bell from '@assets/img/bell.png'
import grey from '@assets/img/grey.png'
import useGetUserInfo from '@hooks/UserHooks/useGetUserInfo'
import SearchResults from './searchResults'
import { useForm } from 'react-hook-form'
import useStore from '../../data/store'
const BlurLayer = lazy(() => import('../Modals/BlurLayer/BlurLayer'))


function Navbar() {

    const searchInputRef = useRef(null)
    const searchResultsRef = useRef(null)
    const searchFormRef = useRef(null)
    const { searchActive, setSearchActive } = useStore()

    const [isMessageActive, setIsMessageActive] = useState(false)
    const messagesRef = useRef(null)
    const { register, watch } = useForm()
    let searchInput = watch('search')?.trim()

    function toggleMessage() {
        setIsMessageActive((prev) => !prev)
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchFormRef.current &&
                !searchFormRef.current.contains(event.target) &&
                searchFormRef.current &&
                !searchFormRef.current.contains(event.target)
            ) {
                setSearchActive(false)
            }
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
    }, [setSearchActive])

    console.log(searchInput)

    const { data } = useGetUserInfo()
    return (
        <div className={styles.navbar}>
            <form
                id="searchForm"
                ref={searchFormRef}
                className={`${styles.search} ${searchActive && searchInput ? styles.transform : ''}`}
                onSubmit={(e) => e.preventDefault()}
            >
                <img src={searchIco} alt="search" />
                <input
                    ref={searchInputRef}
                    className={styles.searchInput}
                    placeholder="Szukaj..."
                    type="text"
                    onClick={() => setSearchActive(true)}


                    {...register('search')}
                />
                <SearchResults ref={searchResultsRef} formActive={searchActive} searchInputRef={searchInputRef} inputValue={searchInput} />
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
            <BlurLayer />
        </div>
    )
}

export default Navbar
