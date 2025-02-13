import styles from "./Workers.module.css";
import tablecss from "../../../components/Table/Table.module.css";
import plus from "@assets/img/plus.png";
import filters from "@assets/img/filters.png";
import { useState } from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Table from "./../../../components/Table/Table";
import MoreInfoButtFirm from "../../../components/Buttons/MoreInfoButt/MoreInfoButtFirm";
import useStore from "../../../data/store";
import AddWorkersModal from "../../../components/Modals/AddWorkersModal/AddWorkersModal";
import Tabs from "../../../components/Buttons/Tabs/Tabs";
import AddSpecializationModal from "../../../components/Modals/AddSpecializationModal/AddSpecializationModal";
import useGetWorkersList from "../../../api/hooks/ClinicHooks/useGetWorkersList";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import grey from "@assets/img/grey.png";

function Workers() {
  const [activeTab, setActiveTab] = useState("Lista pracowników");
  const { setModalActive, setModalContent } = useStore();
  const [specializations, setSpecializations] = useState([]);
  const { data: clinic } = useGetUserInfo();
  const { data, isLoading } = useGetWorkersList({ clinicId: clinic?.id });

  
  const tableData =
    data?.doctors?.map((doctor) => ({
      img: doctor.user.photo || grey,
      name: `${doctor.user.first_name} ${doctor.user.last_name}`,
      id: doctor.id,
      gender: doctor.user.gender,
      specialty: doctor.specialty.name,
    })) || [];

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
    { header: "Specjalizacja", dataKey: "specialty" },
    {
      header: (
        <img
          onClick={handleAddWorkersModal}
          className={styles.plus}
          src={plus}
          alt="add"
        />
      ),
      render: (item) => (
        <MoreInfoButtFirm
          id={item.id}
          onClick={() => console.log(item.id)}
          label="More Info"
        />
      ),
    },
  ];

  function handleActiveTab(tab) {
    setActiveTab(tab);
  }

  function handleAddWorkersModal() {
    setModalActive(true);
    setModalContent(<AddWorkersModal />);
  }

  function handleModal() {
    setModalActive(true);
    setModalContent(
      <AddSpecializationModal onAddSpecialization={handleAddSpecialization} />
    );
  }

  function handleAddSpecialization(newSpecialization) {
    setSpecializations([...specializations, newSpecialization]);
  }

  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <Tabs
          onTabClick={handleActiveTab}
          buttons={"Lista pracowników, Zarządzanie"}
          activeTab={activeTab}
          storageKey="WorkersNavbar"
        />
        
      </div>
      {activeTab === "Lista pracowników" ? (
        <Table
          loading={isLoading}
          columns={columns}
          data={tableData}
          showImage={true}
          together={true}
          inputPlaceholder="Szukaj pracownika..."
        />
      ) : (
        <>
          <div>
            <h1 style={{ textAlign: "center" }}>
              Wybierz specjalizacje, które są dostępne w<br /> Twojej placówce
              medycznej
            </h1>
            <button onClick={handleModal} className={styles.addVisit}>
              Dodaj specjalizacje
              <img src={plus} alt="Add visit type" />
            </button>
          </div>
          <div className={styles.grid}>
            {specializations.map((specialization, index) => (
              <div key={index} className={styles.specializationCard}>
                <p>{specialization.specialty}</p>
                <br />
                <div className={styles.flex}>
                  {specialization.visitTypes.map((visit, index) => (
                    <div key={index}>
                      <span>{visit.type} </span>
                      <span>{visit.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Workers;
