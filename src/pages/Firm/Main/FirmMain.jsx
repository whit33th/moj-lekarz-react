import { NavLink } from "react-router-dom";

import robot from "@assets/img/robot_svg/1.png";
import graphUp from "@assets/img/graph-up.png";
import graphDown from "@assets/img/graph-down.png";
import follow from "@assets/img/follow.png";
import pointed from "@assets/img/pointed.png";
import unpointed from "@assets/img/unpointed.png";

import BestWorkerItem from "../../../components/FirmPage/VisitItem/BestWorkerItem";
import { userItems } from "../../../helpers/userItemList";

import styles from "./FirmMain.module.css";
import useGetUserInfo from "@api/hooks/UserHooks/useGetUserInfo";
import CalendarBlockClinic from "../../../components/DoctorPage/Home/Calendar/CalendarBlockClinic";
import useGetAppointmentClinic from "./../../../api/hooks/ClinicHooks/useGetAppointmentClinic";
import { useGetClinicProvinceStats } from "./../../../api/hooks/GeneralHooks/Stats/useGetProvinceClinicNumber";
import useClinicStats from "../../../api/hooks/GeneralHooks/Stats/clinicStats";
import useGetWorkersList from "../../../api/hooks/ClinicHooks/useGetWorkersList";
import grey from "@assets/img/grey.png";

