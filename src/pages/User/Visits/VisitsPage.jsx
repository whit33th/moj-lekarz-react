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
import VisitsCardSkeleton from "./VisitsCardSkeleton";

function VisitsPage({ isLoggedIn = true }) {
  const { data: scheduledAppointments, isLoading } = useGetPatientAppointments(
    {}
  );
  const { mutate } = useDeleteAppointment();
  const [deleteId, setDeleteId] = useState();
  const { visitsState } = useStore((state) => ({
    visitsState: state.visitsState,
  }));

  const [modalWindowStatus, setModalWindowStatus] = useState(false);

  const navigate = useNavigate();

  const activeAppointments = scheduledAppointments?.appointments?.filter(
    (appointment) => appointment.status === "active"
  );
  const completedAppointments = scheduledAppointments?.appointments?.filter(
    (appointment) =>
      appointment.status === "complete" || appointment.status === "completed"
  );

  function clickDeleteBtn(id) {
    setDeleteId(id);
    setModalWindowStatus(true);
  }

  function deleteFc() {
    mutate(deleteId);
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
        {isLoading ? (
          <>
            <VisitsCardSkeleton />
            <VisitsCardSkeleton />
            <VisitsCardSkeleton />
          </>
        ) : (
          activeAppointments?.map((i, index) => (
            <VisitsCard data={i} deleteFc={clickDeleteBtn} key={index} />
          ))
        )}
        <div className={styles.newVisitsBtn}>
          <NavLink to={pageConfig.patient.searchVisits}>
            Dodaj wizytę <span>&#43;</span>
          </NavLink>
        </div>

        <h1>Zrealizowane wizyty</h1>
        {completedAppointments?.length > 0 ? (
          completedAppointments.map((appointment, index) => (
            <VisitsCardCompleted
              key={appointment.id || index}
              data={appointment}
            />
          ))
        ) : (
          <p>Brak zrealizowanych wizyt</p>
        )}
      </div>
      <div className={styles.visitsPageRight}>
        <p>Bądź zawsze na bieżąco!</p>
        <p>Pobierz aplikację mobilną z planem wizyt od MyLekarz!</p>
        <div className={styles.visitsPageRightIcons}>
          <a target="_blank" href="https://www.apple.com/pl/app-store">
            <img src={img2} />
          </a>
          <a target="_blank" href="https://play.google.com/store">
            <img src={img1} />
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
