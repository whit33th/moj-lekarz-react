import starGrey from "@assets/img/Star 6.svg";
import star from "@assets/img/Star.svg";
import useStore from "../../../data/store";
import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import styles from "./ReviewModal.module.css";

const ReviewModal = ({ name, date, text, rating, avatar, tags }) => {
  const { setModalActive } = useStore();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          src={avatar}
          alt="Avatar"
          className={styles.avatar}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/path/to/default/avatar.png";
          }}
        />
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
            {tags &&
              tags.map((tag, index) => (
                <div
                  key={index}
                  className={
                    tag.includes("Bad") || tag.includes("Un")
                      ? styles.bad
                      : styles.good
                  }
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
      <div className={styles.buttonDiv}>
        <div></div>
        <BlueBtn cb={() => setModalActive(false)}> Zamknij </BlueBtn>
      </div>
    </div>
  );
};

export default ReviewModal;
