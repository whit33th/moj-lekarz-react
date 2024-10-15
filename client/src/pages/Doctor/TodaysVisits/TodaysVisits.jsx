import down from "../../../assets/img/down.png";
import search from "../../../assets/img/search.png";
import follow from "../../../assets/img/follow.png";
import styles from "./TodaysVisits.module.css";
import { userItems } from "../../../helpers/userItemList";
import PatientLastVisit from "../../../components/DoctorPage/PatientList/PatientLastVisit";
import { NavLink } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Table from '../../../components/Table/Table'

function TodaysVisits() {
  const tableData = userItems.map((item) => ({
    img: item.img,
    name: item.name,
    id: item.id,
    
    birthday: item.birthDate,
  }));

  const columns = [
    
    {
      header: "Search",
      render: (item) => (
        <div className={styles.nameTd}>
          {item.img && (
            <img src={item.img} alt="Avatar" className={styles.round} />
          )}
          <div className={styles.userInfo}>
             <p>{item.name || "-"}</p>
             
          </div>
        </div>
      ),
    },
    {header: 'Numer ID', dataKey: 'id'},
    {header: 'Data', render: (item) => (item.birthday)},
    {header: 'Czas', render: () => (
      <div>
        <div>
          <span className={styles.receptId}>10:30</span>
        </div>
      </div>
    ),}
   
  ];
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

      <Table
        columns={columns}
        data={tableData}
        showImage={true}
        together={true}
      />
      
    </div>
  );
}

export default TodaysVisits;
