
import styles from './PatientList.module.css'

import searchIco from '../../../assets/img/search.png';
import down from '../../../assets/img/down.png';
import filters from '../../../assets/img/filters.png';
import PatientItem from '../../../components/DoctorPage/PatientList/PatientItem'
import { userItems } from '../../../helpers/userItemList'


function PatientList() {
	return (
		<div className="content">
			<div className={styles.calendarNavbar}>
				<div className={`${styles.calendarNavbarButt} ${styles.filters}`}>
					<span>Sortuj</span>
					<img className={styles.down} src={down} alt="Sort" />
				</div>
				<span className={styles.calendarNavbarDate}>
					<span>Lista pacjentów</span>
				</span>
				<div className={`${styles.filters} ${styles.calendarNavbarButt}`}>
					<span>Filtry</span>
					<img src={filters} alt="Filters" />
				</div>
			</div>

			<div className={styles.tableContainer} >
				<table className={styles.shadow}>
					<thead>
						<tr>
							<th>
								<div className={styles.top}>
									<div className={styles.clientSearch}>
										<form className={styles.search} action="" method="post">
											<img src={searchIco} alt="search" />
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
							<th>Płeć</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							userItems.map((userItem, index) => (
								<PatientItem key={index} 
								img={userItem.img} 
								name={userItem.name} 
								id={userItem.id} 
								gender={userItem.gender}  
								/>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default PatientList
