
import styles from "./style/DoctorCard.module.css"
import starimg from "@assets/img/Star.svg"
import imgIcon1 from "@assets/img/simple-line-i.svg"
import imgIcon2 from "@assets/img/Vector14.svg"
import { NavLink } from "react-router-dom"
import Skeleton from 'react-loading-skeleton'
import grey from "@assets/img/grey.png"
import { pageConfig } from '../../../config/config'

function DoctorCard({ data, loading, selectedDate, addZapis }) {
  

  const appointment = {
    id: data?.doctor_id || 'Brak',
    name: data?.user?.first_name + ' ' + data?.user?.last_name || 'Brak',
    price: data?.service?.price || 'Brak',
    description: data?.description || 'Brak',
    street: data?.address?.street || 'Brak',
    city: data?.address?.city || 'Brak',
    home: data?.address?.home || 'Brak',
    postCode: data?.address?.post_index || 'Brak',
    service: data?.service?.name || 'Brak',
    rating: Math.floor(data?.rating) || 0,
    specialty: data?.specialty || 'Brak',
    photo: data?.user?.photo || grey,
    slots: data?.available_slots || [],

  }
  
  // const rating = parseInt(data.rating, 10);

  // const filteredDates = selectedDate
  //   ? data.dates.filter(
  //       (dateObj) => dateObj.date === selectedDate?.toLocaleDateString("pl-PL")
  //     )
  //   : data.dates;

  // const displayedDates = filteredDates.slice(0, 2);

  return (
    <div className={styles.doctorCard}>
      <div className={styles.doctorCardInfo}>
        <div className={styles.doctorCardInfoImgBlock}>
          <NavLink to={`/profileDoctor/${appointment.id}`}>
            <img src={appointment.photo || grey} alt={'DoctorAvatar'} />
          </NavLink>
          <div>
            <p className={styles.doctorCardInfoImgBlockName}>{appointment.name}</p>
            <p>{appointment.specialty}</p>
            <p>
              {[...Array(appointment.rating)].map((_, index) => (
                <img
                  key={index}
                  src={starimg}
                  alt="star"
                  className={styles.imgNameBlockStar}
                />
              ))}
            </p>
          </div>
        </div>
        <div className={styles.doctorCardAddressBlock}>
          <div>
            <img src={imgIcon1} alt="address" />
            <div>
              <p>
                {appointment.street}, {appointment.postCode}, {appointment.city}
              </p>
              <p className={styles.doctorCardAddressPlaceholder}>
                Centrum Medyczny
              </p>
            </div>
          </div>
          <div className={styles.servicesContainer}>

            {data?.service?.slice(0, 5).map((item, index) => (
              <div className={styles.serviceItem} key={index}>
                <img src={imgIcon2} alt="price" />
                <p>{item.name} - {item.price}zł </p>
              </div>
            ))}
            {data?.service?.length > 5 ? <p>Jeszcze {data?.service?.length - 5} usług(i)</p> : null}

          </div>
        </div>
      </div>
      <div className={styles.doctorDescription}>
        <p>{appointment.description}</p>
        <div>
          <NavLink style={{ color: "#3E36B0" }} to={`/profileDoctor/${appointment.id}`}>
            Zobacz więcej &#8594;
          </NavLink>
        </div>
      </div>
      <div className={styles.doctorCardTimeBlock}>
        <h3>Najbliższe terminy:</h3>
        <div className={styles.doctorCardTimeBlockItems}>
          {appointment?.slots?.length > 0 ? (
            appointment?.slots?.map((item, index) => (
              <div className={styles.doctorCardTimeBlockItem} key={index}>
                <p style={{ fontWeight: "bold" }}>{item.date}</p>
                <div className={styles.doctorCardHoursItems}>
                  {item?.slots?.map((timeSlot, index) => (
                    <NavLink
                      onClick={() =>
                        addZapis(appointment.id, timeSlot, item.date, data)
                      }
                      to={`${pageConfig.patient.searchDoctor}/${appointment.id}/`}
                      className={styles.doctorCardHoursItem}
                      key={index}
                    >
                      {timeSlot}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>Brak dostępnych terminów na wybrany dzień.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
