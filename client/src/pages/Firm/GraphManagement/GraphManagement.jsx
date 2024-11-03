import { useState } from "react";
import styles from "./GraphManagement.module.css";
import DropdownStas from "../../../components/Dropdown/DropdownStas";
import Search from "../../../components/UI/Search/Search";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";

import { useNavigate } from "react-router-dom";

function GraphManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.find((u) => u.id === user.id)
        ? prevSelected.filter((u) => u.id !== user.id)
        : [...prevSelected, user]
    );
  };

  const leftColumnData = Array.from({ length: 15 }, (_, i) => ({
    id: `left-${i + 1}`,
    name: "Jan Bukalski",
    phone: "456-029-485",
  }));

  const rightColumnData = Array.from({ length: 15 }, (_, i) => ({
    id: `right-${i + 1}`,
    name: "Dmitry Shak",
    phone: "333-412-666",
  }));

  const options = ["Dentysta", "Psychotherapist", "Antroherapist"];
  const allPatients = [...leftColumnData, ...rightColumnData];

  const filteredPatients = allPatients.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm)
  );

  const leftFilteredData = filteredPatients.slice(
    0,
    Math.ceil(filteredPatients.length / 2)
  );
  const rightFilteredData = filteredPatients.slice(
    Math.ceil(filteredPatients.length / 2)
  );

  const navigate = useNavigate();

  async function handleNextClick() {
    if (selectedUsers.length) {
      navigate("/graph/manage", { state: { selectedUsers } });
    } else {
      const { toast } = await import("sonner");
      toast.error("Proszę wybrać pracownika.");
    }
  }

  // Проверка, есть ли данные
  const hasData = filteredPatients.length > 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Search
          placeholder={"Szukaj pracownika..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.specializationField}>
          <DropdownStas options={options} placeholder={options[0]} />
        </div>

        <BlueBtn cb={handleNextClick}>Wybierz i przejdź dalej</BlueBtn>
      </div>

      {/* Table */}
      <div
        style={{
          gridTemplateColumns: hasData ? "1fr 1fr" : "1fr",
          justifyItems: hasData ? "initial" : "center",
        }}
        className={styles.tableContainer}
      >
        {hasData ? (
          <>
            <div className={styles.column}>
              {leftFilteredData.map((item, index) => (
                <div
                  key={item.id}
                  className={index % 2 === 0 ? styles.row : styles.rowAlt}
                >
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.some((u) => u.id === item.id)}
                      onChange={() => handleUserSelect(item)}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                  <div className={styles.info}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.phone}>{item.phone}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.column}>
              {rightFilteredData.map((item, index) => (
                <div
                  key={item.id}
                  className={index % 2 === 0 ? styles.rowAlt : styles.row}
                >
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.some((u) => u.id === item.id)}
                      onChange={() => handleUserSelect(item)}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                  <div className={styles.info}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.phone}>{item.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noDataMessage}>Brak danych</div>
        )}
      </div>
    </div>
  );
}

export default GraphManagement;
