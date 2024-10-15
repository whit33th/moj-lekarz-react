import React, { useState, useEffect } from "react";
import styles from "./PatientInfo.module.css";
import profil from "../../../assets/img/profil.webp";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import { userItems } from '../../../helpers/userItemList';
import { useParams } from 'react-router-dom';

function PatientInfo() {
  const { id } = useParams(); // Get the patient ID from URL parameters
  const [activeTab, setActiveTab] = useState("Uwagi");
  const Buttons = ["Uwagi", "Historia wizyt"];
  const [patient, setPatient] = useState({});

  useEffect(() => {
    console.log("ID from useParams:", id); // Log the ID from useParams

    if (id) {
      // Ensure to convert id to a number or string based on your data
      const foundPatient = userItems.find((p) => p.id === Number(id)); // Convert id to number
      setPatient(foundPatient || {}); // Set to empty object if not found
    }
  }, [id]);

  // If there are no comments or history, show appropriate text
  const comments = patient?.comments?.length ? (
    patient.comments.map((comment, index) => (
      <div key={index}>
        <span>{comment.name || "UNKNOWN"}</span>
        <div className={styles.commentsType}>{comment.type || "UNKNOWN"}</div>
      </div>
    ))
  ) : (
    <div>Brak uwag</div>
  );

  const history = patient?.history?.length ? (
    patient.history.map((visit, index) => (
      <div key={index}>
        <span>{visit.doctor || "UNKNOWN"}</span>
        <span className={styles.grey}>{visit.name || "UNKNOWN"}</span>
        <span>{visit.date || "UNKNOWN"}</span>
      </div>
    ))
  ) : (
    <div>Brak historii wizyt</div>
  );

  function handleTabClick(name) {
    setActiveTab(name);
  }

  return (
    <div className={styles.profilDiv}>
      {console.log({ id })}
      <div className={styles.topPhoto}>
        <img src={profil} alt="Profile" />
        <h1 style={{ margin: "0" }}>{patient?.name || "UNKNOWN"}</h1>
        <p className={styles.grey}>{patient?.phone || "UNKNOWN"}</p>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
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
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="date">Data urodzenia</label>
              <input
                type="text"
                id="date"
                name="date"
                value={patient?.birthDate || "UNKNOWN"}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="postcode">Kod posztowy</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={patient?.postcode || "UNKNOWN"}
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
