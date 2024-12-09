import grey from "../../../assets/img/grey.png"

import styles from "./Profil.module.css"
import { useState } from "react"

import useStore from '../../../data/store'
import useGetFullInfo from '../../../hooks/DoctorHooks/useGetFullInfo'
import useGetUserInfo from '../../../hooks/UserHooks/useGetUserInfo'
import Skeleton from 'react-loading-skeleton'
function Profil() {
  const [vacationStatus, setVacationStatus] = useState(false)
  const { userId } = useStore()
  function handleVacationStatus() {
    setVacationStatus(!vacationStatus)
  }

  const { data, isLoading } = useGetFullInfo({
    id: userId
  }) || []
  const { data: user, isLoading: isLoadingUser } = useGetUserInfo() || []

  const doctor = {
    fullname: isLoadingUser ? 'Ładowanie...' : user?.first_name + ' ' + user?.last_name || 'Brak',
    hired: isLoading ? 'Ładowanie...' : data?.hired_at?.slice(0, 10),
    specialty: isLoading ? 'Ładowanie...' : data?.specialty?.name,
    img: user?.photo ,
    pesel: isLoadingUser ? 'Ładowanie...' : user?.pesel || 'Brak',
    tel: isLoadingUser ? 'Ładowanie...' : user?.phone || 'Brak',
    email: isLoadingUser ? 'Ładowanie...' : user?.email || 'Brak',
    clinic: isLoading ? 'Ładowanie...' : data?.clinic?.name || 'Brak',

  }

  return (
    <div className={`${styles.profilDiv} ${styles.shadow}`}>
      <div className={styles.topPhoto}>
        <img src={doctor.img || grey} alt="Profil" />
        <h1 style={{ margin: 0 }}>
          {isLoadingUser ? <Skeleton width={250} /> : doctor.fullname}
        </h1>
        <p>{isLoading ? <Skeleton width={150} /> : doctor.specialty}</p>
        <br />
        <p className={styles.grey}>{isLoading ? <Skeleton width={350} /> : doctor.clinic}</p>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.profilInfo}>
        <div className={styles.mainInfo}>
          {/* <div className={styles.halfRow}>
            <div>
              <label htmlFor="name">Imię</label>
              <input type="text" id="name" name="name" placeholder="Pawel" />
            </div>
            <div>
              <label htmlFor="surname">Nazwisko</label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Nowik"
              />
            </div>
          </div> */}
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="postalCode">PESEL</label>
              <input
                type="text"
                id="PESEL"
                name="PESEL"
                value={doctor.pesel}
              />
            </div>
            <div>
              <label htmlFor="tel">Telefon</label>
              <input type="tel" id="tel" name="tel" value={doctor.tel} />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={doctor.email}
              />
            </div>
          </div>
        </div>
        <div className={styles.statusInfo}>
          <div className={styles.hired}>
            <p>Zatrudniony</p>
            <p className={styles.grey}>{doctor.hired}</p>
          </div>
          <div className={styles.vacationsDay}>
            <p>Dostępne dni urlopowe</p>
            <p className={`${styles.grey} ${styles.smCountNumber}`}>27 dni</p>
            <button
              onClick={handleVacationStatus}
              id="vacations"
              className={vacationStatus ? styles.greyButt : styles.blueButt}
            >
              {vacationStatus ? "Już zaplanowany" : "Zaplanuj wakacje"}
            </button>
          </div>
        </div>
      </div>
      { }
      { }
    </div>
  )
}

export default Profil
