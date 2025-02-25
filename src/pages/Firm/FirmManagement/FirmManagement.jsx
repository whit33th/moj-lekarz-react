import exit from "@assets/img/cross.png";
import follow from "@assets/img/follow.png";
import grey from "@assets/img/grey.png";
import profil from "@assets/img/profil.webp";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import useGetWorkersList from "../../../api/hooks/ClinicHooks/useGetWorkersList";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import SkeletonTodayVisitItem from "../../../components/DoctorPage/Home/TodayVisitItem/SkeletonTodayVisitItem";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Review from "../../../components/FirmPage/Review/Review";
import ReviewCard from "../../../components/FirmPage/Review/ReviewCard";
import BestWorkerItem from "../../../components/FirmPage/VisitItem/BestWorkerItem";
import { pageConfig } from "../../../config/config";
import useStore from "../../../data/store";
import useGetClinicReviews from "./../../../api/hooks/GeneralHooks/ReviewsHooks/useGetClinicReviews";
import styles from "./FirmManagement.module.css";

function FirmManagement() {
  const { setModalActive, setModalContent } = useStore();
  const { data, isLoading } = useGetUserInfo();
  const { data: workersData } = useGetWorkersList({
    clinicId: data?.id,
  });

  const formatTimetables = (timetables) => {
    if (!timetables || timetables.length === 0) {
      return Array(7).fill({ day: "Brak danych", hours: "Zamknięte" });
    }

    const daysOfWeek = [
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
      "Niedziela",
    ];

    return daysOfWeek.map((day, index) => {
      const daySchedule = timetables.find((t) => t.day_of_week === index + 1);
      return {
        day,
        hours:
          daySchedule.start_time && daySchedule.end_time
            ? `${daySchedule.start_time?.slice(
                0,
                5
              )}-${daySchedule.end_time?.slice(0, 5)}`
            : "Zamknięte",
      };
    });
  };

  const WorkingHoursGrid = ({ timetables }) => (
    <div className={styles.workingHoursGrid}>
      {formatTimetables(timetables).map((schedule, index) => (
        <p key={index} className={styles.scheduleItem}>
          {`${schedule.day}: ${schedule.hours}`}
        </p>
      ))}
    </div>
  );

  const clinic = {
    id: data?.id,
    name: isLoading ? "Ładowanie..." : data?.name || "Brak",
    nip: isLoading ? "Ładowanie..." : data?.nip || "Brak",
    license: isLoading ? "Ładowanie..." : data?.nr_license || "Brak",
    photo: isLoading ? profil : data?.photo || profil,
    tel: isLoading ? "Ładowanie..." : data?.phone || "Brak",
    email: isLoading ? "Ładowanie..." : data?.email || "Brak",
    description: isLoading ? "Ładowanie..." : data?.description || "Brak",
    city: isLoading ? "Ładowanie..." : data?.address?.city || "Brak",
    province: isLoading ? "Ładowanie..." : data?.address?.province || "Brak",
    street: isLoading ? "Ładowanie..." : data?.address?.street || "Brak",
    house: isLoading ? "Ładowanie..." : data?.address?.home || "Brak",
    flat: isLoading ? "Ładowanie..." : data?.address?.flat || "Brak",
    postIndex: isLoading ? "Ładowanie..." : data?.address?.post_index || "Brak",
  };

  const { data: reviewsData } = useGetClinicReviews({ clinicId: 142 });

  const modalContentComments = (
    <div className={styles.mainContainer}>
      <div className={styles.Navbar}>
        <div className={styles.Dropdown}>
          <Dropdown
            defaultOption="Sortuj"
            selectedOptionChanging={false}
            color={"#A6DEF7"}
            options={[
              "Najpierw nowe",
              "Najpierw stare",
              "W rankingu rosnącym",
              "W rankingu malejącym",
            ]}
            listStyle="elipse"
          />
        </div>
        <img onClick={() => setModalActive(false)} src={exit} alt="cross" />
      </div>
      <div className={styles.cardsContainer}>
        {reviewsData?.reviews?.length > 0 ? (
          reviewsData.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <p className={styles.noReviews}>Brak komentarzy</p>
        )}
      </div>
    </div>
  );
  return (
    <div className="content">
      <div className={styles.topLayer}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${styles.officeInfo} ${styles.mainCard} ${styles.biggerCard} ${styles.editDiv}`}
        >
          <div>
            <p className={styles.title}>{clinic.name}</p>
            <p
              className={styles.grey}
            >{`${clinic.city}, ${clinic.province}, ${clinic.street} ${clinic.house}`}</p>
          </div>
          <div className={styles.officeTime}>
            <WorkingHoursGrid timetables={data?.timetables} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${styles.mainCard} ${styles.officeInfo}`}
        >
          <div>
            <p className={styles.title}>Punkt rejestracji</p>
            <p className={styles.grey}>{clinic.tel}</p>
          </div>
          <div>
            <p className={styles.title}>Email</p>
            <p className={styles.grey}>{clinic.email}</p>
          </div>
        </motion.div>
      </div>

      <div className={styles.botLayer}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${styles.mainCard}`}
        >
          <div className={`${styles.flex} ${styles.between}`}>
            <p className={styles.titleCard}>Komentarze</p>
            {reviewsData?.reviews?.length > 0 && (
              <button
                onClick={() => {
                  setModalActive(true);
                  setModalContent(modalContentComments);
                }}
                className={styles.transparentBtn}
              >
                <div className={`${styles.flex} ${styles.center}`}>
                  <p className={styles.followLink}>Otwórz</p>
                  <img className={styles.ico} src={follow} alt="Follow" />
                </div>
              </button>
            )}
          </div>
          <div className={styles.reviews}>
            {reviewsData?.reviews && !isLoading ? (
              !reviewsData.reviews || reviewsData.reviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={styles.emptyState}
                >
                  <p>Nie ma komentarzy</p>
                </motion.div>
              ) : (
                reviewsData.reviews.slice(0, 3).map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <Review review={review} />
                  </motion.div>
                ))
              )
            ) : (
              <SkeletonTodayVisitItem count={3} />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`${styles.mainCard} ${styles.biggerCard}`}
        >
          <div className={`${styles.flex} ${styles.between}`}>
            <p className={styles.titleCard}>Dostępne lekarzy</p>
            {workersData?.doctors?.length > 0 && (
              <NavLink className={styles.black} to={pageConfig.firm.workers}>
                <div className={`${styles.flex} ${styles.center}`}>
                  <p className={styles.followLink}>Otwórz</p>
                  <img className={styles.ico} src={follow} alt="Follow" />
                </div>
              </NavLink>
            )}
          </div>

          <div className={styles.history}>
            {workersData?.doctors && !isLoading ? (
              !workersData.doctors || workersData.doctors.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={styles.emptyState}
                >
                  <p>Nie ma dostępnych lekarzy</p>
                </motion.div>
              ) : (
                workersData.doctors
                  .slice(0, 5)
                  .map((doctor, index) => (
                    <BestWorkerItem
                      key={doctor?.id}
                      index={index}
                      id={doctor?.id}
                      name={`${doctor.user.first_name} ${doctor.user.last_name}`}
                      img={doctor.user.photo || grey}
                      specialty={doctor.specialty.name}
                      rating={doctor.rating}
                    />
                  ))
              )
            ) : (
              <SkeletonTodayVisitItem count={5} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FirmManagement;
