import { Link } from "react-router-dom";
import styles from "./style/NotFound.module.css";
import stethoscope from "../../assets/img/stethoscope.png";
import home from "../../assets/img/sidebar-home.png";

export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <div className={styles["not-found-container"]}>
        <div className={styles["not-found-content"]}>
          <img src={stethoscope} height={70} alt="" />
          <h1 className={styles["not-found-title"]}>
            404 - Strona nie znaleziona
          </h1>
          <p className={styles["not-found-subtitle"]}>
            Ups! Wygląda na to, że ta strona zaginęła w medycznych archiwach.
          </p>
          <div className={styles["not-found-text"]}>
            <p>
              Nie martw się, wróćmy na stronę główną i spróbujmy jeszcze raz.
            </p>
          </div>
          <Link to="/" className={styles["back-button"]}>
            <img height={16} className={styles.home} src={home} alt="" />
            Do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}
