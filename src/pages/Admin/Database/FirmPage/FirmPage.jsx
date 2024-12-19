import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import profilImage from "@assets/img/profil.webp"
import confirmedImage from "@assets/img/confirmed.png"
import unconfirmedImage from "@assets/img/unconfirmed.png"
import styles from "./FirmPage.module.css"
import mockFirmData from "../../../../helpers/firmItemList"

function FirmPage() {
  const { id } = useParams()
  const [firmData, setFirmData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vacationStatus, setVacationStatus] = useState(false)

  useEffect(() => {
    const fetchFirmData = () => {
      setLoading(true)
      setTimeout(() => {
        if (mockFirmData.id === id) {
          setFirmData(mockFirmData)
        } else {
          setError("Фирма не найдена")
        }
        setLoading(false)
      }, 300)
    }

    fetchFirmData()
  }, [id])

  function handleVacationStatus() {
    setVacationStatus(!vacationStatus)
  }

  if (loading) {
    return <div>Загрузка данных...</div>
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  return (
    <div className={`${styles.profilDiv} ${styles.shadow}`}>
      <div className={styles.topPhoto}>
        <img src={profilImage} alt="Profil" />
      </div>
      <h1 style={{ margin: "0 auto" }}>{firmData.name || "Nazwa Firmy"}</h1>
      <div className={styles.hr}>
        <hr />
        <div className={styles.infoContainer}>
          <div style={{ padding: "30px" }} className={styles.infoBox}>
            <p>Telefon: {firmData.phone}</p>
            <p>Województwo: Wielkopolskie</p>
            <p>Miasto: Poznan</p>

            <p>Adres: {firmData.address}</p>
            <p>Email: {firmData.email}</p>
            <p>Numer NIP: {firmData.nipNumber}</p>
          </div>
          <div style={{ padding: "30px" }} className={styles.infoBox}>
            <p>
              <span>Liczba lekarzy: </span>
              <span className={styles.timeBackground}>
                {firmData.numberOfDoctors}
              </span>
            </p>
            <p>Numer ID: {firmData.idNumber}</p>
            <p>Data rejestracji: {firmData.hiredDate}</p>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.time}>
              <div>
                <p style={{ padding: "10px", textWrap: "nowrap" }}>
                  Godziny pracy:{" "}
                </p>
              </div>
              <div className={styles.gap}>
                {Object.entries(firmData.workingHours).map(([day, hours]) => (
                  <p className={styles.timeDiv} key={day}>
                    {day}: <div className={styles.timeBackground}>{hours}</div>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirmPage
