import React, { useState } from 'react';
import styles from './ProfileInfoBlock.module.css';
import img from '../../assets/Vector (22).svg';
import imgfoto from '../../assets/foto (1).png'

function ProfileInfoBlock({ data }) {
    const [stateChangeBlock, setStateChangeBlock] = useState(false);
    const [nameInput, setNameInput] = useState(data.userName);
    const [surNameInput, setSurNameInput] = useState(data.userSurname);
    const [genderInput, setGenderInput] = useState(data.gender);
    const [peselInput, setPeselInput] = useState(data.pesel);
    const [phoneInput, setPhoneInput] = useState(data.phone);
    const [emailInput, setEmailInput] = useState(data.email);
    const [cityInput, setCityInput] = useState(data.address.city);
    const [postalCodeInput, setPostalCodeInput] = useState(data.address.cityCode);
    const [streetInput, setStreetInput] = useState(data.address.street);
    const [apartmentInput, setApartmentInput] = useState(data.address.numberHouse);

    const toggleChangeBlock = () => {
        setStateChangeBlock(!stateChangeBlock);
    };

    return (
        <div className={styles.profileInfoBlock}>
            <div className={styles.profileInfoImgBlock}>
                <div className={styles.profileImg}><img src={data.userImg.length > 0 ? data.userImg : imgfoto}/></div>
                <p>{data.userName} {data.userSurname}</p>
            </div>
            <div className={`${styles.changeBlock} ${stateChangeBlock ? styles.open : ''}`}>
                <div className={styles.line}></div>
                <div className={styles.changeBlockLeft}>
                    <div className={styles.changeInputBlock}>
                        <p>Imię</p>
                        <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder='Name' />
                    </div>
                    <div className={styles.changeInputBlock}>
                        <p>Nazwisko</p>
                        <input type="text" value={surNameInput} onChange={(e) => setSurNameInput(e.target.value)} placeholder='SurName' />
                    </div>
                    <div className={styles.changeInputBlock}>
                        <p>Plec</p>
                        <input type="text" value={genderInput} onChange={(e) => setGenderInput(e.target.value)} placeholder='M' />
                    </div>
                    <div className={styles.changeInputBlock}>
                        <p>PESEL</p>
                        <input type="text" value={peselInput} onChange={(e) => setPeselInput(e.target.value)} placeholder='08058615499' />
                    </div>
                    <div className={styles.changeInputBlock}>
                        <p>Telefon</p>
                        <input type="text" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} placeholder="555 666 777" />
                    </div>
                    <div className={styles.changeInputBlock}>
                        <p>Email</p>
                        <input type="text" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder='jantom@gmail.com' />
                    </div>
                </div>
                <div className={styles.changeBlockRight}>
                    <div className={styles.changeInputBlock}>
                        <p>Miasto:</p>
                        <input type="text" value={cityInput} onChange={(e) => setCityInput(e.target.value)} placeholder='City' />
                    </div>
                    <div className={styles.changeInputBlock}>
                        <p>Kod posztowy:</p>
                        <input type="text" value={postalCodeInput} onChange={(e) => setPostalCodeInput(e.target.value)} placeholder='Postal Code' />
                    </div>
                    <div className={styles.changeInputBlockAddress}>
                        <div className={styles.changeInputBlock}>
                            <p>Ulica i numer domu:</p>
                            <input type="text" value={streetInput} onChange={(e) => setStreetInput(e.target.value)} placeholder='Street and House Number' />
                        </div>
                        <div className={styles.changeInputBlock}>
                            <p>Mieszkanie:</p>
                            <input type="text" value={apartmentInput} onChange={(e) => setApartmentInput(e.target.value)} placeholder='36' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.changeBtn} onClick={toggleChangeBlock}><img src={img} alt="Toggle Change Block" /></div>
        </div>
    );
}

export default ProfileInfoBlock;