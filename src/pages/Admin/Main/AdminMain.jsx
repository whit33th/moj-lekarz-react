import companies from "@assets/img/companies.png";
import doctor from "@assets/img/doctor-s.png";
import graphDown from "@assets/img/graph-down.png";
import graphUp from "@assets/img/graph-up.png";
import users from "@assets/img/users.png";
import visits from "@assets/img/visits.png";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import bucket from "@assets/img/bucket.png";
import noteIco from "@assets/img/note.png";
import plus from "@assets/img/plusBlack.png";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import useDeleteNotion from "../../../api/hooks/GeneralHooks/Notion/useDeleteNotion";
import { useGetNotion } from "../../../api/hooks/GeneralHooks/Notion/useGetNotion";
import usePostNotion from "../../../api/hooks/GeneralHooks/Notion/usePostNotion";
import useAdminStats from "../../../api/hooks/GeneralHooks/Stats/adminStats";
import AreaChartComp from "../../../components/Charts/AreaChart";
import {
  ChartSkeleton,
  StatCardSkeleton,
  TableSkeleton,
} from "../../../components/Skeletons/AdminSkeletons";
import Textarea from "../../../components/UI/TextArea/Textarea";
import { useStats5Months } from "../../../hooks/useStats5Months";
import BlueBtn from "./../../../components/Buttons/BlueBtn/BlueBtn";
import useStore from "./../../../data/store";
import styles from "./AdminMain.module.css";

function AdminMainContent() {
  const stats = useAdminStats();
  const { setModalActive, setModalContent } = useStore();
  const { data: notions } = useGetNotion();

  const { mutate: deleteNotionMutation } = useDeleteNotion();
  const { mutate: postNotionMutation } = usePostNotion();
  const textRef = useRef(null);

  const {
    data: statsData,
    chartConfig,
    isLoading: isStatsLoading,
  } = useStats5Months();

  const NoteModal = (
    <>
      <h1>Dodanie notatki</h1>
      <Textarea ref={textRef} placeholder={"Wpisz temat"} />
      <BlueBtn
        cb={() => {
          console.log(textRef.current.value);
          if (textRef.current.value.trim()) {
            postNotionMutation(textRef.current.value.trim());
          }
        }}
      >
        Dodaj notatkę
      </BlueBtn>
    </>
  );

  function handleAddNote() {
    setModalActive(true);
    setModalContent(NoteModal);
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
      <motion.h1
        initial={{ opacity: 0, y: -7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={styles.witaj}
      >
        Witamy, Tomasz!
      </motion.h1>

      <div className={styles.dashboardFour}>
        {/* Stats Cards with staggered animation */}
        {[
          {
            img: users,
            percent: percentagePatient,
            total: totalPatient,
            label: "Całkowita liczba użytkowników",
          },
          {
            img: companies,
            percent: percentageClinics,
            total: totalClinic,
            label: "Całkowita liczba firm",
          },
          {
            img: doctor,
            percent: percentageDoctors,
            total: totalDoctor,
            label: "Całkowita liczba lekarzy",
          },
          {
            img: visits,
            percent: percentageAppointments,
            total: totalAppointment,
            label: "Zarejestrowanych wizyt",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className={styles.card}
          >
            {/* Card content remains the same */}
            <div className={styles.cardHeader}>
              <img className={styles.iconAdmin} src={item.img} alt="" />
              <div
                className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
              >
                <p>{item.percent.toFixed(2)}%</p>
                <img src={item.percent >= 0 ? graphUp : graphDown} alt="" />
              </div>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.count}>{item.total}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.dashboardTwo}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className={`${styles.tableCard} ${styles.newUser}`}
        >
          {/* New users table content */}
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
                <tr key={patient?.id}>
                  <td>{`${patient?.user?.first_name} ${patient?.user?.last_name}`}</td>
                  <td>{patient?.id}</td>
                  <td>{format(new Date(patient?.createdAt), "dd.MM.yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className={`${styles.tableCard} ${styles.newCompanies}`}
        >
          {/* New companies table content */}
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
                  <td>{clinic?.name}</td>
                  <td>{format(new Date(clinic?.createdAt), "dd.MM.yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      <div className={styles.dashboardTwo}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className={styles.statsCard}
        >
          {/* Stats card content */}
          <p className={styles.titleCard}>Statystyki</p>
          <div className={styles.charts}>
            <div className={styles.chart}>
              <p>Użytkownicy</p>
              <div className={styles.chartContent}>
                {isStatsLoading ? (
                  <ChartSkeleton />
                ) : (
                  statsData && (
                    <AreaChartComp
                      data={statsData}
                      dataKey="patients"
                      domain={chartConfig.domain}
                      ticks={chartConfig.ticks}
                    />
                  )
                )}
              </div>
            </div>
            <div className={styles.chartContent}>
              <p>Firmy</p>
              <div className={styles.chartContent}>
                {isStatsLoading ? (
                  <ChartSkeleton />
                ) : (
                  statsData && (
                    <AreaChartComp
                      data={statsData}
                      dataKey="clinics"
                      domain={chartConfig.domain}
                      ticks={chartConfig.ticks}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.49 }}
          className={styles.notesCard}
        >
          {/* Notes card content */}
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
            {notions?.slice(0, 5).map((note) => (
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                key={note.id}
              >
                <div className={styles.noteContent}>
                  <img className={styles.noteIco} src={noteIco} alt="" />
                  {note?.content}
                </div>
                <button className={styles.deleteNote}>
                  <img
                    onClick={() => deleteNotionMutation(note.id)}
                    className={styles.noteIco}
                    src={bucket}
                    alt=""
                  />
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
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
            {Array(4)
              .fill(0)
              .map((_, idx) => (
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
              <div style={{ marginTop: "1rem" }}>
                {Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <Skeleton
                      key={idx}
                      height={40}
                      style={{ marginBottom: "0.5rem" }}
                    />
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
