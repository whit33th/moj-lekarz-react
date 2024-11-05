import React from 'react';
import img from '../assets/tst,small,845x845-pad,1000x1000,f8f8f8.jpg';
import styles from './style/ReviewCard.module.css'
import starimg from '../assets/Star.svg';


function ReviewCard(props) {
  const rating = parseInt("5", 10);

  return (
    <div className={styles.reviewCard}>
      <div className={styles.userInfo}>
        <img src={img} />
        <div className={styles.reviewNameBlock}>
          <p>Anna Kraskova</p>
          <span>19.08.2022</span>
        </div>
        <div className={styles.starsBlock}>
          {[...Array(rating)].map((_, index) => (
            <img key={index} src={starimg} alt="star" className={styles.imgNameBlockStar} />
          ))}
        </div>
      </div>
      <div className={styles.userReviewText}>
        {/* здесь надо поставить условия о количестве букв  */}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum fugit inventore quam minus perspiciatis quisquam autem necessitatibus praesentium soluta consequatur sit harum, error porro. Quasi debitis optio necessitatibus distinctio adipisci.
      </div>

    </div>
  )
}
export default ReviewCard;