import { useState } from "react";
import Table from "../../../components/Table/Table";
import Tabs from "./../../../components/Buttons/Tabs/Tabs";
import { useNavigate } from "react-router-dom";

function Database() {
  const [activeTab, setActiveTab] = useState("Pacjenci");
  const navigate = useNavigate();

  function handleTabClick(name) {
    setActiveTab(name);
  }

  // Обработчик для кнопки
  const handleButtonClick = (id) => {
    navigate(`/database/${id}`); // Переход на новую страницу с ID
  };

  return (
    <>
      <Tabs
        buttons="Pacjenci,Lekarzy,Firmy"
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      <div>
        {activeTab === "Pacjenci" && (
          <Table
            columns="Search, Numer ID, Data rejestracji"
            data="name,id,date"
          />
        )}
        {activeTab === "Lekarzy" && (
          <Table
            columns="Search, Numer ID, Firma"
            data="name,id,firmName"
          />
        )}
        {activeTab === "Firmy" && (
          <Table
            columns="Search, Numer ID, Data rejestracji"
            data="firmName,id,date,button"
            buttonProps={{
              className: "myCustomButton",
              onClick: handleButtonClick,
              label: "Kontact", 
            }}
          />
        )}
      </div>
    </>
  );
}

export default Database;
