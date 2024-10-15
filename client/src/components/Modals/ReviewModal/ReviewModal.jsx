import styles from "./ReviewModal.module.css";
import avatar from "../../../assets/img/profil.webp";
import useStore from "../../../data/store";

import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import { useState } from "react";



// *FIX пролема с дропдаунтом в модалке

const ReviewModal = ({ name, date, text, rating }) => {
  

  const [selectedOption, setSelectedOption] = useState("");
  const {setModalActive} = useStore()

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
      <div className={styles.buttonDiv}>
        <div></div>
        <BlueBtn cb={() => (setModalActive(false))} > Zamknij  </BlueBtn>
      </div>
    </div>
  );
};

export default ReviewModal;
