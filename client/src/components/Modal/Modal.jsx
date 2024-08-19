import React from 'react';
import styles from './Modal.module.css';
import useStore from '../../data/store';
import BlueBtn from '../Buttons/BlueBtn/BlueBtn'

function Modal({ children }) {
  const { isModalActive, setModalActive, modalContent } = useStore();

  function handleActiveStatus() {
    setModalActive(false); 
  }

  return (
    <div
      className={`${styles.modal} ${isModalActive ? styles.modalActive : ''}`}
      
    >
      <div className={styles.modal__content}>
        {modalContent}
        {children}
      </div>
      
    </div>
  );
}

export default Modal;
