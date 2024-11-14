
import styles from "./ReviewCard.module.css";
import star from "../../../assets/img/Star.svg";
import starGrey from "../../../assets/img/Star 6.svg";

function ReviewCard({ name, date, text, rating, image }) {

  const positiveFeedbacks = [
    "Profesjonalne podejście",
    "Dbałość o komfort pacjenta",
  ];
  const negativeFeedbacks = ["Zbyt krótka wizyta", "Ograniczona dostępność"];

  return (
    <div className={styles.reviewCard}>
      <div className={styles.userInfo}>
        <img src={image} alt="User profile" />
        <div className={styles.top}>
          <div className={styles.topHeader}>
            <div className={styles.reviewNameBlock}>
              <p>{name}</p>
              <span>{date}</span>
            </div>
            <div className={styles.starsBlock}>
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < rating ? star : starGrey} 
                  alt="star"
                  className={styles.imgNameBlockStar}
                />
              ))}
            </div>
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
      <div className={styles.userReviewText}>{(text)}</div>
    </div>
  );
}

export default ReviewCard;
