import follow from "@assets/img/follow.png";
import graphDown from "@assets/img/graph-down.png";
import graphUp from "@assets/img/graph-up.png";
import robot from "@assets/img/robot_svg/1.png";
import useGetDoctorAppointment from "@hooks/DoctorHooks/useGetDoctorAppointment";
import useGetUserInfo from "@hooks/UserHooks/useGetUserInfo";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import useDoctorStats from "../../../api/hooks/GeneralHooks/Stats/doctorStats";
import Calendar from "../../../components/DoctorPage/Home/Calendar/CalendarBlock";
import SkeletonTodayVisitItem from "../../../components/DoctorPage/Home/TodayVisitItem/SkeletonTodayVisitItem";
import TodayVisitItem from "../../../components/DoctorPage/Home/TodayVisitItem/TodayVisitItem";
import VisitItem from "../../../components/DoctorPage/Home/VisitItem/VisitItem";
import StatCardSkeleton from "../../../components/FirmPage/StatCard/StatCardSkeleton";
import { pageConfig } from "../../../config/config";
import useStore from "../../../data/store";
import styles from "./DoctorMain.module.css";

function DoctorMain() {
  const {
    todayDate,
    userId,
    selectedDate,
    selectedDateInWords,
    visitCountForMonth,
  } = useStore();

  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo();
  const { data: fetchedAppointmentsData, isLoading: isAppointmentsLoading } =
    useGetDoctorAppointment({
      limit: 10,
      status: "completed",
      dateFrom: "2024-01-01",
    }) || [];
  const {
    data: fetchedAppointmentsTodayData,
    isLoading: isAppointmentsTodayLoading,
  } =
    useGetDoctorAppointment({
      limit: 10,
      id: userId,
      dateFrom: selectedDate,
      dateTo: selectedDate,
    }) || [];

  const { data: stats, isLoading: isStatsLoading } = useDoctorStats();

  const fetchedAppointments = fetchedAppointmentsData?.appointments || [];
  const fetchedAppointmentsToday =
    fetchedAppointmentsTodayData?.appointments || [];

  const user = {
    first_name: userInfo?.first_name || "",
    last_name: userInfo?.last_name || "",
    todayVisitCount: fetchedAppointmentsToday?.length || 0,
    visitsAllTime: visitCountForMonth,
  };

  return (
    <div className="content">
      <motion.h1
        initial={{ opacity: 0, y: -7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={styles.greeting}
      >
        {isUserInfoLoading ? (
          <Skeleton width={220} />
        ) : (
          `Witaj ${user.first_name}! `
        )}
      </motion.h1>

      <div className={styles.topLayer}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${styles.visits} ${styles.mainCard} ${styles.biggerCard}`}
        >
          <img
            id="robot"
            src={robot}
            alt="Robot"
            className={styles.robotImage}
          />

          <div className={`${styles.visitCount} ${styles.twoSide}`}>
            <p className={styles.titleCard}>
              {" "}
              {selectedDate !== todayDate
                ? "Wizyty " + selectedDateInWords
                : "Dzisiejsze wizyty"}
            </p>
            <p className={styles.countNumber}>
              {isAppointmentsTodayLoading ? (
                <Skeleton width={50} />
              ) : (
                user.todayVisitCount
              )}
            </p>
          </div>

          <div className={styles.botCards}>
            {isStatsLoading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <div className={`${styles.visitStats} ${styles.card}`}>
                  <p>Całkowita liczba pacjentów</p>
                  <div className={styles.center}>
                    <p
                      className={`${styles.biggerCard} ${styles.smCountNumber}`}
                    >
                      {stats?.countPatients?.totalCount || "0"}
                    </p>
                    {!isNaN(stats?.countPatients?.percentageChange) &&
                      stats?.countPatients?.percentageChange !== null && (
                        <div
                          className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
                        >
                          <p>
                            {stats.countPatients.percentageChange.toFixed(0) +
                              "%"}
                          </p>
                          <img
                            src={
                              stats.countPatients.percentageChange >= 0
                                ? graphUp
                                : graphDown
                            }
                            alt="Graph"
                            className={styles.graphIcon}
                          />
                        </div>
                      )}
                  </div>
                </div>

                <div className={`${styles.visitStats} ${styles.card}`}>
                  <p>Wizyt w całym miesiącu</p>
                  <div className={styles.center}>
                    <p
                      className={`${styles.biggerCard} ${styles.smCountNumber}`}
                    >
                      {stats?.countAppointments?.totalCount || "0"}
                    </p>
                    {!isNaN(stats?.countAppointments?.percentageChange) &&
                      stats?.countAppointments?.percentageChange !== null && (
                        <div
                          className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
                        >
                          <p>
                            {stats.countAppointments.percentageChange.toFixed(
                              0
                            ) + "%"}
                          </p>
                          <img
                            src={
                              stats.countAppointments.percentageChange >= 0
                                ? graphUp
                                : graphDown
                            }
                            alt="Graph"
                            className={styles.graphIcon}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.07 }}
          className={`${styles.mainCard}`}
        >
          <div className={`${styles.flex} ${styles.between}`}>
            <p className={styles.titleCard}>Ostatnie wizyty</p>
            <NavLink className={styles.black} to={pageConfig.doctor.lastVisits}>
              <div className={`${styles.flex} ${styles.center}`}>
                <p className={styles.followLink}>Więcej</p>
                <img className={styles.ico} src={follow} alt="Follow" />
              </div>
            </NavLink>
          </div>
          <div className={styles.history}>
            {fetchedAppointmentsData && fetchedAppointments.length === 0 && (
              <p className={styles.noVisits}>Nie masz wizyt</p>
            )}
            {fetchedAppointmentsToday && !isAppointmentsLoading ? (
              fetchedAppointments
                .slice(-3)
                .map((appointment, index) => (
                  <VisitItem
                    firstName={appointment?.patient?.first_name}
                    lastName={appointment?.patient?.last_name}
                    img={appointment?.patient?.photo}
                    date={appointment?.date}
                    startTime={appointment?.start_time || "00:00"}
                    endTime={appointment?.end_time}
                    type={appointment?.visit_type}
                    patientId={appointment?.patient?.patientId}
                    key={index}
                    index={index}
                  />
                ))
            ) : (
              <SkeletonTodayVisitItem count={3} />
            )}
          </div>
        </motion.div>
      </div>

      <div className={styles.botLayer}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className={`${styles.mainCard}`}
        >
          <div className={`${styles.flex} ${styles.between}`}>
            <p className={styles.titleCard}>Kalendarz</p>
            <NavLink className={styles.black} to={pageConfig.doctor.calendar}>
              <div className={`${styles.flex} ${styles.center}`}>
                <p className={styles.followLink}>Otwórz</p>
                <img className={styles.ico} src={follow} alt="Follow" />
              </div>
            </NavLink>
          </div>

          <Calendar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.21 }}
          className={`${styles.mainCard} ${styles.biggerCard}`}
        >
          <div className={`${styles.flex} ${styles.between}`}>
            {selectedDate === todayDate ? (
              <p className={styles.titleCard}>Dzisiejsze wizyty</p>
            ) : (
              <p className={styles.titleCard}> Wizyty {selectedDateInWords}</p>
            )}

            <NavLink
              className={styles.black}
              to={pageConfig.doctor.todaysVisits}
            >
              <div className={`${styles.flex} ${styles.center}`}>
                <p className={styles.followLink}>Zobacz wszystkie</p>
                <img className={styles.ico} src={follow} alt="Follow" />
              </div>
            </NavLink>
          </div>

          <div className={styles.history}>
            {fetchedAppointmentsTodayData &&
              fetchedAppointmentsToday.length === 0 && (
                <p className={styles.noVisits}>Nie masz wizyt</p>
              )}
            {fetchedAppointmentsToday && !isAppointmentsTodayLoading ? (
              fetchedAppointmentsToday
                .slice(-6)
                .map((appointment, index) => (
                  <TodayVisitItem
                    firstName={appointment?.patient?.first_name}
                    lastName={appointment?.patient?.last_name}
                    img={appointment?.patient.photo}
                    type={appointment?.visit_type}
                    startTime={appointment?.start_time || "00:00"}
                    endTime={appointment?.end_time}
                    date={appointment?.date}
                    patientId={appointment?.patient?.patientId}
                    key={index}
                    index={index}
                  />
                ))
            ) : (
              <SkeletonTodayVisitItem count={6} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DoctorMain;
