import React, { useState } from 'react';

const StarIcon = ({ fill }) => (
  <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 0L30.8374 17.9656H49.7275L34.4451 29.0689L40.2824 47.0344L25 35.9311L9.71758 47.0344L15.5549 29.0689L0.272532 17.9656H19.1626L25 0Z" fill={fill} />
  </svg>
);

function StarsReview({rating, setRating}) {

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <div 
          key={star} 
          onClick={() => setRating(star)} 
          style={{ cursor: 'pointer' }}
        >
          <StarIcon 
            fill={star <= rating ? '#FFD700' : '#D9D9D9'} // Золотистый для заполненных
          />
        </div>
      ))}
    </div>
  );
}

export default StarsReview;