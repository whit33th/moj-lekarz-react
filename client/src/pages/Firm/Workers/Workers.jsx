import styles from "./Workers.module.css";

import searchIco from "../../../assets/img/search.png";
import down from "../../../assets/img/down.png";
import filters from "../../../assets/img/filters.png";
import { userItems } from "../../../helpers/userItemList";
import { useState } from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import WorkerItem from "../../../components/FirmPage/map/WorkerItem";

function Workers() {
  const [activeTab, setActiveTab] = useState("Lista pracowników");

  function handleActiveTab(tab) {
    setActiveTab(tab);
    console.log("date");
  }

  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <Dropdown
          defaultOption="Sortuj"
          selectedOptionChanging={false}
          color={"#A6DEF7"}
          options={[
            "Od A do Z",
            "Od Z do A",
            "Najpierw mężczyźni",
            "Najpierw kobiety",
            "Najpierw starsi",
            "Najpierw młodsi",
          ]}
          listStyle="elipse"
        >
          <i className="bx bx-chevron-down"></i>
        </Dropdown>
        <div className={`${styles.infoNavbarButt} ${styles.itemsCenter}`}>
          <span
            className={`${styles.tCenter} 
					${activeTab === "Lista pracowników" ? styles.active : ""}`}
            onClick={() => handleActiveTab("Lista pracowników")}
          >
            Lista pracowników
          </span>

          <span
            className={`${styles.tCenter} 
					${activeTab === "Zarządzanie" ? styles.active : ""}`}
            onClick={() => handleActiveTab("Zarządzanie")}
          >
            Zarządzanie
          </span>
        </div>
        <Dropdown
          defaultOption="Filtruj"
          color={"#A6DEF7"}
          options={["1", "2"]}
          selectedOptionChanging={false}
        >
          <img src={filters} alt="" />
        </Dropdown>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.shadow}>
          <thead>
            <tr>
              <th>
                <div className={styles.top}>
                  <div className={styles.clientSearch}>
                    <form className={styles.search} action="" method="post">
                      <img src={searchIco} alt="search" />
                      <input
                        className={styles.searchInput}
                        placeholder="Szukaj pacjenta..."
                        type="text"
                        name="search"
                        id="client-search"
                      />
                    </form>
                  </div>
                </div>
              </th>
              <th>Numer ID</th>
              <th>Płeć</th>
              <th>
                <button
                  className={`${styles.buttDef}  
								${styles.addButton}
								${styles.fillBlue}`}
                  id="add-prescriptions"
                >
                  Dodaj
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {userItems.map((userItem, index) => (
              <WorkerItem
                key={index}
                img={userItem.img}
                name={userItem.name}
                id={userItem.id}
                gender={userItem.gender}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workers;
