import { useState } from "react";
import Table from "../../../components/Table/Table";
import Tabs from "./../../../components/Buttons/Tabs/Tabs";

import styles from "./Database.module.css";
import { userItems } from "../../../helpers/userItemList";
import { Link } from "react-router-dom";

function Database() {
  const [activeTab, setActiveTab] = useState("Pacjenci");

  const tableData1 = userItems.map((item) => ({
    img: item.img,
    name: item.name,
    id: item.id,
    gender: item.gender,
    birthday: item.birthDate,
  }));

  const columns1 = [
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
    {
      header: "Numer ID",
      dataKey: "id",
    },
    {
      header: "Plec",
      dataKey: "gender",
    },
    {
      header: "Data ur.",
      dataKey: "birthday",
    },
    {
      header: "Data rejestracji",
      dataKey: "birthday",
    },
  ];
  const tableData2 = userItems.map((item) => ({
    img: item.img,
    name: item.name,
    id: item.id,
    gender: item.gender,
    firmName: item.firmName,
  }));

  const columns2 = [
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
    {
      header: "Nazwa firmy",
      dataKey: "firmName",
    },
    {
      header: "Numer ID",
      dataKey: "id",
    },
    {
      header: "Data ur.",
      dataKey: "birthday",
    },
    {
      header: "Data rejestracji",
      dataKey: "birthday",
    },
  ];
  const tableData3 = userItems.map((item) => ({
    img: item.img,
    name: item.name,
    id: item.id,
    gender: item.gender,
    firmName: item.firmName,
    date: item.date,
  }));

  const columns3 = [
    {
      header: "Search",
      searchId: "firmName",
      render: (item) => (
        <div className={styles.nameTd}>
          {item.img && (
            <img src={item.img} alt="Avatar" className={styles.round} />
          )}
          <div className={styles.userInfo}>
            <p>{item.firmName || "-"}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Numer ID",
      dataKey: "id",
    },
    {
      header: "Data rejstracji",
      dataKey: "date",
    },
    {
      render: (item) => (
        <Link to={`/database/${item.id}`} className={styles.myCustomButton}>
          Kontakt
        </Link>
      ),
    },
  ];

  function handleTabClick(name) {
    setActiveTab(name);
  }

  return (
    <>
      <Tabs
        buttons="Pacjenci,Lekarzy,Firmy"
        activeTab={activeTab}
        onTabClick={handleTabClick}
        storageKey="databaseTabs"
      />

      <div>
        {activeTab === "Pacjenci" && (
          <>
            <Table
              columns={columns1}
              data={tableData1}
              showImage={true}
              together={true}
            />
          </>
        )}
        {activeTab === "Lekarzy" && (
          <Table
            columns={columns2}
            data={tableData2}
            showImage={true}
            together={true}
          />
        )}
        {activeTab === "Firmy" && (
          <Table
            columns={columns3}
            data={tableData3}
            showImage={true}
            together={true}
          />
        )}
      </div>
    </>
  );
}

export default Database;
