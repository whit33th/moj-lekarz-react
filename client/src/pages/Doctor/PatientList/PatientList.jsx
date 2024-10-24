import styles from "./PatientList.module.css";

import filters from "../../../assets/img/filters.png";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Table from '../../../components/Table/Table';
import MoreInfoButt from '../../../components/Buttons/MoreInfoButt/MoreInfoButt';
import { userItems } from "../../../helpers/userItemList";

function PatientList() {
  const tableData = userItems.map((item) => ({
    img: item.img,
    name: item.name,
    id: item.id,
    gender: item.gender
  }));

  
  const columns = [
  { 
    header: "Search",
    render: (item) => (
      <div className={styles.nameTd}>
        {item.img && (
          <img  
            src={item.img} 
            alt="Avatar" 
            className={styles.round}
          />
        )}
        {item.name || "-"}
      </div>
    )
  },
  { header: "ID", dataKey: "id" },       
  { header: "Płeć", dataKey: "gender" }, 
  { 
    header: "Akcja", 
    render: (item) => (
      <MoreInfoButt id={item.id} onClick={() => console.log(item.id)} label="More Info" />
    )
  } 
];


  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <Dropdown
          defaultOption="Sortuj"
          selectedOptionChanging={false}
          color={"#A6DEF7"}
          options={["Od A do Z", "Od Z do A", 'Najpierw mężczyźni', 'Najpierw kobiety', 'Najpierw starsi', 'Najpierw młodsi']}
          listStyle='elipse'
        />
        <span className={styles.calendarNavbarDate}>
          <span>Lista pacjentów</span>
        </span>
        <Dropdown
          defaultOption="Filtruj"
          selectedOptionChanging={false}
          color={"#A6DEF7"}
          options={["1", "2"]}
          type={'filter'}
        >
          <img src={filters} alt="" />
        </Dropdown>
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

export default PatientList;
