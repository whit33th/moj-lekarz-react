import { useState, useEffect } from "react";
import styles from "../GraphManagement/GraphManagement.module.css";
import Search from "../../../components/UI/Search/Search";
import useGetPatientsList from "../../../api/hooks/DoctorHooks/useGetPatientsList";

function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetPatientsList({});

  // Преобразуем данные API в удобный формат
  const allPatients = data?.map((item) => ({
    id: item.id,
    name: `${item.patient.user.first_name} ${item.patient.user.last_name}`,
    phone: item.patient.user.address?.city || "Нет данных",
    photo: item.patient.user.photo,
  })) || [];

  // Фильтрация пациентов по имени и городу
  const filteredPatients = allPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Пока загружаются данные — показываем лоадер
  if (isLoading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Search
          placeholder="Szukaj pacjenta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        style={{ columns: filteredPatients.length ? 2 : 1 }}
        className={styles.tableContainer}
      >
        {filteredPatients.length > 0 ? (
          <div className={styles.column}>
            {filteredPatients.map((patient, index) => (
              <div
                key={patient.id}
                className={index % 2 === 0 ? styles.row : styles.rowAlt}
              >
                <img src={patient.photo} alt={patient.name} />
                <div className={styles.info}>
                  <div className={styles.name}>{patient.name}</div>
                  <div className={styles.phone}>{patient.phone}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noDataMessage}>Brak danych</div>
        )}
      </div>
    </div>
  );
}

export default Patients;
