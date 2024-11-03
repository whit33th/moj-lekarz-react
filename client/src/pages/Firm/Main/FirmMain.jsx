	import { NavLink } from 'react-router-dom'

import robot from '../../../assets/img/robot_svg/1.png'
import graphUp from '../../../assets/img/graph-up.png'
import graphDown from '../../../assets/img/graph-down.png'
import follow from '../../../assets/img/follow.png'
import pointed from '../../../assets/img/pointed.png'
import unpointed from '../../../assets/img/unpointed.png'

import BestWorkerItem from '../../../components/FirmPage/VisitItem/BestWorkerItem'
import { userItems } from '../../../helpers/userItemList'
import Calendar from '../../../components/DoctorPage/Home/Calendar/CalendarBlock'

import styles from './FirmMain.module.css'

function DoctorMain() {
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
            <p className={styles.titleCard}>
              Przychodnia 36 Gabinety lekarskie
            </p>
            <p className={`${styles.sTitleCard}, ${styles.grey} `}>
              Poznań. Ul. Szylinga 13
            </p>
          </div>

          <div className={styles.botCards}>
            <div className={`${styles.visitStats} ${styles.card}`}>
              <p>
                Całkowita liczba <br /> pacjentów
              </p>
              <div className={styles.center}>
                <p className={`${styles.biggerCard} ${styles.smCountNumber}`}>
                  509
                </p>
                <div
                  className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
                >
                  <p>12%</p>
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
                Całkowita liczba
                <br /> pacjentów
              </p>
              <div className={styles.center}>
                <p className={`${styles.biggerCard} ${styles.smCountNumber}`}>
                  4.1
                </p>
                <div
                  className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
                >
                  <p>32%</p>
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

        <div className={`${styles.mainCard}`}>
          <div className={styles.history}>
            <div className={styles.meeting}>
              <div>
                <img src={pointed} alt="" />
                <p>Dzisiaj</p>
              </div>
              <p>Spotkań nie ma</p>
            </div>

            <div className={styles.meeting}>
              <div>
                <img src={unpointed} alt="" />
                <p>Jutro</p>
              </div>
              <p>Spotkanie z zespolem</p>
            </div>

            <div className={styles.meeting}>
              <div>
                <img src={unpointed} alt="" />
                <p>11.05.2024</p>
              </div>
              <p>Spotkań nie ma</p>
            </div>

            <div className={styles.meeting}>
              <div>
                <img src={unpointed} alt="" />
                <p>12.05.2024</p>
              </div>
              <p>Spotkanie z zespolem</p>
            </div>
          </div>
        </div>
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

          <Calendar />
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
                position={userItem.position}
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

export default DoctorMain
