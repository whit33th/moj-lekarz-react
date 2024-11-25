import { NavLink } from 'react-router-dom'

import robot from '../../../assets/img/robot_svg/1.png'
import graphUp from '../../../assets/img/graph-up.png'
import graphDown from '../../../assets/img/graph-down.png'
import follow from '../../../assets/img/follow.png'

import VisitItem from '../../../components/DoctorPage/Home/VisitItem/VisitItem'
import { userItems, myData } from '../../../helpers/userItemList'
import Calendar from '../../../components/DoctorPage/Home/Calendar/CalendarBlock'

import styles from './DoctorMain.module.css'
import useGetShortInfo from './../../../hooks/DoctorHooks/useGetShortInfo'
import useStore from '../../../data/store'
import useGetDoctorAppointment from '../../../hooks/DoctorHooks/useGetDoctorAppointemt'


function DoctorMain() {
	const { userId } = useStore()
	const { data: doctorInfo } = useGetShortInfo(userId)
	const { data: appointments } = useGetDoctorAppointment(userId)

	console.log(appointments)
	return (
		<div className="content">
			{doctorInfo && (
				<h1 className={styles.greeting}>
					Witaj {doctorInfo.user.first_name} {doctorInfo.user.last_name}
				</h1>
			)}


			<div className={styles.topLayer}>
				<div className={`${styles.visits} ${styles.mainCard} ${styles.biggerCard}`}>
					<img id="robot" src={robot} alt="Robot" className={styles.robotImage} />

					{appointments && (<div className={`${styles.visitCount} ${styles.twoSide}`}>
						<p className={styles.titleCard}>Dzisiejsze wizyty</p>
						<p className={styles.countNumber}>{appointments.length}</p>
					</div>)}



					<div className={styles.botCards}>
						<div className={`${styles.visitStats} ${styles.card}`}>
							<p>Całkowita liczba pacjentów</p>
							<div className={styles.center}>
								<p className={`${styles.biggerCard} ${styles.smCountNumber}`}>124</p>
								<div className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}>
									<p>12%</p>
									<img src={graphDown} alt="Graph Down" className={styles.graphIcon} />
								</div>
							</div>
						</div>

						<div className={`${styles.visitStats} ${styles.card}`}>
							<p>Całkowita liczba pacjentów</p>
							<div className={styles.center}>
								<p className={`${styles.biggerCard} ${styles.smCountNumber}`}>666</p>
								<div className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}>
									<p>32%</p>
									<img src={graphUp} alt="Graph Up" className={styles.graphIcon} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.mainCard}`}>
					<div className={`${styles.flex} ${styles.between}`}>
						<p className={styles.titleCard}>Ostatnie wizyty</p>
						<NavLink className={styles.black} to="/last-visits">
							<div className={`${styles.flex} ${styles.center}`}>
								<p className={styles.followLink}>Więcej</p>
								<img className={styles.ico} src={follow} alt="Follow" />
							</div>
						</NavLink>
					</div>
					<div className={styles.visitHistory}>


						<div className={styles.history}>
							{userItems.slice(-3).map((userItem, index) => (
								<VisitItem
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

			<div className={styles.botLayer}>
				<div className={`${styles.mainCard}`}>
					<div className={`${styles.flex} ${styles.between}`}>
						<p className={styles.titleCard}>Kalendarz</p>
						<NavLink className={styles.black} to='/calendar'>
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
						<p className={styles.titleCard}>Dzisiejsze wizyty</p>
						<NavLink className={styles.black} to="/todays-visits">
							<div className={`${styles.flex} ${styles.center}`}>
								<p className={styles.followLink} >Zobacz wszystkie</p>
								<img className={styles.ico} src={follow} alt="Follow" />
							</div>
						</NavLink>
					</div>

					<div className={styles.history}>
						{userItems.slice(-5).map((userItem, index) => (
							<VisitItem
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
	)
}

export default DoctorMain
