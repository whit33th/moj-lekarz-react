import { useState } from "react";
import styles from "./Card.module.css";
const Card = ({ review }) => {
  const [showMore, setShowMore] = useState(false);
  const [showMoreStatus, setShowMoreStatus] = useState(true);
  function showMoreText() {
    setShowMore(!showMore);
    setShowMoreStatus(!showMoreStatus);
  }
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={review.image} alt="Review" className={styles.cardImage} />
        <div>
          <p className={styles.cardName}>{review.name}</p>
          <p className={styles.cardDate}>{review.date}</p>
        </div>
        <div>
          <div className={styles.reviewRating}>
            {Array.from({ length: 5 }, (_, i) =>
              review.rating > i ? (
                <span key={i} className={styles.star}>
                  ★
                </span>
              ) : (
                <span key={i} className={styles.emptyStar}>
                  ★
                </span>
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.reviewBackground}>
        <p
          className={`${styles.cardText} ${
            showMore ? styles.showMoreText : ""
          }`}
        >
          {review.text}
        </p>
        {review.text.length > 200 && (
          <p
            style={{
              color: "#3E36B0",
              textAlign: "right",
              cursor: "pointer",
              padding: "10px",
            }}
            onClick={showMoreText}
            className={styles.showMore}
          >
            {showMoreStatus ? "Rozwiń" : "Zwiń"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
