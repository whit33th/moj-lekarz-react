import styles from "./VisitModal.module.css";
import profil from "../../../assets/img/profil.webp";
import BlueBorderBtn from "../../Buttons/BlueBorderBtn/BlueBorderBtn";

import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import useStore from "../../../data/store";
import { useNavigate } from "react-router-dom";

function VisitModal() {
  const { setModalActive } = useStore();
  const navigate = useNavigate();
  function closeMainModal() {
    setModalActive(false);
  }
  return (
    <div className={styles.row}>
      <div className={styles.generalInfo}>
        <div>
          <h2>Informacja o wizycie</h2>

          <div className={styles.infoTag}>
            <span>Godziny pracy:</span> <span> 08:30 - 16:45</span>
          </div>

          <div className={styles.infoTag}>
            <span>Pacjent:</span> <span>Andrzej Witold-Jagoda</span>
          </div>

          <div className={styles.infoTag}>
            <span>Rodzaj wizyty:</span> <span>Konsultacja</span>
          </div>
          <div className={styles.infoTag}>
            <span>Adres:</span> <span>Ul. Przelewska 3</span>
          </div>
          <div className={styles.infoTag}>
            <span>Sala:</span> <span>203</span>
          </div>
        </div>
        <BlueBorderBtn>Lista receptur</BlueBorderBtn>
      </div>

      <div className={styles.employeeInfo}>
        <h2>Informacje o pacjencie</h2>

        <div className={styles.employeeDetails}>
          <div className={styles.topInfo}>
            <img src={profil} className={styles.employeeImage} alt="Employee" />
            <div>
              <p style={{ color: "#3E36B0" }}>Andrzej Witold-Jagoda</p>
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
            <div className={styles.Comments}>
              <span>Uwagi:</span>{" "}
              <li style={{ listStyle: "none" }}>
                <ul>Jest uczulony na Ibupron</ul>
                <ul>Jest uczulony na Klatra</ul>
              </li>
            </div>
            <div>
              <span>Miasto:</span>
              <span>Wrocław</span>
            </div>
            <div>
              <span>Adres:</span>
              <span>ul.Szamarzewskiego 17/131</span>
            </div>
            <div>
              <span>Data urodzenia:</span>
              <span>28.08.1993</span>
            </div>
            <div>
              <span>Plec:</span> <span>Mężczyzna</span>
            </div>
            <div>
              <span>Wzrost:</span> <span>183 cm.</span>
            </div>
            <div>
              <span>Waga:</span> <span>79 kg.</span>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <BlueBtn cb={() => navigate("/patient-info/890127650")}>
            Więcej informacji
          </BlueBtn>
        </div>
      </div>
    </div>
  );
}

export default VisitModal;
