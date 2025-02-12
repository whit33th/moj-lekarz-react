import Choice from "../../Modal/Choice";
import styles from "./DeleteAccountModal.module.css";

function DeleteAccountModal({
  modalWindowStatus,
  setModalWindowStatus,
  deleteFc,
}) {
  return (
    <div
      className={styles.modalWindow}
      style={{ display: modalWindowStatus ? "flex" : "none" }}
    >
      <div className={styles.modalWindowRow}>
        <h1>Czy na pewno chcesz usunąć konto?</h1>
        <div className={styles.modalWindowBtn}>
          <Choice
            cb1={() => setModalWindowStatus(false)}
            cb2={deleteFc}
            choice1={"Nie"}
            choice2={"Tak"}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
