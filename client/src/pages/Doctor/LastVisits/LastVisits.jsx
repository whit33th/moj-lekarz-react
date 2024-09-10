import down from "../../../assets/img/down.png";
import search from "../../../assets/img/search.png";
import calendar from "../../../assets/img/calendar.png";
import styles from "./LastVisits.module.css";
import { userItems } from "../../../helpers/userItemList";
import PatientLastVisit from "../../../components/DoctorPage/PatientList/PatientLastVisit";
import Dropdown from "../../../components/Dropdown/Dropdown";

function LastVisits() {
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
          <span>Ostatnie wizyty</span>
        </span>
        <Dropdown
          selectedOption="09.23.2222 - 09.23.2222"
          color={"#A6DEF7"}
          options={["20-08-2003", "2"]}
          childrenLeft={<img src={calendar} alt="Sort" />}
        >
          <i className="bx bx-chevron-down"></i>
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

export default LastVisits;
