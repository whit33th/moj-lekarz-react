import styles from "./PatientList.module.css";

import searchIco from "../../../assets/img/search.png";
import down from "../../../assets/img/down.png";
import filters from "../../../assets/img/filters.png";
import PatientItem from "../../../components/DoctorPage/PatientList/PatientItem";
import { userItems } from "../../../helpers/userItemList";
import Dropdown from "../../../components/Dropdown/Dropdown";

function PatientList() {
  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <Dropdown
          selectedOption="Sortuj"
          color={"#A6DEF7"}
          options={["1123123123123123", "2"]}
        >
          <i className="bx bx-chevron-down"></i>
        </Dropdown>
        <span className={styles.calendarNavbarDate}>
          <span>Lista pacjentów</span>
        </span>
        <Dropdown
          selectedOption="Filtruj"
          color={"#A6DEF7"}
          options={["1", "2"]}
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userItems.map((userItem, index) => (
              <PatientItem
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

export default PatientList;
