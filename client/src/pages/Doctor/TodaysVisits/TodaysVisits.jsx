import down from "../../../assets/img/down.png";
import search from "../../../assets/img/search.png";
import follow from "../../../assets/img/follow.png";
import styles from "./TodaysVisits.module.css";
import { userItems } from "../../../helpers/userItemList";
import PatientLastVisit from "../../../components/DoctorPage/PatientList/PatientLastVisit";
import { NavLink } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";

function TodaysVisits() {
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
        <span className={styles.calendarNavbarDate}>
          <span>Dzisiejsze wizyty</span>
        </span>

        <NavLink to="/calendar">
          <div className={`${styles.calendarNavbarButt} ${styles.itemsCenter}`}>
            <span className={styles.followLink}>Przejdź do kalendarza</span>
            <div className={styles.icoDiv}>
              <img src={follow} />
            </div>
          </div>
        </NavLink>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.shadow}>
          <thead>
            <tr>
              <th>
                <div className={styles.top}>
                  <div className={styles.clientSearch}>
                    <form className={styles.search} action="" method="post">
                      <img src={search} alt="search" />
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
              <th>Data</th>
              <th>Czas</th>
            </tr>
          </thead>
          <tbody>
            {userItems.map((u, i) => (
              <PatientLastVisit
                key={i}
                name={u.name}
                id={u.id}
                date={u.date}
                time={u.time}
                img={u.img}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodaysVisits;
