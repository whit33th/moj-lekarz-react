import React from "react";
import styles from "./style/ProfileClinicReviews.module.css";
import ReviewCard from "../ReviewCard";

export default function ProfileClinicReviews({ reviews }) {
  console.log(reviews);
  return (
    <div className={styles.reviewsBlock}>
      {reviews.reviews.map((r) => (
        <ReviewCard key={r.id} reviews={r} />
      ))}
      
      
    </div>
  );
}
