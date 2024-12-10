import styles from "./VisitModal.module.css"

import BlueBorderBtn from "../../Buttons/BlueBorderBtn/BlueBorderBtn"

import BlueBtn from "../../Buttons/BlueBtn/BlueBtn"
import useStore from "../../../data/store"
import { useNavigate } from "react-router-dom"
import grey from "../../../assets/img/grey.png"
import useGetPatientInfo from './../../../hooks/DoctorHooks/useGetPatientInfo'
import AddRecipesModalForSelectedUser from '../AddRecipesModalForSelectedUser/AddRecipesModalForSelectedUser'
import Skeleton from 'react-loading-skeleton'


function VisitModal({ props }) {
  const { setModalActive, setModalContent } = useStore()
  const navigate = useNavigate()


  const { data, isLoading } = useGetPatientInfo(props.patientId)


  function closeMainModal() {
    setModalActive(false)
  }
  return (
    <div className={styles.row}>
      <div className={styles.generalInfo}>
        <div>
          <h2>Informacja o wizycie</h2>

          <div className={styles.infoTag}>
            <span>Godziny wizyty:</span> <span>{props.startTime + " - " + props.endTime}</span>
          </div>

          <div className={styles.infoTag}>
            <span>Pacjent:</span> <span>{props.firstName + " " + props.lastName}</span>
          </div>

          <div className={styles.infoTag}>
            <span>Rodzaj wizyty:</span> <span>{props.type}</span>
          </div>

        </div>
        <BlueBorderBtn cb={() => (setModalContent(<AddRecipesModalForSelectedUser patientId={props.patientId} name={props.firstName + " " + props.lastName} />), setModalActive(true))} >Lista receptur</BlueBorderBtn>
      </div>

      <div className={styles.employeeInfo}>
        <h2>Informacje o pacjencie</h2>

        <div className={styles.employeeDetails}>
          <div className={styles.topInfo}>
            <img src={props.img || grey} className={styles.employeeImage} alt="Employee" />
            <div>
              <p style={{ color: "#3E36B0" }}>{props.firstName + " " + props.lastName}</p>
              <div>
                <p className={styles.phone}>
                  <span style={{ color: "#3E36B0" }}>Tel:</span>
                  <span>{isLoading ? <Skeleton width={150} /> : data?.user?.phone || 'Brak'}</span>
                </p>
                <p className={styles.email}>
                  <span style={{ color: "#3E36B0" }}>Email:</span>
                  <span>{isLoading ? <Skeleton width={150} /> : data?.user?.email || 'Brak'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.botInfo}>
            {/* <div className={styles.Comments}>
              <span>Uwagi:</span>{" "}
              <li style={{ listStyle: "none" }}>
                <ul>Jest uczulony na Ibupron</ul>
                <ul>Jest uczulony na Klatra</ul>
              </li>
            </div> */}
            <div>
              <span>Miasto:</span>
              <span>{isLoading ? <Skeleton width={100} /> : data?.user?.address?.city || 'Brak'}</span>
            </div>
            <div>
              <span>Adres:</span>
              <span>{isLoading ? <Skeleton width={125} /> : data?.user?.address?.street || 'Brak'}</span>
            </div>
            <div>
              <span>Data urodzenia:</span>
              <span>{isLoading ? <Skeleton width={100} /> : data?.user?.birthday?.slice(0, 10)}</span>
            </div>
            <div>
              <span>Plec:</span> <span>{isLoading ? <Skeleton width={100} /> : data?.user?.gender}</span>
            </div>


            {/* <div>
              <span>Wzrost:</span> <span>183 cm.</span>
            </div>
            <div>
              <span>Waga:</span> <span>79 kg.</span>
            </div> */}
          </div>
        </div>
        <div className={styles.actions}>
          <BlueBtn cb={() => navigate("/patient-info/" + props.patientId)}>
            Więcej informacji
          </BlueBtn>
        </div>
      </div>
    </div>
  )
}

export default VisitModal
