import React from "react";
import styles from "./ModerationCard.module.css";
import Choice from "../../../components/Modal/Choice";
import avatar from "../../../assets/img/profil.webp";
import useStore from "../../../data/store";
import ModerationModal from "../../../components/Modals/ReviewModal/ModerationModal";

const ModerationCard = ({ name, date, text, rating }) => {
  const { setModalActive, setModalContent } = useStore();

  function handleModal() {
    setModalActive(true);
    setModalContent(
      <ModerationModal name={name} date={date} text={text} rating={rating} />
    );
  }
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
      <Choice choice1={"Otwórz"} choice2={"Akceptuj"} cb1={handleModal} />
    </div>
  );
};

export default ModerationCard;
