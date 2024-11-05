// src/components/QAComponent.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './style/QAComponent.module.css';
import vector from '../assets/Vector9.svg';

function QAComponent() {
  const questionsData = useSelector((state) => state.some.questionsData);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.QAComponentBlock}>
      <h1>Jak przygotować się do badań?</h1>
      <div className={styles.questionBlock}>
        <h1>Odpowiedzi na najczęściej zadawane pytania</h1>
        <div className={styles.questionBlockItems}>
          {questionsData.map((item, index) => (
            <div 
              key={index} 
              className={styles.questionBlockItem} 
              onClick={() => toggleQuestion(index)}
            >
              <p>{item.question}</p>
              <div className={`${styles.questionBlockItemText} ${activeIndex === index ? styles.show : ''}`}>
                <p>{item.answer}</p>
              </div>
              <img src={vector} alt="Toggle" className={activeIndex === index ? styles.rotate : ''} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.questionInfoBlock}>
        <h3>Poinformuj pielęgniarkę, jeśli:</h3>
        <ul>
            <li>jesteś w ciąży</li>
            <li>przyjmujesz leki przeciwzakrzepowe (np. Acenocumarol)</li>
            <li>występują u Ciebie trudności w pobraniu krwi</li>
            <li>stresujesz się pobraniem - postaramy się pomóc</li>
        </ul>
        <h3>Inne badania specjalistyczne:</h3>
        <p>Informację o dostępnych badaniach i przygotowaniu uzyskasz na stronie lub u doradcy wybranej kliniki.</p>
      </div>

    </div>
  );
}

export default QAComponent;