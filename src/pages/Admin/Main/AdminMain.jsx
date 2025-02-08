import { Suspense } from 'react'
import users from "@assets/img/users.png"
import graphUp from "@assets/img/graph-up.png"
import graphDown from "@assets/img/graph-down.png"
import companies from "@assets/img/companies.png"
import doctor from "@assets/img/doctor-s.png"
import visits from "@assets/img/visits.png"

import plus from "@assets/img/plusBlack.png"
import bucket from "@assets/img/bucket.png"
import noteIco from "@assets/img/note.png"
import styles from "./AdminMain.module.css"
import AreaChartComp from "../../../components/Charts/AreaChart"
import useStore from "./../../../data/store"
import Textarea from "../../../components/UI/TextArea/Textarea"
import BlueBtn from "./../../../components/Buttons/BlueBtn/BlueBtn"
import { useState } from "react"
import useAdminStats from "../../../api/hooks/GeneralHooks/Stats/adminStats"
import { format } from "date-fns"
import { StatCardSkeleton, TableSkeleton, ChartSkeleton } from '../../../components/Skeletons/AdminSkeletons'
import Skeleton from "react-loading-skeleton"

function AdminMainContent() {
  const stats = useAdminStats()
  const { setModalActive, setModalContent } = useStore()
  const [notes, setNotes] = useState(
    Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      text:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit.` + (i + 1),
    }))
  )
  const NoteModal = (
    <>
      <h1>Dodanie notatki</h1>
      <Textarea placeholder={"Wpisz temat"} />
      <BlueBtn>Dodaj notatkę</BlueBtn>
    </>
  )
  function handleAddNote() {
    setModalActive(true)
    setModalContent(NoteModal)
  }
  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
  }


  if (!stats?.countUser) {
    return null;
  }

  const {
    countUser: {
      totalPatient,
      percentagePatient,
      totalClinic,
      percentageClinics,
      totalDoctor,
      percentageDoctors,
      totalAppointment,
      percentageAppointments,
    },
    statisticUser: { newPatients, newClinics },
  } = stats;

  return (
    <div className={styles.content}>
      <h1 className={styles.witaj}>Witamy, Tomasz!</h1>
      <div className={styles.dashboardFour}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={users} alt="" />
            <div
              className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
            >
              <p>{percentagePatient.toFixed(2)}%</p>
              <img src={percentagePatient >= 0 ? graphUp : graphDown} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>{totalPatient}</span>
            <span className={styles.label}>Całkowita liczba użytkowników</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={companies} alt="" />
            <div
              className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
            >
              <p>{percentageClinics.toFixed(2)}%</p>
              <img src={percentageClinics >= 0 ? graphUp : graphDown} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>{totalClinic}</span>
            <span className={styles.label}>Całkowita liczba firm</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={doctor} alt="" />
            <div
              className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
            >
              <p>{percentageDoctors.toFixed(2)}%</p>
              <img src={percentageDoctors >= 0 ? graphUp : graphDown} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>{totalDoctor}</span>
            <span className={styles.label}>Całkowita liczba lekarzy</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={visits} alt="" />
            <div
              className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
            >
              <p>{percentageAppointments.toFixed(2)}%</p>
              <img src={percentageAppointments >= 0 ? graphUp : graphDown} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>{totalAppointment}</span>
            <span className={styles.label}>
              Całkowita liczba zarejestrowanych wizyt
            </span>
          </div>
        </div>
      </div>
      <div className={styles.dashboardTwo}>
        <div className={`${styles.tableCard} ${styles.newUser}`}>
          <p className={styles.titleCard}>Nowe użytkownicy</p>
          <table>
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Numer ID</th>
                <th>Data rejestracji</th>
              </tr>
            </thead>
            <tbody>
              {newPatients?.slice(-5)?.map((patient) => (
                <tr key={patient.id}>
                  <td>{`${patient.user.first_name} ${patient.user.last_name}`}</td>
                  <td>{patient.id}</td>
                  <td>{format(new Date(patient.createdAt), 'dd.MM.yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.tableCard} ${styles.newCompanies}`}>
          <p className={styles.titleCard}>Nowe firmy</p>
          <table>
            <thead>
              <tr>
                <th>Firmy</th>
                <th>Data rejestracji</th>
              </tr>
            </thead>
            <tbody>
              {newClinics?.slice(-5)?.map((clinic, index) => (
                <tr key={index}>
                  <td>{clinic.name}</td>
                  <td>{format(new Date(clinic.createdAt), 'dd.MM.yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.dashboardTwo}>
        <div className={styles.statsCard}>
          <p className={styles.titleCard}>Statystyki</p>
          <div className={styles.charts}>
            <div className={styles.chart}>
              <p>Użytkownicy</p>
              <div className={styles.chartContent}>
                <AreaChartComp />
              </div>
            </div>
            <div className={styles.chartContent}>
              <p>Firmy</p>
              <div className={styles.chartContent}>
                <AreaChartComp />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.notesCard}>
          <div className={styles.notesHeader}>
            <p className={styles.titleCard}>Moje notatki</p>

            <div
              onClick={handleAddNote}
              className={`${styles.flex} ${styles.center} ${styles.add}`}
            >
              <p style={{ fontSize: "1.2em" }}>Dodaj</p>
              <img className={styles.ico} src={plus} alt="" />
            </div>
          </div>
          <ul className={styles.notesList}>
            {notes.map((note) => (
              <li key={note.id}>

                <img className={styles.noteIco} src={noteIco} alt="" />
                {note.text}

                <button className={styles.deleteNote}>
                  <img
                    onClick={() => deleteNote(note.id)}
                    className={styles.noteIco}
                    src={bucket}
                    alt=""
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function AdminMain() {
  return (
    <Suspense
      fallback={
        <div className={styles.content}>
          <h1 className={styles.witaj}>
            <Skeleton width={200} />
          </h1>
          <div className={styles.dashboardFour}>
            {Array(4).fill(0).map((_, idx) => (
              <StatCardSkeleton key={idx} />
            ))}
          </div>
          <div className={styles.dashboardTwo}>
            <TableSkeleton />
            <TableSkeleton />
          </div>
          <div className={styles.dashboardTwo}>
            <div className={styles.statsCard}>
              <Skeleton width={120} />
              <div className={styles.charts}>
                <ChartSkeleton />
                <ChartSkeleton />
              </div>
            </div>
            <div className={styles.notesCard}>
              <Skeleton width={120} />
              <div style={{ marginTop: '1rem' }}>
                {Array(4).fill(0).map((_, idx) => (
                  <Skeleton key={idx} height={40} style={{ marginBottom: '0.5rem' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <AdminMainContent />
    </Suspense>
  );
}

export default AdminMain;
