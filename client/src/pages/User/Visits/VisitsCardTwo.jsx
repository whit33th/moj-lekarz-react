import React from 'react';
import styles from './VisitsCardTwo.module.css';
import imgName from '../../assets/simple-line-i.svg';
import imgType from '../../assets/Vector14.svg';
import phoneImg from '../../assets/ph_phone-light.svg';
import visitorImg from '../../assets/Vector15.svg';


function VisitsCardTwo({ data }) {
  return (
      <div className={styles.visitsPageLeft}>
        <div className={styles.visitsPageLeftTimeBlock}>
            <p>{data.date}</p>
            <p className={styles.visitsPageLeftTimeText}>{data.time}</p>
        </div>
        <div className={styles.infoblock}>
            <div className={styles.infoblockNameBlock}>
                <div className={styles.visitsPageLeftNameBlock}>
                    <img src={imgType} alt="Doctor" />
                    <div>
                        <p>{data.doctorName}</p>
                        <p className={styles.visitsPageLeftType}>{data.doctorType}</p>
                    </div>
                </div>
                <div className={styles.visitsPageLeftNameBlock}>
                    <img src={visitorImg} alt="Doctor" />
                    <div>
                        <p>Typ wizyty:</p>
                        <p className={styles.visitsPageLeftType}>{data.rodzajWizyty}</p>
                    </div>
                </div>
            </div>
            <div className={styles.infoblockPhoneBlock}>
                <div className={styles.visitsPageLeftAddressBlock}>
                    <img src={imgName} alt="Location" />
                    <div>
                        <p>{data.clinicalName}</p>
                        <p className={styles.visitsPageLeftCity}>{data.clinicalAddress}</p>
                    </div>

                </div>
                <div className={styles.visitsPageLeftAddressBlockBtnPhone}>
                    <a href={`tel:+${data.phone}`}><img src={phoneImg} alt="Phone" />{data.phone}</a>
                </div>
            </div>

        </div>
        <div className={styles.leftBlockBottomPrice}>
            <p>{data.serviceName} - {data.servicePrice}</p>
        </div>
    </div>
  )
}
export default VisitsCardTwo;