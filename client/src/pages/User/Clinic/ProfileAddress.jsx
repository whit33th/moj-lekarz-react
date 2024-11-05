import React from 'react'
import styles from './style/ProfileAddress.module.css';
import imgIcon1 from '../../assets/simple-line-i.svg';
import imgIcon2 from '../../assets/ph_phone-light (2).svg';
import imgIcon3 from '../../assets/oui_email.svg';
import imgIcon4 from '../../assets/fluent_text-number-list-ltr-20-regular.svg';
import imgIcon5 from '../../assets/Group-1.svg';




function ProfileAddress(props) {
  return (
    <div className={styles.addressBlock}>
      <div className={styles.leftBlock}>
        <p><img src={imgIcon1} />{props.medCenterInfo.address}</p>
        <p><img src={imgIcon2} />Telefon: {props.medCenterInfo.phone}</p>
        <p><img src={imgIcon3} />Email: {props.medCenterInfo.email}</p>
        <p><img src={imgIcon4} />Numer NIP: {props.medCenterInfo.nip}</p>

      </div>
      <div className={styles.rightBlock}>
        <div className={styles.rightTextBlock}>
            <img src={imgIcon5}/>Godziny pracy:
        </div>
        <div className={styles.rightTimeBlock}>
          
          {Object.entries(props.graphics).map(([day, hours]) => (
            <div className={styles.timeItem}> {day} <span> {hours}</span></div>
          ))}


        </div>
      </div>

    </div>
  )
}
export default ProfileAddress;