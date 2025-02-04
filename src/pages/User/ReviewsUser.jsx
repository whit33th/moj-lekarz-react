import styles from "./style/ReviewsUser.module.css";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import useGetDoctorReviews from "./../../api/hooks/GeneralHooks/ReviewsHooks/useGetDoctorReviews";

function ReviewsUser() {
  const { id } = useParams();
  const { data: reviews } = useGetDoctorReviews({ doctorId: id });
  return (
    <div className={styles.reviewsBlock}>
      <h1>Opinia o lekarze Ania Kaczmarska (ortoped)</h1>
      <div className={styles.reviews}>
        {reviews.reviews.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
      </div>
    </div>
  );
}
export default ReviewsUser;
