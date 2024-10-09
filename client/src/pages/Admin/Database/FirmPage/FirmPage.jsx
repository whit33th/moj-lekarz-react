import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profilImage from "../../../../assets/img/profil.webp";
import confirmedImage from "../../../../assets/img/confirmed.png";
import unconfirmedImage from "../../../../assets/img/unconfirmed.png";
import styles from "./FirmPage.module.css";
import mockFirmData from "../../../../helpers/firmItemList"; 


// Ищем по айди который в пути ссылки


function FirmPage() {
  const { id } = useParams(); // Получаем ID из параметров
  const [firmData, setFirmData] = useState(null); // Для хранения данных о фирме
  const [loading, setLoading] = useState(true); // Статус загрузки
  const [error, setError] = useState(null); // Статус ошибки
  const [vacationStatus, setVacationStatus] = useState(false);

  useEffect(() => {
    // Имитация задержки для загрузки данных
    const fetchFirmData = () => {
      setLoading(true);
      setTimeout(() => {
        if (mockFirmData.id === id) {
          setFirmData(mockFirmData);
        } else {
          setError("Фирма не найдена");
        }
        setLoading(false);
      }, 300); // Задержка 1 секунда
    };

    fetchFirmData();
  }, [id]);

  function handleVacationStatus() {
    setVacationStatus(!vacationStatus);
  }

  if (loading) {
    return <div>Загрузка данных...</div>; // Показываем загрузку, пока данные загружаются
  }

  if (error) {
    return <div>Ошибка: {error}</div>; // Показываем ошибку, если она есть
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
          <div style={{padding: "30px"}} className={styles.infoBox}>
					<p>Telefon: {firmData.phone}</p>
            <p>Email: {firmData.email}</p>
						<p>Adres: {firmData.address}</p>
            <p>Numer NIP: {firmData.nipNumber}</p>
						<p>Liczba lekarzy: {firmData.numberOfDoctors}</p>
            <p>Numer ID: {firmData.idNumber}</p>
            <p>Data rejestracji: {firmData.hiredDate}</p>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.time}>
              <div>
                <p style={{padding: "10px"}}>Godziny pracy: </p>
              </div>
              <div className={styles.gap} >
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
  );
}

export default FirmPage;
