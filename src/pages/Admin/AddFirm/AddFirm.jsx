import { useState } from "react";
import Choice from "../../../components/Modal/Choice";
import styles from "./AddFirm.module.css";
import avatar from "../../../assets/img/profil.webp";
import plus from "../../../assets/img/plus.png";
import DropdownStas from "./../../../components/Dropdown/DropdownStas";
import useStore from "../../../data/store";
import AddVisitTypeModal from "../../../components/Modals/AddVisitType/AddVisitTypeModal";
import BlueBorderBtn from "../../../components/Buttons/BlueBorderBtn/BlueBorderBtn";
import RedBorderBtn from "../../../components/Buttons/RedBorderBtn/RedBorderBtn";
import { toast } from "sonner";

export default function AddFirm() {
  const { setModalActive, setModalContent } = useStore();
  const option = [
    "Usunięcie z powodu nieobecności",
    "Usunięcie z powodu rozwiązania umowy",
    "Usunięcie z powodu zaniedbania",
    "Kalendarz nullam non iaculis massa",
    "Nunc kalendarz aliquam metus",
  ];
  const [visitTypes, setVisitTypes] = useState([
    { id: "1", name: "Konsultacja ortopedyczna", price: 220.0, checked: true },
    { id: "2", name: "Kontrola po operacji", price: 0.0, checked: true },
  ]);

  function handleModal() {
    setModalActive(true);
    setModalContent(<AddVisitTypeModal onClick={addVisitType} />);
  }

  function addVisitType(newVisitType) {
    setVisitTypes((prevVisitTypes) => [...prevVisitTypes, newVisitType]);
  }

  function handleDeleteVisitType(id) {
    setVisitTypes((prevVisitTypes) =>
      prevVisitTypes.filter((type) => type.id !== id)
    );
  }

  const editModal = (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Czy na pewno chcesz
        <br /> edytować konto?
      </h1>

      <div className={styles.actions}>
        <BlueBorderBtn cb={() => setModalActive(false)}>Nie</BlueBorderBtn>
        <RedBorderBtn
          cb={() => toast.success("Informacje o profilu zostały zmienione.")}
        >
          Tak
        </RedBorderBtn>
      </div>
    </div>
  );
  function handleEditModal() {
    setModalActive(true);
    setModalContent(editModal);
  }

  function deleteAccountStatus() {
    toast.success("Profil został usunięty");
    setModalActive(false);
  }
  const modalContentDeleteAccount = (
    <>
      <h1>Usuwanie konta</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <DropdownStas placeholder={"Jakub Witold Jagoda"} />
        <DropdownStas placeholder={"Wpisz tekst"} options={option} />
        <Choice
          choice1={"Anuluj"}
          choice2={"Usuń"}
          cb1={() => setModalActive(false)}
          cb2={() => setModalContent(acceptDeleting)}
        ></Choice>
      </div>
    </>
  );
  const acceptDeleting = (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Czy na pewno chcesz <br /> Usunąć konto?
      </h1>
      <div className={styles.actions}>
        <BlueBorderBtn cb={() => setModalContent(modalContentDeleteAccount)}>
          Nie
        </BlueBorderBtn>
        <RedBorderBtn cb={deleteAccountStatus}>Tak</RedBorderBtn>
      </div>
    </div>
  );
  function handleDelete() {
    setModalActive(true);
    setModalContent(modalContentDeleteAccount);
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.profileSection}>
          <img className={styles.profileImage} src={avatar} alt="Profile" />
        </div>

        <div>
          <div className={styles.infoGridTwo}>
            <div className={styles.infoGroup}>
              <label>Nazwa firmy</label>
              <input type="text" placeholder="Wpisz nazwę" />
            </div>

            <div className={styles.infoGroup}>
              <label>Województwo</label>
              <input type="text" placeholder="Wielkopolskie" />
            </div>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoGroup}>
              <label>Miasto</label>
              <input type="text" placeholder="Poznań" />
            </div>

            <div className={styles.infoGroup}>
              <label>Kod pocztowy</label>
              <input type="text" placeholder="61-714" />
            </div>

            <div className={styles.infoGroup}>
              <label>Ulica</label>
              <input type="text" placeholder="Wpisz nazwę ulicy" />
            </div>

            <div className={styles.infoGroup}>
              <label>Numer budynku</label>
              <input type="text" placeholder="Wpisz numer budynku" />
            </div>

            <div className={styles.infoGroup}>
              <label>Numer NIP</label>
              <input type="text" placeholder="Wpisz numer NIP" />
            </div>
            <div className={styles.infoGroup}>
              <label>Telefon</label>
              <input type="tel" placeholder="555 666 777" />
            </div>
            <div className={styles.infoGroup}>
              <label>Email</label>
              <input type="email" placeholder="dariusz@gmail.com " />
            </div>
          </div>
        </div>

        <div className={styles.infoGridTwo}>
          <div className={styles.infoGroup}>
            <label>Typy wizyt</label>
            <div className={styles.dropdown}>
              <DropdownStas
                placeholder={"Wybierz typ wizyty"}
                options={["Typ nr.1", "Typ nr.2"]}
              />
            </div>
          </div>
          <div className={styles.infoGroup}>
            <label>Maksymalna liczba specjalizacji</label>
            <input type="email" placeholder="Typy wizyt" />
          </div>
        </div>

        <button onClick={handleModal} className={styles.addVisit}>
          Dodaj typ
          <img src={plus} alt="Add visit type" />
        </button>

        <div className={styles.buttonGroup}>
          <Choice
            choice1={"Usuń"}
            choice2={"Edytuj"}
            cb1={handleDelete}
            cb2={handleEditModal}
          />
        </div>
      </div>
    </div>
  );
}
