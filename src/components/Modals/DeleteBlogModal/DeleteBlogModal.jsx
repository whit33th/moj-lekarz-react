import styles from "./DeleteBlog.module.css";

function DeleteBlogModal({ setModalWindowStatus, deleteFc }) {
  return (
    <div className={styles.modalWindowRow}>
      <h1>Czy na pewno chcesz usunąć nowość?</h1>
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
  );
}

export default DeleteBlogModal;
