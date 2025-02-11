import { useState, useEffect } from "react";
import styles from "../GraphManagement/GraphManagement.module.css";
import Search from "../../../components/UI/Search/Search";
import useGetPatientsList from "../../../api/hooks/DoctorHooks/useGetPatientsList";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function PatientSkeleton() {
  return (
    <div className={styles.row}>
      <Skeleton circle width={50} height={50} />
      <div className={styles.info}>
        <div className={styles.name}>
          <Skeleton width={150} />
        </div>
        <div className={styles.phone}>
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  );
}

function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetPatientsList({});


  const allPatients = data?.map((item) => ({
    id: item.id,
    name: `${item.patient.user.first_name} ${item.patient.user.last_name}`,
    phone: item.patient.user.address?.city || "Нет данных",
    photo: item.patient.user.photo,
  })) || [];


  const filteredPatients = allPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Search
            placeholder="Szukaj pacjenta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={true}
          />
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.column}>
            {[...Array(6)].map((_, index) => (
              <PatientSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
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
