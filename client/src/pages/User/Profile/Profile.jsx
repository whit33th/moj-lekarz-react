import React, { useState } from 'react'
import styles from './Profile.module.css'
import ProfileInfoBlock from './ProfileInfoBlock';
import { useSelector } from 'react-redux';


const dataVisitsList = [
    {
        id: 8878,
        doctorName: 'Jakub Bukalski ',
        doctorImg: './assets/foto (1).png ',
        doctorType: 'Ortapeda ',
        date: '12.06.2024 12:30',
        address: 'Centrum NFZ, Wilda,Poznań'

    },
]
function Profile() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const profileData = useSelector((state) => state.some.profileState); 
    const clickBtnFc = () => {
        console.log('click')
    }
    return (
        <div className={styles.profilePage}>
            <ProfileInfoBlock data={profileData}/>
            <div className={styles.passwordBlock}>
                <h1>Zmiana hasła</h1>
                <div className={styles.passwordBlockContent}>
                    <div>
                        <p>Stare hasło</p>
                        <input
                            type="password"
                            placeholder="Wpisz stare hasło"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Nowe hasło</p>
                        <input
                            type="text"
                            placeholder="Wpisz nowe hasło"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Powtórz nowe hasło</p>
                        <input
                            type="text"
                            placeholder="Powtórz nowe hasło"
                            value={repeatNewPassword}
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                        />
                    </div>
                    <input type="button" value="Zmień hasło" onClick={clickBtnFc} />
                </div>
            </div>
            <div className={styles.visitsBlock}>
                <h1>Najbliższe wizyty</h1>
                <div className={styles.visitsList}>
                    {
                        dataVisitsList.map(item =>
                            <div className={styles.visitsListItem} key={item.id}>
                                <div className={styles.visitsListItemName}>
                                    <div><img src={item.doctorImg} /></div>
                                    <div>
                                        <h3>{item.doctorName} </h3>
                                        <p>{item.doctorType}</p>
                                    </div>
                                </div>
                                <div className={styles.visitsListItemAddress}>
                                    <p>{item.address}</p>
                                </div>
                                <div className={styles.visitsListItemDate}>
                                    <p>{item.date}</p>
                                </div>
                                <div className={styles.visitsListItemId}><span>{item.id}</span></div>

                            </div>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default Profile;