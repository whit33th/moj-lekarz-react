import profilImage from "../../../assets/img/profil.webp";
import confirmedImage from "../../../assets/img/confirmed.png";
import unconfirmedImage from "../../../assets/img/unconfirmed.png";

import styles from "./Profil.module.css";
import { useState } from "react";

function Profil() {
  const [vacationStatus, setVacationStatus] = useState(false);

  function handleVacationStatus() {
    setVacationStatus(!vacationStatus);
  }
  return (
    <div className={`${styles.profilDiv} ${styles.shadow}`}>
      <div className={styles.topPhoto}>
        <img src={profilImage} alt="Profil" />
        <h1 style={{ margin: 0 }}>Tomasz Jankowski</h1>
        <p>Ortopeda</p>
        <br />
        <p className={styles.grey}>Poradnia Lekarska Medycyny Pracy</p>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.profilInfo}>
        <div className={styles.mainInfo}>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="name">Imię</label>
              <input type="text" id="name" name="name" placeholder="Pawel" />
            </div>
            <div>
              <label htmlFor="surname">Nazwisko</label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Nowik"
              />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="city">Login</label>
              <input type="text" id="Login" name="Login" placeholder="zxc" />
            </div>
            <div>
              <label htmlFor="postalCode">PESEL</label>
              <input
                type="text"
                id="PESEL"
                name="PESEL"
                placeholder="712322232"
              />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="tel">Telefon</label>
              <input type="tel" id="tel" name="tel" placeholder="555 666 777" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Jantom@gmail.com"
              />
            </div>
          </div>
        </div>
        <div className={styles.statusInfo}>
          <div className={styles.hired}>
            <p>Zatrudniony</p>
            <p className={styles.grey}>12.22.2222</p>
          </div>
          <div className={styles.vacationsDay}>
            <p>Dostępne dni urlopowe</p>
            <p className={`${styles.grey} ${styles.smCountNumber}`}>27 dni</p>
            <button
              onClick={handleVacationStatus}
              id="vacations"
              className={vacationStatus ? styles.greyButt : styles.blueButt}
            >
              {vacationStatus ? "Już zaplanowany" : "Zaplanuj wakacje"}
            </button>
          </div>
        </div>
      </div>
      {}
      {}
    </div>
  );
}

export default Profil;
