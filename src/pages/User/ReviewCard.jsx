import styles from "./style/ReviewCard.module.css";
import starimg from "@assets/img/Star.svg";
import grey from "@assets/img/grey.png";

function ReviewCard(reviews) {
  const review = {
    rating: reviews?.reviews?.rating || 0,
    name:
      reviews?.reviews?.patient?.user?.first_name +
        " " +
        reviews?.reviews?.patient?.user?.last_name || "Brak",
    photo: reviews?.reviews?.patient?.user?.photo || "",
    date: reviews?.reviews?.createdAt.slice(0, 10) || "Brak",
    comment: reviews?.reviews?.comment || "Brak",
    positiveTag: reviews?.reviews?.tags?.filter((tag) => tag.positive === true),
    negativeTag: reviews?.reviews?.tags?.filter(
      (tag) => tag.positive === false
    ),
  };

  const positiveFeedbacks = [
    "Profesjonalne podejście",
    "Dbałość o komfort pacjenta",
  ];
  const negativeFeedbacks = ["Zbyt krótka wizyta", "Ograniczona dostępność"];

  return (
    <div className={styles.reviewCard}>
      <div className={styles.userInfo}>
        <div className={styles.header}>
          <img src={review.photo || grey} />
          <div className={styles.reviewNameBlock}>
            <div>
              <p> {review.name} </p>
              <span>{review.date}</span>
            </div>

            <div className={styles.service}>
              {review.positiveTag.map((t, index) => (
                <div key={index} className={styles.good}>
                  {t.name}
                </div>
              ))}
              {review.negativeTag.map((t, index) => (
                <div key={index} className={styles.bad}>
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
