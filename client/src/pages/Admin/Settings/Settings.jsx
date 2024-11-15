import { useState } from "react";
import styles from "./styles.module.css";
import photo from "../../../assets/img/profil.webp";
import Calendar from "../../../components/DoctorPage/Home/Calendar/CalendarBlock";

import DropdownStas from "../../../components/Dropdown/DropdownStas";
import Tabs from "../../../components/Buttons/Tabs/Tabs";

function Settings() {
  const [activeTab, setActiveTab] = useState("Dane podstawowe");
  const [selectedName, setSelectedName] = useState("Dariusz Adamek");
  const [selectedReason, setSelectedReason] = useState("Wybierz");

  const option1 = [
    "Dariusz Adamek",
    "Option 1",
    "Option 2",
    "Dariusz Adamek",
    "Option 1",
    "Option 2",
    "Dariusz Adamek",
    "Option 1",
    "Option 2",
    "Option 3",
  ];
  const option2 = ["Wybierz", "Option 1", "Option 2", "Option 3"];
  const Buttons = [
    "Dane podstawowe",
    "Dane dodatkowe",
    "Czas pracy",
    "Wnioski",
  ];

  function handleTabClick(name) {
    setActiveTab(name);
  }

  const conclusions = (
    <div className={styles.workTime}>
      <div className={styles.shadow}>
        <Calendar />
      </div>

      <div className={styles.conclusions}>
        <DropdownStas
          placeholder={option1[0]}
          label="Imię i nazwisko"
          options={option1}
        />
        <DropdownStas
          placeholder={option2[0]}
          label="Powód nieobecności"
          options={option2}
        />
      </div>
    </div>
  );

  const workTime = (
    <div className={styles.workTime}>
      <div className={styles.shadow}>
        <Calendar />
      </div>

      <div className={styles.workSchedule}>
        <p>
          Grafik pracy:
          <span className={styles.blueBack}>18:00 - 20:00</span>{" "}
        </p>
        <p>
          Sala:
          <span className={styles.blueBack}>203</span>{" "}
        </p>
        <p>
          Godziny pracy:
          <span className={styles.blueBack}>132</span>{" "}
        </p>
      </div>
    </div>
  );

  const settingData = (
    <div className={styles.settingData}>
      <div className={styles.settingInfo}>
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
            <label htmlFor="date">Data urodzenia</label>
            <input
              type="date"
              id="date"
              name="flat"
              defaultValue="2002-12-21"
            />
          </div>
          <div>
            <label htmlFor="pesel">Pesel</label>
            <input
              type="text"
              id="pesel"
              name="pesel"
              placeholder="03248891023"
            />
          </div>
        </div>
        <div className={styles.halfRow}>
          <div>
            <label htmlFor="tel">Telefon</label>
            <input type="tel" id="tel" name="tel" placeholder="777 777 777" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="pavel@gmail.com"
            />
          </div>
        </div>

        <button>Zapisz zmiany</button>
      </div>
      <div className={`${styles.settingImg}`}>
        <div className={styles.photo}>
          <img src={photo} alt="" />
        </div>
        <div className={styles.imgPanel}>
          <button className={styles.lightButt}>Zobacz</button>
          <button className={styles.blueButt}>Zmień</button>
        </div>
      </div>
    </div>
  );

  const additionalData = (
    <>
      <textarea
        className={styles.textarea}
        placeholder="Wpisz tekst"
      ></textarea>
      <button
        style={{ width: "200px", marginLeft: "calc(100% - 200px)" }}
        className={styles.blueButt}
      >
        Zapisz zmiany
      </button>
    </>
  );

  return (
    <div className="content">
      <Tabs
        buttons="Dane podstawowe, Dane dodatkowe"
        activeTab={activeTab}
        onTabClick={handleTabClick}
        storageKey="SettingAdminNavbar"
      />

      
        {activeTab === "Dane podstawowe" && settingData}
        {activeTab === "Dane dodatkowe" && additionalData}
     
    </div>
  );
}

export default Settings;
