import { useState } from 'react';
import styles from "./Review.module.css";
import starimg from "@assets/img/Star.svg";
import grey from "@assets/img/grey.png";

function Review({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const reviewData = {
    rating: review?.rating || 0,
    name: `${review?.patient?.user?.first_name || "Brak"} ${review?.patient?.user?.last_name || ""}`.trim(),
    photo: review?.patient?.user?.photo || grey,
    date: "Brak",
    comment: review?.comment || "Brak",
    tags: review?.tags || [],
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const shortText = reviewData.comment.length > 150 
    ? reviewData.comment.slice(0, 150) + "..."
    : reviewData.comment;

  return (
    <div className={styles.reviewItem}>
      <div className={styles.userBlock}>
        <img src={reviewData.photo} alt="User" />
        <div>
          <p>{reviewData.name}</p>
          <span>{reviewData.date}</span>
        </div>
        <div className={styles.starsBlock}>
          {Array.from({ length: reviewData.rating }).map((_, index) => (
            <img key={index} src={starimg} alt="star" />
          ))}
        </div>
      </div>
      <div className={styles.reviewText}>
        {isExpanded ? reviewData.comment : shortText}
        {reviewData.comment.length > 150 && (
          <button 
            className={styles.expandButton} 
            onClick={toggleExpand}
          >
            {isExpanded ? "Pokaż mniej" : "Czytaj więcej"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Review;
