import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import follow from "@assets/img/follow.png";
import editPan from "@assets/img/editPen.png";

import BestWorkerItem from "../../../components/FirmPage/VisitItem/BestWorkerItem";
import { userItems } from "../../../helpers/userItemList";

import styles from "./FirmManagement.module.css";
import Review from "../../../components/FirmPage/Review/Review";
import useStore from "../../../data/store";
import Choice from "../../../components/Modal/Choice";

import profil from "@assets/img/profil.webp";
import ReviewCard from "../../../components/FirmPage/Review/ReviewCard";

import Dropdown from "../../../components/Dropdown/Dropdown";
import exit from "@assets/img/cross.png";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";

function FirmManagement() {
  const { setModalActive, setModalContent } = useStore();
  const { data, isLoading } = useGetUserInfo();
  const { register, reset, handleSubmit } = useForm();

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

  const onSubmit = (formData) => {
    console.log(formData);
    setModalActive(false);
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
      flat: clinic.flat,           // добавлено
      email: clinic.email,
      tel: clinic.tel,
      postIndex: clinic.postIndex,
      description: clinic.description  // добавлено
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
            <input type="text" className={styles.input} {...register("license")} />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} {...register("email")} />
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
            <input type="text" className={styles.input} {...register("street")} />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Nr domu</label>
            <input type="text" className={styles.input} {...register("house")} />
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
            <input type="text" className={styles.input} {...register("postIndex")} />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Opis</label>
            <textarea  className={styles.input} {...register("description")} />
          </div>
        </div>
        <div className={styles.choice}>
          <div></div>
          <BlueBtn type="submit">Aktualizuj</BlueBtn>
        </div>
      </form>
    </div>
  );

  const reviews = [
    {
      name: "Daniel Novikov",
      date: "06.02.2024",
      text: "Ola szykuje się do szkoły. Jest już w piątej klasie. Dawniej obawiała się szkoły, teraz bardzo lubi tam chodzić. W szkole nie tylko uczy się ciekawych rzeczy – spotyka też swoich kolegów i koleżanki. Najbardziej lubi spędzać czas ze swoimi przyjaciółmi z klasy – są to Monika i Michał.",
      rating: 2,
      image: profil,
    },
    {
      name: "Daniel Novikov",
      date: "06.02.2024",
      text: "Bravo.",
      rating: 3,
      image: profil,
    },
    {
      name: "Daniel Novikov",
      date: "06.02.2024",
      text: "Git",
      rating: 5,
      image: profil,
    },
    {
      name: "Daniel Novikov",
      date: "06.02.2024",
      text: "Ola lubi wszystkie przedmioty. Wie, że nauka jest ważna. Najmilej spędza czas na lekcjach o przyrodzie – Ola bardzo lubi zwierzęta. W klasie Oli mieszka chomik. Wszystkie dzieci dbają o niego. Przynoszą mu jedzenie i głaszczą. Ola nie ma własnego zwierzęcia, więc chomik to kolejny powód dla którego lubi chodzić do szkoły.",
      rating: 1,
      image: profil,
    },
    {
      name: "Daniel Novikov",
      date: "06.02.2024",
      text: "Ola lubi wszystkie przedmioty. Wie, że nauka jest ważna. Najmilej spędza czas na lekcjach o przyrodzie – Ola bardzo lubi zwierzęta. W klasie Oli mieszka chomik. Wszystkie dzieci dbają o niego. Przynoszą mu jedzenie i głaszczą. Ola nie ma własnego zwierzęcia, więc chomik to kolejny powód dla którego lubi chodzić do szkoły.",
      rating: 1,
      image: profil,
    },
    {
      name: "Daniel Novikov",
      date: "06.02.2024",
      text: "Ola lubi wszystkie przedmioty. Wie, że nauka jest ważna. Najmilej spędza czas na lekcjach o przyrodzie – Ola bardzo lubi zwierzęta. W klasie Oli mieszka chomik. Wszystkie dzieci dbają o niego. Przynoszą mu jedzenie i głaszczą. Ola nie ma własnego zwierzęcia, więc chomik to kolejny powód dla którego lubi chodzić do szkoły.",
      rating: 1,
      image: profil,
    },
    {
      name: "Daniel Novikov",
      date: "06.02.2024",
      text: "Ola lubi wszystkie przedmioty. Wie, że nauka jest ważna. Najmilej spędza czas na lekcjach o przyrodzie – Ola bardzo lubi zwierzęta. W klasie Oli mieszka chomik. Wszystkie dzieci dbają o niego. Przynoszą mu jedzenie i głaszczą. Ola nie ma własnego zwierzęcia, więc chomik to kolejny powód dla którego lubi chodzić do szkoły.",
      rating: 1,
      image: profil,
    },
  ];

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
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            date={review.date}
            text={review.text}
            rating={review.rating}
            image={review.image}
          />
        ))}
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
            {userItems.slice(-3).map((u, index) => (
              <Review
                key={index}
                name={u.name}
                date={u.date}
                info={u.info}
                img={u.img}
              />
            ))}
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
            {userItems.slice(-5).map((userItem, index) => (
              <BestWorkerItem
                key={index}
                name={userItem.name}
                img={userItem.img}
                date={userItem.date}
                time={userItem.time}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirmManagement;
