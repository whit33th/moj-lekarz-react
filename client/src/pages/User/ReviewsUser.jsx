import React from 'react'
import styles from './style/ReviewsUser.module.css'
import ReviewCard from './ReviewCard';
import { useParams } from 'react-router-dom';

const reviews =[
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},

]
function ReviewsUser() {
    const { id } = useParams();
    
  return (
    <div className={styles.reviewsBlock}>
        <h1>Opinia o lekarze Ania Kaczmarska (ortoped)</h1>
        <div className={styles.reviews}>
            {reviews.map((item, index)=> <ReviewCard key={index}/>)}
        </div>
    </div>
  )
}
export default ReviewsUser;