import React from 'react'
import styles from './VisitsCardCompleted.module.css';
import imgName from '../../assets/simple-line-i.svg';
import imgType from '../../assets/Vector14.svg';
import phoneImg from '../../assets/ph_phone-light.svg';
import closeImg from '../../assets/Vector (33).svg'
import { NavLink } from 'react-router-dom';

function VisitsCardCompleted({ data }) {

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
        <NavLink to={`/review-visits/${data.id}`} className={styles.reviewsBtn}>Napisać recenzję</NavLink>
    </div>
  )
}
export default VisitsCardCompleted;