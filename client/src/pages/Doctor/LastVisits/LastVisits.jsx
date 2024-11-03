import tablecss from "../../../components/Table/Table.module.css";
import calendar from "../../../assets/img/calendar.png";
import styles from "./LastVisits.module.css";
import { userItems } from "../../../helpers/userItemList";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Table from '../../../components/Table/Table'



function LastVisits() {
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
        <div className={tablecss.nameTd}>
          {item.img && (
            <img src={item.img} alt="Avatar" className={tablecss.round} />
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
          <span className={tablecss.receptId}>10:30</span>
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
          <span>Ostatnie wizyty</span>
        </span>
        <Dropdown
          color={"#A6DEF7"}
          options={["08.05.2024 - 14.05.2024", "08.06.2024 - 14.06.2024"]}
          childrenLeft={<img src={calendar} alt="Sort" />}
        >
          <i className="bx bx-chevron-down"></i>
        </Dropdown>
      </div>

      <div className={styles.tableContainer}>
        <Table
          inputPlaceholder={"Szukaj pacjenta..."}
          columns={columns}
          data={tableData}
          showImage={true}
          together={true}
        />
      </div>
    </div>
  );
}

export default LastVisits;
