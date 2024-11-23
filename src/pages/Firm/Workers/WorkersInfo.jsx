import { useState } from "react";
import Choice from "../../../components/Modal/Choice";
import styles from "./WorkersInfo.module.css";
import avatar from "../../../assets/img/profil.webp";
import plus from "../../../assets/img/plus.png";
import bucket from "../../../assets/img/bucketBlue.png";
import DropdownStas from "./../../../components/Dropdown/DropdownStas";
import { useNavigate } from "react-router-dom";
import { pageConfig } from "../../../config/config";
import useStore from "../../../data/store";
import AddVisitTypeModal from "../../../components/Modals/AddVisitType/AddVisitTypeModal";
import BlueBorderBtn from "../../../components/Buttons/BlueBorderBtn/BlueBorderBtn";
import RedBorderBtn from "../../../components/Buttons/RedBorderBtn/RedBorderBtn";
import { toast } from "sonner";
import star from "../../../assets/img/Star.svg";
import starGrey from "../../../assets/img/Star 6.svg";
import { useForm } from 'react-hook-form'

export default function WorkersInfo() {
  const { control, handleSubmit, watch } = useForm({

  })
  const navigate = useNavigate();
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
    setModalContent(<AddVisitTypeModal onAddVisitType={addVisitType} />);
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
        <BlueBorderBtn>Nie</BlueBorderBtn>
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
        <DropdownStas control={control} name={"."} placeholder={"Jakub Witold Jagoda"} />
        <DropdownStas control={control} name={".."} placeholder={"Wpisz tekst"} options={option} />
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
      <button
        onClick={() => navigate(pageConfig.firm.workers)}
        className={styles.returnButton}
      >
        Powrót
      </button>

      <h1 className={styles.title}>Informacje o pracowniku</h1>

      <div className={styles.profileSection}>
        
          <img className={styles.profileImage} src={avatar} alt="Profile" />
        
        <h1 className={styles.profileName}>Tomasz Jankowski</h1>
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              key={i}
              src={i < 3 ? star : starGrey}
              alt="star"
              className={styles.imgNameBlockStar}
            />
          ))}
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoGroup}>
          <label>Imię</label>
          <input type="text" value="Tomasz" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>Nazwisko</label>
          <input type="text" value="Jankowski" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>PESEL</label>
          <input type="text" value="08058615499" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>Data urodzenia</label>
          <input type="text" value="12.01.1991" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>Telefon</label>
          <input type="text" value="555 666 777" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>Email</label>
          <input type="text" value="jantom@gmail.com" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>Płeć</label>
          <input type="text" value="Mężczyzna" readOnly />
        </div>
      </div>

      <div className={styles.addressSection}>
        <div className={styles.addressGrid}>
          <div className={styles.infoGroup}>
            <label>Miasto</label>
            <input type="text" value="Wrocław" readOnly />
          </div>

          <div className={styles.infoGroup}>
            <label>Kod pocztowy</label>
            <input type="text" value="60-131" readOnly />
          </div>

          <div className={styles.infoGroup}>
            <label>Ulica</label>
            <input type="text" value="ul.Szamarzewskiego" readOnly />
          </div>

          <div className={styles.infoRowDuplex}>
            <div className={styles.infoGroup}>
              <label>Nr Domu</label>
              <input type="text" value="98" readOnly />
            </div>

            <div className={styles.infoGroup}>
              <label>Nr Lokalu</label>
              <input type="text" value="131" readOnly />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.positionSection}>
        <div className={styles.infoGroup}>
          <label>Stanowisko</label>
          <DropdownStas control={control} name={"..."} options={["zxc", "zxs"]} />
        </div>
      </div>

      <div className={styles.visitsSection}>
        {visitTypes.length > 0 && (
          <>
            <h3>Typy wizyt:</h3>
            {visitTypes.map((visit) => (
              <div key={visit.id} className={styles.visitType}>
                <span>
                  {visit.name} - {visit.price.toFixed(2)} zł
                </span>
                <img
                  src={bucket}
                  alt="Delete visit type"
                  onClick={() => handleDeleteVisitType(visit.id)}
                  className={styles.deleteIcon}
                />
              </div>
            ))}
          </>
        )}
        <button onClick={handleModal} className={styles.addVisit}>
          Dodaj typ
          <img src={plus} alt="Add visit type" />
        </button>
      </div>

      <div className={styles.buttonGroup}>
        <Choice
          choice1={"Usuń"}
          choice2={"Edytuj"}
          cb1={handleDelete}
          cb2={handleEditModal}
        />
      </div>
    </div>
  );
}