function DoctorMain() {
  const { data, isLoading } = useGetUserInfo({});
  const { data: stats } = useClinicStats();
  const { data: workersData } = useGetWorkersList({ clinicId: data?.id,
    ratingSort: 'desc'
   });

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);

  const { data: todayAppointments } = useGetAppointmentClinic({
    date: today.toISOString().split("T")[0],
  });
  const { data: tomorrowAppointments } = useGetAppointmentClinic({
    date: tomorrow.toISOString().split("T")[0],
  });
  const { data: dayAfterAppointments } = useGetAppointmentClinic({
    date: dayAfterTomorrow.toISOString().split("T")[0],
  });
  const { data: threeDaysAppointments } = useGetAppointmentClinic({
    date: threeDaysLater.toISOString().split("T")[0],
  });

  const clinic = {
    name: isLoading ? "Ładowanie..." : data?.name || "Brak",
    nip: isLoading ? "2000-01-01" : data?.nip,
    license: isLoading ? "Ładowanie..." : data?.nr_license || "Brak",
    photo: isLoading ? "Ładowanie..." : data?.photo || "Brak",
    tel: isLoading ? "Ładowanie..." : data?.phone || "Brak",
    email: isLoading ? "Ładowanie..." : data?.email || "Brak",
    description: isLoading ? "Ładowanie..." : data?.description || "Brak",
    city: isLoading ? "Ładowanie..." : data?.address?.city || "Brak",
    street: isLoading ? "Ładowanie..." : data?.address?.street || "Brak",
    house: isLoading ? "Ładowanie..." : data?.address?.home || "Brak",
    flat: isLoading ? "Ładowanie..." : data?.address?.flat || "Brak",
  };

  const history = () => (
    <div
      style={{ justifyContent: "center", gap: "30px" }}
      className={styles.history}
    >
      <div className={styles.meeting}>
        <div>
          <img src={pointed} alt="" />
          <p>Dzisiaj</p>
        </div>
        <p>
          {todayAppointments?.appointments?.length
            ? "Spotkanie z zespołem"
            : "Spotkań nie ma"}
        </p>
      </div>
      <div className={styles.meeting}>
        <div>
          <img src={unpointed} alt="" />
          <p>Jutro</p>
        </div>
        <p>
          {tomorrowAppointments?.appointments?.length
            ? "Spotkanie z zespołem"
            : "Spotkań nie ma"}
        </p>
      </div>
      <div className={styles.meeting}>
        <div>
          <img src={unpointed} alt="" />
          <p>{dayAfterTomorrow.toISOString().split("T")[0]}</p>
        </div>
        <p>
          {dayAfterAppointments?.appointments?.length
            ? "Spotkanie z zespołem"
            : "Spotkań nie ma"}
        </p>
      </div>
      <div className={styles.meeting}>
        <div>
          <img src={unpointed} alt="" />
          <p>{threeDaysLater.toISOString().split("T")[0]}</p>
        </div>
        <p>
          {threeDaysAppointments?.appointments?.length
            ? "Spotkanie z zespołem"
            : "Spotkań nie ma"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="content">
      <div className={styles.topLayer}>
        <div
          className={`${styles.visits} ${styles.mainCard} ${styles.biggerCard}`}
        >
          <img
            id="robot"
            src={robot}
            alt="Robot"
            className={styles.robotImage}
          />

          <div className={`${styles.visitCount} ${styles.twoSide}`}>
            <p className={styles.titleCard}>{clinic.name}</p>
            <p className={`${styles.sTitleCard}, ${styles.grey} `}>
              {clinic.city}, {clinic.street} {clinic.house}
              {clinic.flat ? `/${clinic.flat}` : ""}
            </p>
          </div>

          <div className={styles.botCards}>
            <div className={`${styles.visitStats} ${styles.card}`}>
              <p>
                Całkowita liczba <br /> pacjentów
              </p>
              <div className={styles.center}>
                <p className={`${styles.biggerCard} ${styles.smCountNumber}`}>
                  {stats?.countPatients?.totalCount || "Brak"}
                </p>
                <div
                  className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
                >
                  <p>
                    {stats?.countPatients?.percentageChange?.toFixed(0) + "%" ||
                      "Brak"}
                  </p>
                  <img
                    src={graphDown}
                    alt="Graph Down"
                    className={styles.graphIcon}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.visitStats} ${styles.card}`}>
              <p>
                Średnia ocena
                <br /> pacjenta
              </p>
              <div className={styles.center}>
                <p className={`${styles.biggerCard} ${styles.smCountNumber}`}>
                  {Math.round(stats?.averageRating?.currentRating) || "Brak"}
                </p>
                <div
                  className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
                >
                  <p>
                    {" "}
                    {stats?.averageRating?.percentageChange?.toFixed(0) + "%" ||
                      "Brak"}
                  </p>
                  <img
                    src={graphUp}
                    alt="Graph Up"
                    className={styles.graphIcon}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.mainCard}`}>{history()}</div>
      </div>

      <div className={styles.botLayer}>
        <div className={`${styles.mainCard}`}>
          <div className={`${styles.flex} ${styles.between}`}>
            <p className={styles.titleCard}>Kalendarz</p>
            <NavLink className={styles.black} to="/calendar">
              <div className={`${styles.flex} ${styles.center}`}>
                <p className={styles.followLink}>Otwórz</p>
                <img className={styles.ico} src={follow} alt="Follow" />
              </div>
            </NavLink>
          </div>

          <CalendarBlockClinic />
        </div>

        <div className={`${styles.mainCard} ${styles.biggerCard}`}>
          <div className={`${styles.flex} ${styles.between}`}>
            <p className={styles.titleCard}>Lista najlepszych pracowników</p>
            <NavLink className={styles.black} to="/">
              <div className={`${styles.flex} ${styles.center}`}>
                <p className={styles.followLink}>Zobacz wszystkie</p>
                <img className={styles.ico} src={follow} alt="Follow" />
              </div>
            </NavLink>
          </div>

          <div className={styles.history}>
            {(!workersData?.doctors || workersData.doctors.length === 0) ? (
              <div className={styles.emptyState}>
                <p>Nie ma dostępnych pracowników</p>
              </div>
            ) : (
              workersData.doctors.slice(0, 5).map((doctor, index) => (
                <BestWorkerItem
                  key={index}
                  name={`${doctor.user.first_name} ${doctor.user.last_name}`}
                  img={doctor.user.photo || grey}
                  specialty={doctor.specialty.name}
                  rating={doctor.rating}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorMain;
