import styles from "./ReviewCard.module.css";
import Choice from "../../../components/Modal/Choice";
import avatar from "../../../assets/img/profil.webp";
import useStore from "../../../data/store";
import ModerationModal from "../../../components/Modals/ReviewModal/ModerationModal";
import star from "../../../assets/img/Star.svg";
import starGrey from "../../../assets/img/Star 6.svg";

const ModerationCard = ({ name, date, text, rating }) => {
  const { setModalActive, setModalContent } = useStore();

  const positiveFeedbacks = [
    "Profesjonalne podejście",
    "Dbałość o komfort pacjenta",
  ];
  const negativeFeedbacks = ["Zbyt krótka wizyta", "Ograniczona dostępność"];

  function handleModal() {
    setModalActive(true);
    setModalContent(
      <ModerationModal name={name} date={date} text={text} rating={rating} />
    );
  }
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
      <Choice choice1={"Otwórz"} choice2={"Akceptuj"} cb1={handleModal} />
    </div>
  );
};

export default ModerationCard;
