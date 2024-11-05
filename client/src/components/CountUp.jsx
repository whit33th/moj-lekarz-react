import React, { useState, useEffect } from 'react';

const CountUp = ({ endValue, duration }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const end = endValue;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easing = 1 - Math.pow(1 - progress, 2); // Simple easing function
      setValue(Math.round(startValue + easing * (end - startValue)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration]);

  return <h3>{value}</h3>;
};

export default CountUp;
