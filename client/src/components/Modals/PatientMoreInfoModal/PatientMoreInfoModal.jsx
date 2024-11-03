import styles from "../../../pages/Doctor/PatientInfo/PatientInfo.module.css"; // Path to styles
import BlueBorderBtn from "../../Buttons/BlueBorderBtn/BlueBorderBtn";
import Choice from "./../../Modal/Choice";
import plus from "../../../assets/img/plus.png";
import bucketBlue from "../../../assets/img/bucketBlue.png";

import useStore from './../../../data/store';

function PatientMoreInfoModal({ patient }) {
	const { setModalActive, setModalContent } = useStore();
  return (
    <div className={styles.profilInfo}>
      <div className={styles.mainInfo}>
        <div className={styles.oneThird}>
          <div>
            <label htmlFor="name">Imię</label>
            <input
              type="text"
              id="name"
              name="name"
              value={patient?.name || "UNKNOWN"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="surname">Nazwisko</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={patient?.surname || "UNKNOWN"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="pesel">PESEL</label>
            <input
              type="text"
              id="pesel"
              name="pesel"
              value={patient?.pesel || "UNKNOWN"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="phone">Telefon</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={patient?.phone || "UNKNOWN"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={patient?.email || "UNKNOWN"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="city">Miasto</label>
            <input
              type="text"
              id="city"
              name="city"
              value={patient?.city || "UNKNOWN"}
              readOnly
            />
          </div>
        </div>
        <div className={styles.oneThird}>
          <div>
            <label htmlFor="postcode">Kod pocztowy</label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={patient?.postcode || "UNKNOWN"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="address">Adres</label>
            <input
              type="text"
              id="address"
              name="address"
              value={patient?.address || "UNKNOWN"}
              readOnly
            />
          </div>
          <div className={styles.row}>
            <div>
              <label htmlFor="house-nr">Nr. Domu</label>
              <input
                type="text"
                id="house-nr"
                name="house-nr"
                value={patient?.houseNumber || "UNKNOWN"}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="flat-nr">Nr. Lokalu</label>
              <input
                type="text"
                id="flat-nr"
                name="flat-nr"
                value={patient?.flatNumber || "UNKNOWN"}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className={styles.oneThird}>
          <div>
            <label htmlFor="birth-date">Data urodzenia</label>
            <input
              type="text"
              id="birth-date"
              name="birth-date"
              value={patient?.birthDate || "UNKNOWN"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="gender">Płeć</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={patient?.gender || "UNKNOWN"}
              readOnly
            />
          </div>
          <div className={styles.row}>
            <div>
              <label htmlFor="height">Wzrost</label>
              <input
                type="text"
                id="height"
                name="height"
                value={patient?.height || "UNKNOWN"}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="weight">Waga</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={patient?.weight || "UNKNOWN"}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className={styles.allergy}>
          <div>
            <label htmlFor="allergy">Wpisz na co uczulenie</label>
            <input
              type="text"
              id="allergy"
              name="allergy"
              placeholder="Azelastin POS aerosol do nosa"
            />
            <BlueBorderBtn>
              <div className={styles.btnPlus}>
                <span>Nowe uczulenie </span>
                <img src={plus} alt="" />
              </div>
            </BlueBorderBtn>
          </div>
          <div>
            <BlueBorderBtn>
              <div className={styles.btnPlus}>
                <span>Usun uczulenie</span>
                <img src={bucketBlue} alt="" />
              </div>
            </BlueBorderBtn>
          </div>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <Choice cb1={() => (setModalActive(false))} choice1={"Anuluj"} choice2={"Aktualizuj"}></Choice>
      </div>
    </div>
  );
}

export default PatientMoreInfoModal;
