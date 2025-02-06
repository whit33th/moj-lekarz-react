import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import follow from "@assets/img/follow.png";
import editPan from "@assets/img/editPen.png";
import BestWorkerItem from "../../../components/FirmPage/VisitItem/BestWorkerItem";
import { userItems } from "../../../helpers/userItemList";
import styles from "./FirmManagement.module.css";
import Review from "../../../components/FirmPage/Review/Review";
import useStore from "../../../data/store";
import profil from "@assets/img/profil.webp";
import ReviewCard from "../../../components/FirmPage/Review/ReviewCard";
import Dropdown from "../../../components/Dropdown/Dropdown";
import exit from "@assets/img/cross.png";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import useGetClinicReviews from "./../../../api/hooks/GeneralHooks/ReviewsHooks/useGetClinicReviews";
import usePutUserInfo from "@api/hooks/UserHooks/usePutUserInfo";
import useGetWorkersList from "../../../api/hooks/ClinicHooks/useGetWorkersList";
import grey from "@assets/img/grey.png";

function FirmManagement() {
  const { setModalActive, setModalContent } = useStore();
  const { data, isLoading } = useGetUserInfo();
  const { register, reset, handleSubmit } = useForm();
  const { data: workersData } = useGetWorkersList({
    clinicId: data?.id
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
  const { mutate } = usePutUserInfo();

  const onSubmit = (formData) => {
    const formattedData = {
      userData: {
        email: formData.email,
        phone: formData.tel,
        first_name: "z", // These fields are not in the form
        last_name: "z", // but required by the API
        birthday: "01-01-2000",
        pesel: "12312312312",
        gender: "male",
        name: formData.firm,
        nip: formData.nip,
        nr_license: formData.license,
        description: formData.description || "",
      },
      addressData: {
        city: formData.city,
        province: formData.province || "",
        street: formData.street,
        home: formData.house,
        flat: formData.flat,
        post_index: formData.postIndex,
      },
    };

    mutate(formattedData);
  };

  function openMainModal() {
    reset({
      firm: clinic.name,
      nip: clinic.nip,
      license: clinic.license,
      city: clinic.city,
      province: clinic.province,
      street: clinic.street,
      house: clinic.house,
      flat: clinic.flat, // добавлено
      email: clinic.email,
      tel: clinic.tel,
      postIndex: clinic.postIndex,
      description: clinic.description, // добавлено
    });
    setModalActive(true);
    setModalContent(ModalContentEdit);
  }

  const ModalContentEdit = (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <img onClick={() => setModalActive(false)} src={exit} alt="cross" />
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Nazwa firmy</label>
            <input type="text" className={styles.input} {...register("firm")} />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>NIP</label>
            <input
              type="text"
              className={styles.input}
              disabled
              {...register("nip")}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Licencja</label>
            <input
              type="text"
              className={styles.input}
              {...register("license")}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              {...register("email")}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Miasto</label>
            <input type="text" className={styles.input} {...register("city")} />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Województwo</label>
            <input
              type="text"
              className={styles.input}
              {...register("province")}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Ulica</label>
            <input
              type="text"
              className={styles.input}
              {...register("street")}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Nr domu</label>
            <input
              type="text"
              className={styles.input}
              {...register("house")}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Nr mieszkania</label>
            <input type="text" className={styles.input} {...register("flat")} />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Telefon</label>
            <input type="tel" className={styles.input} {...register("tel")} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Kod pocztowy</label>
            <input
              type="text"
              className={styles.input}
              {...register("postIndex")}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Opis</label>
            <textarea className={styles.input} {...register("description")} />
          </div>
        </div>
        <div className={styles.choice}>
          <div></div>
          <BlueBtn type="submit">Aktualizuj</BlueBtn>
        </div>
      </form>
    </div>
  );

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
        <div
          className={`${styles.officeInfo} ${styles.mainCard} ${styles.biggerCard} ${styles.editDiv}`}
        >
          <img
            onClick={openMainModal}
            className={styles.pen}
            src={editPan}
            alt="edit"
          />
          <div>
            <p className={styles.title}>{clinic.name}</p>
            <p
              className={styles.grey}
            >{`${clinic.city}, ${clinic.province}, ${clinic.street} ${clinic.house}`}</p>
          </div>
          <div className={styles.officeTime}>
            <WorkingHoursGrid timetables={data?.timetables} />
          </div>
        </div>

        <div className={`${styles.mainCard} ${styles.officeInfo}`}>
          <div>
            <p className={styles.title}>Punkt rejestracji</p>
            <p className={styles.grey}>{clinic.tel}</p>
          </div>
          <div>
            <p className={styles.title}>Email</p>
            <p className={styles.grey}>{clinic.email}</p>
          </div>
        </div>
      </div>

      <div className={styles.botLayer}>
        <div className={`${styles.mainCard}`}>
          <div className={`${styles.flex} ${styles.between}`}>
            <p className={styles.titleCard}>Komentarze</p>
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
          </div>
          <div className={styles.reviews}>
            {(!reviewsData?.reviews || reviewsData.reviews.length === 0) ? (
              <div className={styles.emptyState}>
                <p>Nie ma komentarzy</p>
              </div>
            ) : (
              reviewsData.reviews.slice(0, 3).map((review, index) => (
                <Review key={index} review={review} />
              ))
            )}
          </div>
        </div>

        <div className={`${styles.mainCard} ${styles.biggerCard}`}>
          <div className={`${styles.flex} ${styles.between}`}>
            <p className={styles.titleCard}>Dostępne lekarzy</p>
            <NavLink className={styles.black} to="/">
              <div className={`${styles.flex} ${styles.center}`}>
                <p className={styles.followLink}>Otwórz</p>
                <img className={styles.ico} src={follow} alt="Follow" />
              </div>
            </NavLink>
          </div>

          <div className={styles.history}>
            {(!workersData?.doctors || workersData.doctors.length === 0) ? (
              <div className={styles.emptyState}>
                <p>Nie ma dostępnych lekarzy</p>
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

export default FirmManagement;
