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
import useGetPatientAppointments from "../../../api/hooks/PatientHooks/useGetPatientAppointment";
import DeleteAppointmentModal from "../../../components/Modals/DeleteAppointment/DeleteAppointmentModal";
import useDeleteAppointment from "./../../../api/hooks/PatientHooks/useDeleteAppontment";

function VisitsPage({ isLoggedIn = true }) {
  const { data: scheduledAppointments } = useGetPatientAppointments({
    // startDate: "2021-01-01",
    // endDate: "2021-12-31",
    // limit: 10,
    // page: 1,
  });
  const { mutate } = useDeleteAppointment();
  const { visitsState } = useStore((state) => ({
    visitsState: state.visitsState,
  }));

  const [modalWindowStatus, setModalWindowStatus] = useState(false);

  const navigate = useNavigate();

  function clickDeleteBtn() {
    setModalWindowStatus(true);
  }

  function deleteFc(id) {
    mutate(id);
    setModalWindowStatus(false);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(pageConfig.auth.login);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.visitsPage}>
      <DeleteAppointmentModal
        modalWindowStatus={modalWindowStatus}
        setModalWindowStatus={setModalWindowStatus}
        deleteFc={deleteFc}
      />

      <div className={styles.visitsPageLeft}>
        <h1>Zaplanowane wizyty</h1>
        {scheduledAppointments?.appointments?.map((i, index) => (
          <VisitsCard data={i} deleteFc={clickDeleteBtn} key={index} />
        ))}
        <div className={styles.newVisitsBtn}>
          <NavLink to={pageConfig.patient.searchVisits}>
            Dodaj wizytę <span>&#43;</span>
          </NavLink>
        </div>

        <h1>Zrealizowane wizyty</h1>
        {visitsState.completedVisits.map((i) => (
          <VisitsCardCompleted data={i} key={i.id} />
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
