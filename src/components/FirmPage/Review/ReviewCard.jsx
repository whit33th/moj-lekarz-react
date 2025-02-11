import styles from "./ReviewCard.module.css";
import star from "@assets/img/Star.svg";
import starGrey from "@assets/img/Star 6.svg";
import greyAvatar from "@assets/img/grey.png";

function ReviewCard({ review }) {

  const formattedReview = {
    name: `${review?.patient?.user?.first_name || "Brak"} ${review?.patient?.user?.last_name || ""}`.trim(),
    date: review?.createdAt ? review.createdAt.slice(0, 10) : "Brak",
    text: review?.comment || "Brak",
    rating: review?.rating || 0,
    image: review?.patient?.user?.photo || greyAvatar,
    positiveTags: review?.tags?.filter((tag) => tag.positive) || [],
    negativeTags: review?.tags?.filter((tag) => !tag.positive) || [],
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.userInfo}>
        <img src={formattedReview.image} alt="User profile" />
        <div className={styles.top}>
          <div className={styles.topHeader}>
            <div className={styles.reviewNameBlock}>
              <p>{formattedReview.name}</p>
              <span>{formattedReview.date}</span>
            </div>
            <div className={styles.starsBlock}>
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < formattedReview.rating ? star : starGrey}
                  alt="star"
                  className={styles.imgNameBlockStar}
                />
              ))}
            </div>
          </div>
          <div className={styles.service}>
            {formattedReview.positiveTags.map((tag, index) => (
              <div key={index} className={styles.good}>
                {tag.name}
              </div>
            ))}
            {formattedReview.negativeTags.map((tag, index) => (
              <div key={index} className={styles.bad}>
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.userReviewText}>{formattedReview.text}</div>
    </div>
  );
}

export default ReviewCard;
