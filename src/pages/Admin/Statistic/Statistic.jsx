import calendar from "@assets/img/calendar.png";
import companies from "@assets/img/companies.png";
import doctor from "@assets/img/doctor-s.png";
import graphDown from "@assets/img/graph-down.png";
import graphUp from "@assets/img/graph-up.png";
import robot from "@assets/img/robot_svg/1.png";
import users from "@assets/img/users.png";
import visits from "@assets/img/visits.png";
import star from "@assets/img/star.png";
import ColorfulRatingChart from "../../../components/Charts/RadialChart";
import Dropdown from "../../../components/Dropdown/Dropdown";
import styles from "./Statistic.module.css";

function Statistic() {
  return (
    <div className={styles.content}>
      <div className={styles.navbar}>
        <Dropdown
          options={["May 2024", "01.06.2024 - 1.07.2024"]}
          color={"#A6DEF7"}
          childrenLeft={<img src={calendar} />}
        />
      </div>
      <div className={styles.dashboardFour}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={users} alt="" />
            <div
              className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
            >
              <p>12%</p>
              <img src={graphDown} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>124</span>
            <span className={styles.label}>Całkowita liczba użytkowników</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={companies} alt="" />
            <div
              className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
            >
              <p>12%</p>
              <img src={graphUp} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>124</span>
            <span className={styles.label}>Całkowita liczba firm</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={doctor} alt="" />
            <div
              className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
            >
              <p>12%</p>
              <img src={graphUp} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>124</span>
            <span className={styles.label}>Całkowita liczba lekarzy</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={visits} alt="" />
            <div
              className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
            >
              <p>12%</p>
              <img src={graphUp} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>124</span>
            <span className={styles.label}>
              Całkowita liczba zarejestrowanych wizyt
            </span>
          </div>
        </div>
      </div>
      <div className={styles.dashboardTwo}>
        <div className={`${styles.tableCard} ${styles.newUser}`}>
          <p className={styles.titleCard}>Ranking lekarzy</p>
          <table>
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Sranowisko</th>
                <th>Firma</th>
                <th>Ocena</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td>Mateusz Nowak </td>
                  <td>Dentysta</td>
                  <td>Allecou Dent</td>
                  <td style={{}}>
                    <div className={styles.rating}>
                      <div>
                        <p>4.5</p>
                        <img src={star} alt="" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.tableCard} ${styles.newCompanies}`}>
          <p className={styles.titleCard}>Ranking miast</p>
          <table>
            <thead>
              <tr>
                <th>Miasto</th>
                <th>Liczba firm</th>
                <th>Ogólna ocena</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td>Poznań</td>
                  <td>189</td>
                  <td>
                    <div className={styles.rating}>
                      <div>
                        <p>4.5</p>
                        <img src={star} alt="" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.bot}>
        <div className={styles.statsCard}>
          <p className={styles.titleCard}>Ocena witryny od użytkowników</p>
          <div className={styles.charts}>
            <ColorfulRatingChart data={[20, 20, 20, 30, 10]} />
          </div>
        </div>
        <div className={styles.notesCard}>
          <div className={styles.notesHeader}>
            <p className={styles.titleCard}>Ocena serwisu od firm</p>
          </div>
          <div className={styles.graphDiv}>
            <ColorfulRatingChart data={[25, 22, 15, 25, 13]} />
            <div className={styles.robotDiv}>
              <img className={styles.robot} src={robot} alt="robot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistic;
