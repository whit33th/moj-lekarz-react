import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import useStore from "../../data/store";
import { useLocation } from "react-router-dom";

function Modal({ children }) {
  const { isModalActive, setModalActive, modalContent } = useStore();

  const currentLocation = useLocation();
  
  useEffect(() => {
    setModalActive(false);
  }, [currentLocation]);

  function handleActiveStatus() {
    setModalActive(false);
  }

  function handleContentClick(event) {
    event.stopPropagation();
  }

  useEffect(() => {
    const body = document.querySelector("body");
    if (isModalActive) {
      body.style.overflow = "hidden";
    }
    if (!isModalActive) {
      body.style.overflow = "auto";
    }
  }, [isModalActive]);

  return (
    <div
      className={`${styles.modal} ${isModalActive ? styles.modalActive : ""}`}
      onClick={handleActiveStatus}
    >
      <div className={styles.modal__content} onClick={handleContentClick}>
        {modalContent}
        {children}
      </div>
    </div>
  );
}

export default Modal;
