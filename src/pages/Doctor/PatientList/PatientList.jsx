import styles from "./PatientList.module.css";
import tablecss from "../../../components/Table/Table.module.css";
import filters from "../../../assets/img/filters.png";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Table from "../../../components/Table/Table";
import MoreInfoButtPatient from "../../../components/Buttons/MoreInfoButt/MoreInfoButt";
import { userItems } from "../../../helpers/userItemList";

function PatientList() {
  const tableData = userItems.map((item) => ({
    img: item.img,
    name: item.name,
    id: item.id,
    gender: item.gender,
  }));

  const columns = [
    {
      header: "Search",
      render: (item) => (
        <div className={tablecss.nameTd}>
          {item.img && (
            <img src={item.img} alt="Avatar" className={tablecss.round} />
          )}
          <span>{item.name || "-"}</span>
        </div>
      ),
    },
    { header: "ID", dataKey: "id" },
    { header: "Płeć", dataKey: "gender" },
    {
      header: "Akcja",
      render: (item) => (
        <MoreInfoButtPatient
          id={item.id}
          onClick={() => console.log(item.id)}
          label="More Info"
        />
      ),
    },
  ];

  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        
        <span className={styles.calendarNavbarDate}>
          <span>Lista pacjentów</span>
        </span>
        <Dropdown
          defaultOption="Filtruj"
          selectedOptionChanging={false}
          color={"#A6DEF7"}
          options={["1", "2"]}
          type={"filter"}
        >
          <img src={filters} alt="" />
        </Dropdown>
      </div>

      <Table
        inputPlaceholder="Szukaj pacjenta..."
        columns={columns}
        data={tableData}
        showImage={true}
        together={true}
      />
    </div>
  );
}

export default PatientList;
