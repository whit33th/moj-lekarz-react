import styles from './VisitsCardCompleted.module.css'
import imgName from '@assets/img/simple-line-i.svg'
import imgType from '@assets/img/Vector14.svg'
import phoneImg from '@assets/img/ph_phone-light.svg'
import { NavLink } from 'react-router-dom'

function VisitsCardCompleted({ data }) {
  const formatAddress = (address) => {
    return `${address.street} ${address.home}${address.flat ? `/${address.flat}` : ''}, ${address.city}`;
  };

  return (
    <div className={styles.visitsCard}>
      <div className={styles.visitsCardTimeBlock}>
        <p>{new Date(data.date).toLocaleDateString('pl-PL')}</p>
        <p className={styles.visitsCardTimeText}>{data.start_time + ' - ' + data.end_time}</p>
      </div>
      <div className={styles.visitsCardNameBlock}>
        <img src={imgType} alt="Doctor" />
        <div>
            <p>Dr {data.doctor.first_name} {data.doctor.last_name}</p>
          <p className={styles.visitsCardType}>{data.service.specialty.name}</p>
        </div>
      </div>
      <div className={styles.visitsCardAddressBlock}>
        <img src={imgName} alt="Location" />
        <div>
          <p>{data.clinic.name}</p>
          <p className={styles.visitsCardCity}>{formatAddress(data.clinic.address)}</p>
        </div>
        <div className={styles.visitsCardAddressBlockBtnPhone}>
          <a href={`tel:${data.clinic.phone}`}>
            <img src={phoneImg} alt="Phone" />
            {data.clinic.phone}
          </a>
        </div>
      </div>
      <div className={styles.visitsCardBottomPrice}>
        <p>{data.service.name} - {data.service.price} PLN</p>
      </div>
      {/* <NavLink to={`/review-visits/${data.id}`} className={styles.reviewsBtn}>
        Napisać recenzję
      </NavLink> */}
    </div>
  )
}

export default VisitsCardCompleted