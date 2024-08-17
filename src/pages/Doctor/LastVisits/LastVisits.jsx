
import down from '../../../assets/img/down.png';
import search from '../../../assets/img/search.png';
import calendar from '../../../assets/img/calendar.png';
import styles from './LastVisits.module.css';
import { userItems } from '../../../helpers/userItemList';
import PatientLastVisit from '../../../components/DoctorPage/PatientList/PatientLastVisit'

function LastVisits() {
    return (
        <div className="content">
            <div className={styles.calendarNavbar}>
                <div className={styles.calendarNavbarButt}>
                    <span>Sortuj</span>
                    <img className={styles.down} src={down} alt="Sort" />
                </div>
                <span className={styles.calendarNavbarDate}>
                    <span>Ostatnie wizyty</span>
                </span>
                <div className={`${styles.lastVisitsNavbarButt} ${styles.itemsCenter}`}>
                    <img src={calendar} alt="Calendar" />
                    <span>09.23.2222 - 09.23.2222</span>
                    <img className={styles.down} src={down} alt="Sort" />
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.shadow}>
                    <thead>
                        <tr>
                            <th>
                                <div className={styles.top}>
                                    <div className={styles.clientSearch}>
                                        <form className={styles.search} action="" method="post">
                                            <img src={search} alt="search" />
                                            <input 
                                                className={styles.searchInput} 
                                                placeholder="Szukaj pacjenta..." 
                                                type="text" 
                                                name="search" 
                                                id="client-search" 
                                            />
                                        </form>
                                    </div>
                                </div>
                            </th>
                            <th>Numer ID</th>
                            <th>Data</th>
                            <th>Czas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
													userItems.map((u,i) => (
														<PatientLastVisit key={i} name={u.name} id={u.id} date={u.date} time={u.time} img={u.img} />
													) )
												}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LastVisits;
