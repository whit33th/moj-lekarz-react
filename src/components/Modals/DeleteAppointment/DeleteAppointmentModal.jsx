import styles from './DeleteAppointment.module.css'

function DeleteAppointmentModal({ modalWindowStatus, setModalWindowStatus, deleteFc }) {
  return (
    <div
      className={styles.modalWindow}
      style={{ display: modalWindowStatus ? "flex" : "none" }}
    >
      <div className={styles.modalWindowRow}>
        <h1>Czy na pewno chcesz anulować wizytę?</h1>
        <div className={styles.modalWindowBtn}>
          <button
            className={styles.modalWindowBtnBack}
            onClick={() => setModalWindowStatus(false)}
          >
            Nie
          </button>
          <button className={styles.modalWindowBtnYes} onClick={() => deleteFc()}>
            Tak
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAppointmentModal;
