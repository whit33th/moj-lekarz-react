import styles from "./Recipes.module.css";
import tablecss from "../../../components/Table/Table.module.css";
import useStore from "../../../data/store";
import AddRecipesModal from "../../../components/Modals/AddRecipesModal/AddRecipesModal";
import Table from "../../../components/Table/Table";
import useGetPrescriptions from "@hooks/DoctorHooks/useGetPrescriptions";
import Pagination from "../../../components/UI/Pagination/Pagination";
import { useState } from "react";

function PatientList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetPrescriptions({
    page: page,
    sort: "DESC",
  });

  const { setModalActive, setModalContent } = useStore();
  const prescriptions = data?.active || [];
  const totalPages = data?.pages;

  const tableData = prescriptions?.map((prescription) => ({
    img: prescription?.patient?.user?.photo || "zdrowie.png",
    name:
      prescription?.patient?.user?.first_name +
        " " +
        prescription?.patient?.user?.last_name || "Nieznane",
    createdDate: prescription?.createdAt || "Brak",
    expirationDate: prescription?.expiration_date || "Brak",
    code: prescription?.code || "Błąd",
    medications: prescription?.medications || [],
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
            <p>{item.name}</p>
            <p>
              {item.createdDate?.slice(0, 10)} -{" "}
              {item.expirationDate?.slice(0, 10)}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Info",
      render: (prescription) => (
        <div>
          {prescription.medications?.map((medication, index) => (
            <p key={index}>{medication.name}</p>
          ))}
        </div>
      ),
    },
    {
      header: (
        <button
          onClick={handleOpenModal}
          className={`${styles.buttDefold} ${styles.fillBlue}`}
          id="add-prescriptions"
        >
          Dodaj
        </button>
      ),
      render: (prescription) => (
        <div>
          <div>
            <span className={tablecss.receptId}>{prescription.code}</span>
          </div>
        </div>
      ),
    },
  ];

  function handleOpenModal() {
    setModalContent(<AddRecipesModal />);
    setModalActive(true);
  }

  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <span className={styles.calendarNavbarDate}>
          <span>Lista receptów</span>
        </span>
      </div>

      <Table
        loading={isLoading}
        inputPlaceholder="Szukaj pacjenta..."
        columns={columns}
        data={tableData}
        showImage={true}
        together={true}
      />

      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default PatientList;
