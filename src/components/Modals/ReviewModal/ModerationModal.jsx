import styles from "./ReviewModal.module.css";
import avatar from "../../../assets/img/profil.webp";
import RedBorderBtn from "../../Buttons/RedBorderBtn/RedBorderBtn";
import BlueBorderBtn from "../../Buttons/BlueBorderBtn/BlueBorderBtn";
import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import { useState } from "react";
import InputDropdownStas from "../../Dropdown/InputDropdownStas";

import star from "../../../assets/img/Star.svg";
import starGrey from "../../../assets/img/Star 6.svg";
import { useForm } from 'react-hook-form'

const ModerationModal = ({ name, date, text, rating }) => {
  const [RefuseBtn, setRefuseBtn] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const positiveFeedbacks = [
    "Profesjonalne podejście",
    "Dbałość o komfort pacjenta",
  ];
  const negativeFeedbacks = ["Zbyt krótka wizyta", "Ograniczona dostępność"];

  function toggleRefuse() {
    setRefuseBtn(!RefuseBtn);
  }
  const { control, handleSubmit, watch } = useForm({

  })
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={avatar} alt="Avatar" className={styles.avatar} />
        <div className={styles.headerInfo}>
          <div className={styles.gap}>
            <div className={styles.topHeader}>
              <h3 className={styles.name}>{name}</h3>
              {rating && (
                <div className={styles.rating}>
                  {[...Array(5)].map((_, index) => (
                    <img
                      key={index}
                      src={index < rating ? star : starGrey}
                      alt="star"
                      className={styles.imgNameBlockStar}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className={styles.date}>{date}</p>
          </div>

          <div className={styles.service}>
            {positiveFeedbacks.map((feedback, index) => (
              <div key={index} className={styles.good}>
                {feedback}
              </div>
            ))}
            {negativeFeedbacks.map((feedback, index) => (
              <div key={index} className={styles.bad}>
                {feedback}
              </div>
            ))}
          </div>
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
                  control={control} name={"."}
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
