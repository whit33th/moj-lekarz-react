import styles from "./Workers.module.css";
import tablecss from "../../../components/Table/Table.module.css";

import searchIco from "../../../assets/img/search.png";
import down from "../../../assets/img/down.png";
import filters from "../../../assets/img/filters.png";
import { userItems } from "../../../helpers/userItemList";
import { useState } from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import WorkerItem from "../../../components/FirmPage/map/WorkerItem";
import Table from "./../../../components/Table/Table";
import MoreInfoButtPatient from "../../../components/Buttons/MoreInfoButt/MoreInfoButtFirm";

function Workers() {
  const [activeTab, setActiveTab] = useState("Lista pracowników");

  function handleActiveTab(tab) {
    setActiveTab(tab);
    console.log("date");
  }

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
      <Table
        columns={columns}
        data={tableData}
        showImage={true}
        together={true}
      />
    </div>
  );
}

export default Workers;
