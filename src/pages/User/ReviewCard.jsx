import styles from "./style/ReviewCard.module.css";
import starimg from "@assets/img/Star.svg";
import grey from "@assets/img/grey.png";

function ReviewCard({ reviews }) {
  const review = {
    rating: reviews?.rating || 0,
    name: `${reviews?.patient?.user?.first_name || "Brak"} ${reviews?.patient?.user?.last_name || ""}`.trim(),
    photo: reviews?.patient?.user?.photo || grey,
    date: "Brak", // Дата отсутствует в API, временно ставим "Brak"
    comment: reviews?.comment || "Brak",
    tags: reviews?.tags || [],
  };
  console.log(reviews?.reviews)

  return (
    <div className={styles.reviewCard}>
      <div className={styles.userInfo}>
        <div className={styles.header}>
          <img src={review.photo} alt="User Avatar" />
          <div className={styles.reviewNameBlock}>
            <div>
              <p>{review.name}</p>
              <span>{review.date}</span>
            </div>

            <div className={styles.service}>
              {review.tags.map((t, index) => (
                <div key={index} className={styles.good}>
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.starsBlock}>
          {Array.from({ length: review.rating }).map((_, index) => (
            <img
              key={index}
              src={starimg}
              alt="star"
              className={styles.imgNameBlockStar}
            />
          ))}
        </div>
      </div>

      <div className={styles.userReviewText}>{review.comment}</div>
    </div>
  );
}

export default ReviewCard;
