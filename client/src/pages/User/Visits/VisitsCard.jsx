import React from 'react'
import styles from './VisitsCard.module.css';
import imgName from '../../../assets/img/simple-line-i.svg';
import imgType from '../../../assets/img/Vector14.svg';
import phoneImg from '../../../assets/img/ph_phone-light.svg';
import closeImg from '../../../assets/img/Vector (33).svg'

function VisitsCard({ data , deleteFc }) {

  return (
    <div className={styles.visitsCard}>
        <div className={styles.visitsCardTimeBlock}>
          <p>{data.date}</p>
          <p className={styles.visitsCardTimeText}>{data.time}</p>
        </div>
        <div className={styles.visitsCardNameBlock}>
          <img src={imgType} alt="Doctor" />
          <div>
            <p>{data.doctorName}</p>
            <p className={styles.visitsCardType}>{data.doctorType}</p>
          </div>
        </div>
        <div className={styles.visitsCardAddressBlock}>
          <img src={imgName} alt="Location" />
          <div>
            <p>{data.clinicalName}</p>
            <p className={styles.visitsCardCity}>{data.clinicalAddress}</p>
          </div>
          <div className={styles.visitsCardAddressBlockBtnPhone}>
            <a href={`tel:+${data.phone}`}><img src={phoneImg} alt="Phone" />{data.phone}</a>
          </div>
        </div>
        <div className={styles.visitsCardBottomPrice}>
            <p>{data.serviceName} - {data.servicePrice}</p>
        </div>
        <span className={styles.deleteBtn} onClick={()=> deleteFc(data.id)}><img src={closeImg} alt="X" /></span>
    </div>
  )
}
export default VisitsCard;