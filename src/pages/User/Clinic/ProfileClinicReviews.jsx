import React from 'react'
import styles from './style/ProfileClinicReviews.module.css'
import ReviewCard from '../ReviewCard'

export default function ProfileClinicReviews() {
  return (
    <div className={styles.reviewsBlock}>
        <ReviewCard /> 
      
    </div>
  )
}
