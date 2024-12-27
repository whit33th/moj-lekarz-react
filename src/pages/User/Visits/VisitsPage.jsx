import { useState, useEffect } from "react";
import styles from "./VisitsPage.module.css";
import VisitsCard from "./VisitsCard";
import img1 from "@assets/img/image1.svg";
import img2 from "@assets/img/image2.svg";
import { NavLink, useNavigate } from "react-router-dom";
import VisitsCardCompleted from "./VisitsCardCompleted";
import useStore from "../../../data/store";
import { pageConfig } from "../../../config/config";
import QRCode from "react-qr-code";

function VisitsPage({ isLoggedIn = true }) {
  const { visitsState, deleteVisitById } = useStore((state) => ({
    visitsState: state.visitsState,
    deleteVisitById: state.deleteVisitById,
  }));

  const [modalWindowStatus, setModalWindowStatus] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(undefined);
  const navigate = useNavigate();

  const clickDeleteBtn = (id) => {
    setModalWindowStatus(true);
    setDeleteItemId(id);
  };

  const deleteFc = () => {
    if (deleteItemId !== undefined) {
      deleteVisitById(deleteItemId);
    }
    setModalWindowStatus(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.visitsPage}>
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
            <button className={styles.modalWindowBtnYes} onClick={deleteFc}>
              Tak
            </button>
          </div>
        </div>
      </div>

      <div className={styles.visitsPageLeft}>
        <h1>Zaplanowane wizyty</h1>
        {visitsState.plannedVisits.map((item) => (
          <VisitsCard data={item} deleteFc={clickDeleteBtn} key={item.id} />
        ))}
        <div className={styles.newVisitsBtn}>
          <NavLink to={pageConfig.patient.searchDoctor}>
            Dodaj wizytę <span>&#43;</span>
          </NavLink>
        </div>

        <h1>Zrealizowane wizyty</h1>
        {visitsState.completedVisits.map((item) => (
          <VisitsCardCompleted data={item} key={item.id} />
        ))}
      </div>
      <div className={styles.visitsPageRight}>
        <p>Bądź zawsze na bieżąco!</p>
        <p>Pobierz aplikację mobilną z planem wizyt od MyLekarz!</p>
        <div className={styles.visitsPageRightIcons}>
          <a href="#">
            <img src={img2} alt="MyLekarz" />
          </a>
          <a href="#">
            <img src={img1} alt="MyLekarz" />
          </a>
        </div>
        <div className={styles.qrBlock}>
          <div className={styles.qr}>
            <QRCode
              value="https://mojlekarz.netlify.app"
              style={{ height: "100%", width: "100%" }}
            ></QRCode>
          </div>
          <p>Zeskanuj kod i pobierz</p>
        </div>
      </div>
    </div>
  );
}

export default VisitsPage;
