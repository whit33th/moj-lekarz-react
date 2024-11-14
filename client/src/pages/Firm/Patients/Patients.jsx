import { useState } from "react";
import styles from "../GraphManagement/GraphManagement.module.css";
import Search from "../../../components/UI/Search/Search";
import avatar from "../../../assets/img/profil.webp";

function Patients() {
  const [searchTerm, setSearchTerm] = useState("");

  const allPatients = Array.from({ length: 25 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: i % 2 === 0 ? "Jan Bukalski" : "Dmitry Shak",
    phone: i % 2 === 0 ? "456-029-485" : "333-412-666",
  }));

  const filteredPatients = allPatients.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm)
  );

  const hasData = filteredPatients.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Search
          placeholder={"Szukaj pacjenta..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        style={{ columns: hasData ? 2 : 1 }}
        className={styles.tableContainer}
      >
        {hasData ? (
          <div className={styles.column}>
            {filteredPatients.map((item, index) => (
              <div
                key={item.id}
                className={index % 2 === 0 ? styles.row : styles.rowAlt}
              >
                <img src={avatar} alt="" />
                <div className={styles.info}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.phone}>{item.phone}</div>
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
