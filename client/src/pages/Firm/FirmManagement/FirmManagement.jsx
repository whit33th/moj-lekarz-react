import { NavLink } from "react-router-dom";

import follow from "../../../assets/img/follow.png";
import editPan from "../../../assets/img/editPen.png";

import BestWorkerItem from "../../../components/FirmPage/VisitItem/BestWorkerItem";
import { userItems } from "../../../helpers/userItemList";

import styles from "./FirmManagement.module.css";
import Review from "../../../components/FirmPage/Revieu/Review";
import useStore from "./../../../data/store";
import Choice from "../../../components/Modal/Choice";
import CommentCard from "../../../components/FirmPage/map//CommentCard";
import profil from "../../../assets/img/profil.webp";
function FirmManagement() {
  const { setModalActive, setModalContent } = useStore();
  
  function openMainModal() {
    setModalActive(true);
    setModalContent(ModalContentEdit);
  }
  const ModalContentEdit = (
    <div>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Nazwa firmy</label>
            <input
              type="text"
              defaultValue="Gabinet lekarski Iwona Las" // Начальное значение, которое можно изменить
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>NIP</label>
            <input
              type="text"
              defaultValue="21344059222321" // Начальное значение
              className={styles.input}
              disabled
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Data rejestracji</label>
            <input
              type="text"
              defaultValue="23.09.2001" // Начальное значение
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Numer licencji</label>
            <input
              type="text"
              defaultValue="12236897654632" // Начальное значение
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Miasto</label>
            <input
              type="text"
              defaultValue="Wrocław" // Начальное значение
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Adres</label>
            <input
              type="text"
              defaultValue="ul. Szylinga" // Начальное значение
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Nr. Domu</label>
            <input
              type="text"
              defaultValue="131" // Начальное значение
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Adres korespondencji</label>
            <input
              type="text"
              defaultValue="ul. Szamarzewskiego" // Начальное значение
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Nr. Domu</label>
            <input
              type="text"
              defaultValue="131" // Начальное значение
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              defaultValue="Glekwona@wp.pl" // Начальное значение
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Telefon</label>
            <input
              type="text"
              defaultValue="512495333" // Начальное значение
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Telefon</label>
            <input
              type="text"
              defaultValue="511433333" // Начальное значение
              className={styles.input}
            />
          </div>
        </div>
      </form>
      <Choice
        choice1={"Anuluj"}
        choice2={"Aktualizuj"}
        cb1={() => setModalActive(false)}
      ></Choice>
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
	
  ];

  const modalContentComments = (
    <div className={styles.mainContainer}>
      <div className={styles.cardsContainer}>
        {reviews.map((review, index) => (
          <CommentCard review={review} key={index} />
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
            {userItems.slice(-5).map((u, index) => (
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
