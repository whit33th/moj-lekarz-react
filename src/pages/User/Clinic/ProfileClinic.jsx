import { useState } from 'react'
import starimg from '@assets/img/Star.svg'
import styles from './style/ProfileClinic.module.css'
import UslugiCard from './UslugiCard'
import ProfileClinicAbout from './ProfileClinicAbout'
import ProfileAddress from './ProfileAddress'
import ProfileClinicReviews from './ProfileClinicReviews'
import { useParams } from 'react-router-dom'
import useStore from '../../../data/store'



function ProfileClinic() {
    const { clinicCard } = useStore()
    const { id } = useParams()

    let state = clinicCard.filter(item => item.id == id)
    state = state[0]
    console.log(state)
    const [menuBtnActive, setMenuBtnActive] = useState('Usługi')
    const rating = parseInt(state.rating, 10)

    return (
        <div className={styles.profileClinic}>
            <div className={styles.profileClinicRow}>
                <div className={styles.clinicNameBlock}>
                    <div className={styles.profileImg}>
                        <img src={state.imglink} />

                    </div>
                    <div>
                        <p>{state.name}</p>

                    </div>
                    <div className={styles.clinicStars}>
                        {[...Array(rating)].map((_, index) => (
                            <img key={index} src={starimg} alt="star" className={styles.imgNameBlockStar} />
                        ))}
                    </div>
                </div>

                <div className={styles.clinicMenu}>
                    <button className={`${styles.clinicMenuBtn} ${menuBtnActive == 'Usługi' ? styles.active : ''}`} onClick={() => setMenuBtnActive('Usługi')}>Usługi</button>
                    <button className={`${styles.clinicMenuBtn} ${menuBtnActive == 'O nas' ? styles.active : ''}`} onClick={() => setMenuBtnActive('O nas')}>O nas</button>
                    <button className={`${styles.clinicMenuBtn} ${menuBtnActive == 'Adresy' ? styles.active : ''}`} onClick={() => setMenuBtnActive('Adresy')}>Adresy</button>
                    <button className={`${styles.clinicMenuBtn} ${menuBtnActive == 'Opinia' ? styles.active : ''}`} onClick={() => setMenuBtnActive('Opinia')}>Opinia</button>
                </div>

                <div className={styles.profileClinicContent}>
                    {menuBtnActive == 'Usługi' && <UslugiCard uslugiAndPrice={state.uslugiAndPrice} />}
                    {menuBtnActive == 'O nas' && <ProfileClinicAbout desctiption={state.description} />}
                    {menuBtnActive == 'Adresy' && <ProfileAddress medCenterInfo={state.medCenterInfo} graphics={state.graphics} />}
                    {menuBtnActive == 'Opinia' && <ProfileClinicReviews />}



                </div>
            </div>

        </div>
    )
}
export default ProfileClinic