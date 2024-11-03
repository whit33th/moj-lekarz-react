import styles from "./Recipes.module.css";
import tablecss from "../../../components/Table/Table.module.css";
import { userItems } from "../../../helpers/userItemList";
import useStore from "../../../data/store";
import AddRecipesModal from "../../../components/Modals/AddRecipesModal/AddRecipesModal";
import Table from "../../../components/Table/Table";

function PatientList() {
  const { setModalActive, setModalContent } = useStore();

  const tableData = userItems.map((item) => ({
    img: item.img,
    name: item.name,
    id: item.id,
    gender: item.gender,
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
            <p>
              {item.birthday || "-"} - {item.birthday || "-"}
            </p>
          </div>
        </div>
      ),
    },
    { header: "Info", dataKey: <div></div> }, // ID column
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
      render: () => (
        <div>
          <div>
            <span className={tablecss.receptId}>3223</span>
          </div>
        </div>
      ),
    }, // Gender column
  ];

  // Функция для открытия модального окна
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
