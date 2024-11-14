import { NavLink } from "react-router-dom";

import follow from "../../../assets/img/follow.png";
import editPan from "../../../assets/img/editPen.png";

import BestWorkerItem from "../../../components/FirmPage/VisitItem/BestWorkerItem";
import { userItems } from "../../../helpers/userItemList";

import styles from "./FirmManagement.module.css";
import Review from "../../../components/FirmPage/Review/Review";
import useStore from "./../../../data/store";
import Choice from "../../../components/Modal/Choice";

import profil from "../../../assets/img/profil.webp";
import ReviewCard from "../../../components/FirmPage/Review/ReviewCard";

import Dropdown from "../../../components/Dropdown/Dropdown";
import exit from "../../../assets/img/cross.png";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";

function FirmManagement() {
  const { setModalActive, setModalContent } = useStore();

  function openMainModal() {
    setModalActive(true);
    setModalContent(ModalContentEdit);
  }
  const ModalContentEdit = (
    <div>
      <form className={styles.form}>
        <img onClick={() => setModalActive(false)} src={exit} alt="cross" />
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Nazwa firmy</label>
            <input
              type="text"
              name="firm"
              defaultValue="Gabinet lekarski Iwona Las"
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>NIP</label>
            <input
              type="text"
              name="nip"
              defaultValue="21344059222321"
              className={styles.input}
              disabled
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Data rejestracji</label>
            <input
              type="date"
              name="house"
              defaultValue="2001-09-11"
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Numer licencji</label>
            <input
              type="text"
              name="license"
              defaultValue="12236897654632"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Miasto</label>
            <input
              type="text"
              name="city"
              defaultValue="Wrocław"
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Ulica</label>
            <input
              type="text"
              name="street"
              defaultValue="ul. Szylinga"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Nr. Domu</label>
            <input
              type="text"
              name="house"
              defaultValue="131"
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Kod pocztowy</label>
            <input
              type="text"
              name="post"
              defaultValue="64-732"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Adres korespondencji</label>
            <input
              type="text"
              name="street"
              defaultValue="ul. Szamarzewskiego"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              defaultValue="Glekwona@wp.pl"
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Telefon</label>
            <input
              type="tel"
              name="tel"
              defaultValue="512495333"
              className={styles.input}
            />
          </div>
        </div>
      </form>
      <div className={styles.choice}>
        <div></div>
        <BlueBtn cb={() => setModalActive(false)}>Aktualizuj</BlueBtn>
      </div>
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
            alt=""
          />
          <div>
            <p className={styles.title}>Gabinety lekarszkie Iwona Las</p>
            <p className={styles.grey}>Wrocław ul. Szylinga 17 60-131</p>
          </div>

          <div className={styles.officeTime}>
            <p>Pn-Pt: 09:00-18:00</p>
            <p>Sobota: 10:00-13:00 </p>
          </div>
        </div>

        <div className={`${styles.mainCard} ${styles.officeInfo} `}>
          <div>
            <p className={styles.title}>Punkt rejestracji</p>
            <p className={styles.grey}>512-495-333</p>
            <p className={styles.grey}>512-495-333</p>
          </div>

          <div>
            <p className={styles.title}>Email</p>
            <p className={styles.grey}>GlekIwona@wp.pl</p>
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
            <p className={styles.titleCard}>Lista najlepszych pracowników</p>
            <NavLink className={styles.black} to="/">
              <div className={`${styles.flex} ${styles.center}`}>
                <p className={styles.followLink}>Zobacz wszystkie</p>
                <img className={styles.ico} src={follow} alt="Follow" />
              </div>
            </NavLink>
          </div>

          <div className={styles.history}>
            {userItems.slice(-5).map((userItem, index) => (
              <BestWorkerItem
                name={userItem.name}
                img={userItem.img}
                date={userItem.date}
                time={userItem.time}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirmManagement;
