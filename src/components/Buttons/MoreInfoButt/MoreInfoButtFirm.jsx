import { useState } from "react";
import moreInfo from "../../../assets/img/more-info.png";
import styles from "./MoreInfoButt.module.css";
import useStore from "../../../data/store";
import BlueBorderBtn from "../BlueBorderBtn/BlueBorderBtn";
import BlueBtn from "./../BlueBtn/BlueBtn";
import profil from "../../../assets/img/profil.webp";
import Choice from "./../../Modal/Choice";
import DropdownStas from "./../../Dropdown/DropdownStas";
import RedBorderBtn from "./../RedBorderBtn/RedBorderBtn";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import clip from "../../../assets/img/clip.png";

const MoreInfoButtPatient = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setModalActive, setModalContent } = useStore();
  const navigate = useNavigate();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const option = [
    "Usunięcie z powodu nieobecności",
    "Usunięcie z powodu rozwiązania umowy",
    "Usunięcie z powodu zaniedbania",
    "Kalendarz nullam non iaculis massa",
    "Nunc kalendarz aliquam metus",
  ];
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
        <BlueBorderBtn cb={() => setModalContent(modalContentDeleteAccount)}>
          Usuń
        </BlueBorderBtn>
      </div>

      <div className={styles.employeeInfo}>
        <div className={styles.employeeDetails}>
          <h2>Informacje pracownika</h2>
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
          <BlueBtn cb={() => navigate(`/workers/id`)}>Edytuj</BlueBtn>
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
        <DropdownStas placeholder={"Jakub Witold Jagoda"} />
        <DropdownStas placeholder={"Wpisz tekst"} options={option} />
        <Choice
          choice1={"Anuluj"}
          choice2={"Usuń"}
          cb1={() => setModalContent(modalContentInfo)}
          cb2={() => setModalContent(acceptDeleting)}
        ></Choice>
      </div>
    </>
  );
  const modalContentMessage = (
    <>
      <h1>Nowa Wiadomość</h1>

      <div className={styles.textareaDiv}>
        <textarea className={styles.textarea} placeholder="Wpisz tekst" />
        <img className={styles.clip} src={clip} alt="" />
      </div>

      <div className={styles.flex}>
        <Choice
          choice1={"Anuluj"}
          choice2={"Wyślij"}
          cb2={() => toast.success("Wiadomość została wysłana.")}
          cb1={() => setModalActive(false)}
        ></Choice>
      </div>
    </>
  );

  function operationStatus() {
    const status = Math.random() < 0.5;

    status === true
      ? toast.success("Profil został usunięty :(")
      : toast.error("Error");

    setModalActive(false);
  }

  const acceptDeleting = (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Czy na pewno chcesz <br /> Usunąć konto?
      </h1>
      <div className={styles.actions}>
        <BlueBorderBtn cb={() => setModalContent(modalContentDeleteAccount)}>
          Nie
        </BlueBorderBtn>
        <RedBorderBtn cb={operationStatus}>Tak</RedBorderBtn>
      </div>
    </div>
  );
  const handleNavigate = () => {
    navigate("/workers/id");
  };
  const openNotificationModal = () => {
    setModalActive(true);
    setModalContent(modalContentMessage);
  };

  const patientId = id || "unknown";
  console.log("Patient ID in MoreInfoButt:", patientId);
  return (
    <div
      className={styles.moreInfoButt}
      onClick={toggleModal}
      style={{ cursor: "pointer" }}
    >
      <img src={moreInfo} alt="More Info" />
      {isModalOpen && (
        <div className={styles.moreInfoModal}>
          <button onClick={handleNavigate} className={styles.hoverOpacity}>
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
