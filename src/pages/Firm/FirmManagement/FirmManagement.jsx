import { NavLink } from 'react-router-dom'

import follow from '../../../assets/img/follow.png'



import BestWorkerItem from '../../../components/FirmPage/VisitItem/BestWorkerItem'
import { userItems } from '../../../helpers/userItemList'

import styles from './FirmManagement.module.css'
import Review from '../../../components/FirmPage/Revieu/Review'

function FirmManagement() {
	return (
		<div className="content">
			<div className={styles.topLayer}>

				<div className={`${styles.officeInfo} ${styles.mainCard} ${styles.biggerCard}`}>
					<div>
						<p className={styles.title}>Gabinety lekarszkie Iwona Las</p>
						<p className={styles.grey}>Wrocław ul. Szylinga 17 60-131</p>
					</div>

					<div className={styles.officeTime}>
						<p>Pn-Pt: 09:00-18:00</p>
						<p>Sobota: 10:00-13:00 </p>
					</div>

				</div>

				<div className={`${styles.mainCard} ${styles.officeInfo}`}>

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
						<NavLink className={styles.black} to="/">
							<div className={`${styles.flex} ${styles.center}`}>
								<p className={styles.followLink} >Otwórz</p>
								<img className={styles.ico} src={follow} alt="Follow" />
							</div>
						</NavLink>


					</div>
					<div className={styles.reviews} >
					{
						userItems.slice(-5).map((u, index) => (
							<Review key={index} name={u.name} date={u.date} info={u.info} img={u.img}
							/>
						))
					}
					</div>






			</div>

			<div className={`${styles.mainCard} ${styles.biggerCard}`}>
				<div className={`${styles.flex} ${styles.between}`}>
					<p className={styles.titleCard}>Lista najlepszych pracowników</p>
					<NavLink className={styles.black} to="/">
						<div className={`${styles.flex} ${styles.center}`}>
							<p className={styles.followLink} >Zobacz wszystkie</p>
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
		</div >
	)
}

export default FirmManagement
