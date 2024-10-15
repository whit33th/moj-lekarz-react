import styles from "./ReviewModal.module.css";
import avatar from "../../../assets/img/profil.webp";
import useStore from "../../../data/store";
import RedBorderBtn from "../../Buttons/RedBorderBtn/RedBorderBtn";
import BlueBorderBtn from "../../Buttons/BlueBorderBtn/BlueBorderBtn";
import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import { useState } from "react";
import InputDropdownStas from "../../Dropdown/InputDropdownStas";
import DropdownStas from "../../Dropdown/DropdownStas";

// *FIX пролема с дропдаунтом в модалке

const ModerationModal = ({ name, date, text, rating }) => {
  const [RefuseBtn, setRefuseBtn] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  function toggleRefuse() {
    setRefuseBtn(!RefuseBtn);
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          src={avatar} // Replace with actual avatar image path
          alt="Avatar"
          className={styles.avatar}
        />
        <div className={styles.headerInfo}>
          <div className={styles.gap}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.date}>{date}</p>
          </div>
          {rating && (
            <div className={styles.rating}>
              {Array.from({ length: rating }, (_, index) => (
                <span key={index} className={styles.star}>
                  ★
                </span>
              ))}
              {Array.from({ length: 5 - rating }, (_, index) => (
                <span key={index + rating} className={styles.starEmpty}>
                  ☆
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
      <div className={styles.choice}>
        {RefuseBtn === false ? (
          <BlueBorderBtn cb={toggleRefuse}>Odmowa</BlueBorderBtn>
        ) : (
          <RedBorderBtn cb={toggleRefuse}>Odmowa</RedBorderBtn>
        )}

        <BlueBtn>Akceptacja</BlueBtn>
      </div>
      <div className={styles.refuseReason}>
        {RefuseBtn && (
          <>
            <h2>Wybierz powód</h2>
            <div className={styles.choice}>
              <div style={{ width: "100%" }}>
                <InputDropdownStas
                  options={["Option 1", "Option 2", "Option 3"]}
                  selectedOption={selectedOption}
                  onOptionSelect={handleOptionSelect}
                  placeholder={"Wybierz powód"}
                />
              </div>

              <BlueBtn>Wyślij</BlueBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModerationModal;
