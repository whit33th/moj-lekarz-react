import styles from "../../../pages/Doctor/PatientInfo/PatientInfo.module.css";

function PatientMoreInfoModal({ patientInfo }) {
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
              value={patientInfo.name || "Brak"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="surname">Nazwisko</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={patientInfo?.surname || "Brak"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="pesel">PESEL</label>
            <input
              type="text"
              id="pesel"
              name="pesel"
              value={patientInfo?.pesel || "Brak"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="phone">Telefon</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={patientInfo?.phone || "Brak"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={patientInfo?.email || "Brak"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="city">Miasto</label>
            <input
              type="text"
              id="city"
              name="city"
              value={patientInfo?.city || "Brak"}
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
              value={patientInfo?.postCode || "Brak"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="address">Adres</label>
            <input
              type="text"
              id="address"
              name="address"
              value={patientInfo?.street || "Brak"}
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
                value={patientInfo?.house || "Brak"}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="flat-nr">Nr. Lokalu</label>
              <input
                type="text"
                id="flat-nr"
                name="flat-nr"
                value={patientInfo?.flat || "Brak"}
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
              value={patientInfo?.birthday || "Brak"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="gender">Płeć</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={patientInfo?.gender || "Brak"}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientMoreInfoModal;
