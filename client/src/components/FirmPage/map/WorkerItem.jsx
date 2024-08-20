/* eslint-disable no-undef */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./WorkerItem.module.css";
import moreInfo from "../../../assets/img/more-info.png";
import { NavLink } from "react-router-dom";
import useStore from "../../../data/store";
import profil from "../../../assets/img/profil.webp";
import BlueBtn from "./../../Buttons/BlueBtn/BlueBtn";
import BlueBorderBtn from "./../../Buttons/BlueBorderBtn/BlueBorderBtn";

function PatientItem({ img, name, id, gender }) {
  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setModalActive, setModalContent } = useStore();
	const modalContent = (
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
        <BlueBorderBtn cb={closeMainModal}>Anuluj</BlueBorderBtn>
      </div>

      <div className={styles.employeeInfo}>
        <h2>Informacje pracownika</h2>

        <div className={styles.employeeDetails}>
          <div className={styles.topInfo}>
            <img src={profil} className={styles.employeeImage} alt="Employee" />
            <div>
              <p style={{ color: "#3E36B0" }}> <strong>Brat Solitko</strong>  </p>
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
          <BlueBorderBtn >Usuń</BlueBorderBtn>
        </div>
      </div>
    </div>
  );
	function openMainModal() {
    setModalActive(true);
    setModalContent(modalContent);
  }
	function closeMainModal() {
    setModalActive(false);
  }
 
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  

  return (
    <tr>
      <td className={styles.nameTd}>
        <img className={styles.round} src={img} alt="Profile" />
        <span>{name}</span>
      </td>
      <td className={styles.tCenter}>{id}</td>
      <td className={styles.tCenter}>{gender}</td>
      <td className={styles.tCenter}>
        <div
          className={styles.moreInfoButt}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            className={styles.moreInfo}
            src={moreInfo}
            alt="More Info"
            onClick={toggleModal} // Toggle modal on click
            style={{ cursor: "pointer" }}
          />

          {isModalOpen && (
            <div className={styles.moreInfoModal}>
              <NavLink
                className={styles.hoverOpacity}
                href="pacjent-info.php"
                to="patient-info"
              >
                <p>Informacja</p>
              </NavLink>
              <button
                onClick={openMainModal}
                className={styles.hoverOpacity}
                to="/"
              >
                <p>Wiadomość</p>
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

PatientItem.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
};

export default PatientItem;