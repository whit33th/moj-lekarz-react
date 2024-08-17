import styles from './Modal.module.css';


function Modal({ modalActive, setModalActive, modalContent, children }) { // Изменено здесь

  function handleActiveStatus() {
    setModalActive(!modalActive); // Изменено здесь
  }

  return (
    <div className={modalActive ? styles.modalActive : styles.modal} onClick={handleActiveStatus}>
      <div className={styles.modal__content}>
        {modalContent}
				{children}
			</div>
    </div>
  );
}

export default Modal;
