import { useState } from "react";
import moreInfo from "../../../assets/img/more-info.png";
import styles from "./MoreInfoButt.module.css";
import useStore from "../../../data/store";
import BlueBorderBtn from "../BlueBorderBtn/BlueBorderBtn";
import BlueBtn from "./../BlueBtn/BlueBtn";
import Dropdown from "./../../Dropdown/Dropdown";
import profil from "../../../assets/img/profil.webp";
import Choice from "./../../Modal/Choice";

const MoreInfoButtPatient = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setModalActive, setModalContent } = useStore();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const modalContentInfo = (
    <div className={styles.row}>
      <div className={styles.generalInfo}>
        <div>
          <h2>Ogólna informacja</h2>

          <div className={styles.infoTag}>
            <span>Godziny pracy:</span> <span> 08:30 - 16:45</span>
          </div>

          <div className={styles.infoTag}>
            <span>Rodzaj pracy:</span> <span>Konsultacja</span>
          </div>

          <div className={styles.infoTag}>
            <span>Sala:</span> <span>203</span>
          </div>
        </div>
        <BlueBorderBtn cb={() => setModalActive(false)}>Anuluj</BlueBorderBtn>
      </div>

      <div className={styles.employeeInfo}>
        <h2>Informacje pracownika</h2>

        <div className={styles.employeeDetails}>
          <div className={styles.topInfo}>
            <img src={profil} className={styles.employeeImage} alt="Employee" />
            <div>
              <p style={{ color: "#3E36B0" }}>Brat Solitko</p>
              <div>
                <p className={styles.phone}>
                  <span style={{ color: "#3E36B0" }}>Tel:</span>
                  <span>48 444 444 444</span>
                </p>
                <p className={styles.email}>
                  <span style={{ color: "#3E36B0" }}>Email:</span>
                  <span>deasdasd@dgs.ccc</span>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.botInfo}>
            <div>
              <span>Miasto:</span>
              <span>City</span>
            </div>
            <div>
              <span>Adres:</span>
              <span>Sdasda 2</span>
            </div>
            <div>
              <span>Data urodzenia:</span>
              <span>2932.33.23</span>
            </div>
            <div>
              <span>Plec:</span> <span>M</span>
            </div>
            <div>
              <span>Wzrost:</span> <span>17 cm</span>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <BlueBtn>Edytuj</BlueBtn>
          <BlueBorderBtn cb={() => setModalContent(modalContentDeleteAccount)}>
            Usuń
          </BlueBorderBtn>
        </div>
      </div>
    </div>
  );
  const modalContentDeleteAccount = (
    <>
      <h1>Usuwanie konta</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Dropdown></Dropdown>
        <Dropdown></Dropdown>
        <Choice
          choice1={"Anuluj"}
          choice2={"Usuń"}
          cb1={() => modalContentInfo()}
        ></Choice>
      </div>
    </>
  );
  const modalContentMessage = (
    <>
      <h1>Nowa Wiadomość</h1>
      <textarea
        className={styles.textarea}
        placeholder="Wpisz tekst"
      ></textarea>
      <div className={styles.flex}>
        <Choice
          choice1={"Anuluj"}
          choice2={"Wyślij"}
          cb1={() => (setModalActive(false))}
        ></Choice>
      </div>
    </>
  );
  const openInfoModal = () => {
    setModalActive(true);
    setModalContent(modalContentInfo);
  };
  const openNotificationModal = () => {
    setModalActive(true);
    setModalContent(modalContentMessage);
  };

  const patientId = id || "unknown"; // Handle undefined id here
  console.log("Patient ID in MoreInfoButt:", patientId); // Add this log for debugging

  return (  
    <div
      className={styles.moreInfoButt}
      onClick={toggleModal}
      style={{ cursor: "pointer" }}
    >
      <img src={moreInfo} alt="More Info" />
      {isModalOpen && (
        <div className={styles.moreInfoModal}>
          <button
            onClick={openInfoModal}
            className={styles.hoverOpacity}
          >
            <p style={{ fontWeight: "500" }}>Informacja</p>
          </button>

          <button
            onClick={openNotificationModal}
            className={styles.hoverOpacity}
          >
            <p style={{ fontWeight: "500" }}>Wiadomość</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreInfoButtPatient;
