import React, { useState } from "react";
import styles from "./PatientInfo.module.css";
import profil from "../../../assets/img/profil.webp";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";

function PatientInfo() {
  const [activeTab, setActiveTab] = useState("Uwagi");
  const Buttons = ["Uwagi", "Historia wizyt"];

  function handleTabClick(name) {
    setActiveTab(name);
  }
  const comments = (
    <>
      <div>
        <span>Tadalafil Inventum</span>
        <div className={styles.commentsType}>Uczulenie</div>
      </div>
      <div>
        <span>Tadalafil Inventum</span>
        <div className={styles.commentsType}>Uczulenie</div>
      </div>
    </>
  );
  const history = (
    <>
      <div>
        <span>Pulmolog</span>
        <span className={styles.grey}>Adnrej Duda</span>
        <span>24.04.2022</span>
      </div>
      <div>
        <span>Pulmolog</span>
        <span className={styles.grey}>Adnrej Duda</span>
        <span>24.04.2022</span>
      </div>
    </>
  );
  return (
    <div className={styles.profilDiv}>
      <div className={styles.topPhoto}>
        <img src={profil} alt="Profile" />

        <h1 style={{ margin: "0" }}>Tomasz Jankowski</h1>
        <p className={styles.grey}>+ 48 556 667 776</p>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.profilInfo}>
        <div className={styles.mainInfo}>
          <div className={styles.oneThird}>
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
            <div>
              <label htmlFor="pesel">PESEL</label>
              <input
                type="number"
                id="pesel"
                name="pesel"
                placeholder="08058615499"
              />
            </div>
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="data">Data urodzenia</label>
              <input type="date" id="date" name="date" />
            </div>
            <div>
              <label htmlFor="postcode">Kod posztowy</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                placeholder="71-232"
              />
            </div>
            <div className={styles.row}>
              <div>
                <label htmlFor="house-nr">Nr. Domu</label>
                <input
                  type="text"
                  id="house-nr"
                  name="house-nr"
                  placeholder="32A"
                />
              </div>
              <div>
                <label htmlFor="flat-nr">Nr. Lokalu</label>
                <input
                  type="text"
                  id="flat-nr"
                  name="flat-nr"
                  placeholder="122"
                />
              </div>
            </div>
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="address">Adres</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="ul. Szamarzewskiego"
              />
            </div>
            <div className={styles.row}>
              <div>
                <label htmlFor="height">Wzrost</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  placeholder="122"
                />
              </div>
              <div>
                <label htmlFor="weight">Waga</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="50"
                />
              </div>
            </div>
            <div>
              <BlueBtn>Więcej informacji</BlueBtn>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.rules}>
        <div className={styles.center}>
          <div className={styles.settingNavbarButt}>
            {Buttons.map((name) => (
              <button
                onClick={() => handleTabClick(name)}
                className={activeTab === name ? styles.active : ""}
                key={name}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Uwagi" && comments}
        {activeTab === "Historia wizyt" && history}
      </div>
    </div>
  );
}

export default PatientInfo;
