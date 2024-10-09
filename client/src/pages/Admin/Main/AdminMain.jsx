import { NavLink } from 'react-router-dom';

import users from '../../../assets/img/users.png';
import graphUp from '../../../assets/img/graph-up.png';
import graphDown from '../../../assets/img/graph-down.png';
import companies from '../../../assets/img/companies.png';
import doctor from '../../../assets/img/doctor-s.png';
import visits from '../../../assets/img/visits.png';
import applications from '../../../assets/img/aplications.png';
import follow from '../../../assets/img/follow.png';
import bucket from '../../../assets/img/bucket.png';
import note from '../../../assets/img/note.png';
import styles from './AdminMain.module.css';
import { AreaChartComponent } from '../../../components/Charts/AreaChartComponent'



function AdminMain() {
  return (
    <div className={styles.content}>
      
      <h1 className={styles.witaj}>Witamy, Tomasz!</h1>
      <div className={styles.dashboardFour}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.iconAdmin} src={users} alt="" />
            <div className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}>
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
            <div className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}>
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
            <div className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}>
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
            <div className={`${styles.graph} ${styles.percentage} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}>
              <p>12%</p>
              <img src={graphUp} alt="" />
            </div>
          </div>
          <div className={styles.cardContent}>
            <span className={styles.count}>124</span>
            <span className={styles.label}>Całkowita liczba zarejestrowanych wizyt</span>
          </div>
        </div>
      </div>
      <div className={styles.dashboardTree}>
        <div className={`${styles.tableCard} ${styles.newUser}`}>
          <p className={styles.titleCard}>Nowi użytkownicy</p>
          <table>
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Numer ID</th>
                <th>Data rejestracji</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jan Bukalski</td>
                <td>456-722-512</td>
                <td>01.06.2024</td>
              </tr>
              <tr>
                <td>Jan Bukalski</td>
                <td>456-722-512</td>
                <td>01.06.2024</td>
              </tr>
              <tr>
                <td>Jan Bukalski</td>
                <td>456-722-512</td>
                <td>01.06.2024</td>
              </tr>
              <tr>
                <td>Jan Bukalski</td>
                <td>456-722-512</td>
                <td>01.06.2024</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`${styles.tableCard} ${styles.newCompanies}`}>
          <p className={styles.titleCard}>Nowe firmy</p>
          <table>
            <thead>
              <tr>
                <th>Firmy</th>
                <th>Data rejestracji</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Allecou Dent</td>
                <td>01.06.2024</td>
              </tr>
              <tr>
                <td>Dzielnica rodzica</td>
                <td>01.06.2024</td>
              </tr>
              <tr>
                <td>Allecou Dent</td>
                <td>01.06.2024</td>
              </tr>
              <tr>
                <td>Dzielnica rodzica</td>
                <td>01.06.2024</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`${styles.requestCard} ${styles.newApplications}`}>
          <div className={styles.requestHeader}>
            <img className={styles.iconAdmin} src={applications} alt="" />
            <NavLink className={styles.black} to="#">
              <div className={`${styles.flex} ${styles.center}`}>
                <p style={{ fontSize: '1.2em' }}>Sprawdź</p>
                <img className={styles.ico} src={follow} alt="" />
              </div>
            </NavLink>
          </div>
          <div className={styles.requestContent}>
            <span className={styles.countBig}>16</span>
            <span className={styles.label}>Wnioski oczekujące na zatwierdzenie</span>
          </div>
        </div>
      </div>
      <div className={styles.dashboardTwo}>
        <div className={styles.statsCard}>
          <p className={styles.titleCard}>Statystyki</p>
          <div className={styles.charts}>
            <div className={styles.chart}>
              <h4>Użytkownicy</h4>
              <div className={styles.chartContent}>
              <AreaChartComponent/>
              </div>
            </div>
            <div className={styles.chart}>
              <h4>Firmy</h4>
              <div className={styles.chartContent}>
              <AreaChartComponent/>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.notesCard}>
          <div className={styles.notesHeader}>
            <p className={styles.titleCard}>Moje notatki</p>
            <NavLink className={styles.black} to="#">
              <div className={`${styles.flex} ${styles.center}`}>
                <p style={{ fontSize: '1.2em' }}>Dodaj</p>
                <img className={styles.ico} src={follow} alt="" />
              </div>
            </NavLink>
          </div>
          <ul className={styles.notesList}>
            <li>
              <img className={styles.noteIco} src={note} alt="" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <button className={styles.deleteNote}>
                <img className={styles.noteIco} src={bucket} alt="" />
              </button>
            </li>
            <li>
              <img className={styles.noteIco} src={note} alt="" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <button className={styles.deleteNote}>
                <img className={styles.noteIco} src={bucket} alt="" />
              </button>
            </li>
            <li>
              <img className={styles.noteIco} src={note} alt="" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <button className={styles.deleteNote}>
                <img className={styles.noteIco}  src={bucket} alt="" />
              </button>
            </li>
            <li>
              <img className={styles.noteIco} src={note} alt="" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <button className={styles.deleteNote}>
                <img className={styles.noteIco} src={bucket} alt="" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
