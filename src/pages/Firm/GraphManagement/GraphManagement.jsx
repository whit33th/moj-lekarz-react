import { useState } from "react";
import styles from "./GraphManagement.module.css";
import DropdownStas from "../../../components/Dropdown/DropdownStas";
import Search from "../../../components/UI/Search/Search";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";

import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'

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

  const allPatients = Array.from({ length: 25 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: i % 2 === 0 ? "Jan Bukalski" : "Dmitry Shak",
    phone: i % 2 === 0 ? "456-029-485" : "333-412-666",
  }));

  const options = ["Dentysta", "Psychotherapist", "Antroherapist"];

  const filteredPatients = allPatients.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm)
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

  const hasData = filteredPatients.length > 0;

  const { control, handleSubmit, watch } = useForm({

  })
  return (
    <div className={styles.container}>
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

      {}
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
        ) : (
          <div className={styles.noDataMessage}>Brak danych</div>
        )}
      </div>
    </div>
  );
}

export default GraphManagement;
