import { NavLink } from "react-router-dom"
import robot from "@assets/img/robot_svg/1.png"
import graphUp from "@assets/img/graph-up.png"
import graphDown from "@assets/img/graph-down.png"
import follow from "@assets/img/follow.png"
import VisitItem from "../../../components/DoctorPage/Home/VisitItem/VisitItem"
import Calendar from "../../../components/DoctorPage/Home/Calendar/CalendarBlock"
import styles from "./DoctorMain.module.css"
import useStore from "../../../data/store"
import useGetDoctorAppointment from "@hooks/DoctorHooks/useGetDoctorAppointment"
import TodayVisitItem from "../../../components/DoctorPage/Home/TodayVisitItem/TodayVisitItem"
import useGetUserInfo from '@hooks/UserHooks/useGetUserInfo'
import Skeleton from 'react-loading-skeleton'
import SkeletonTodayVisitItem from '../../../components/DoctorPage/Home/TodayVisitItem/SkeletonTodayVisitItem'
function DoctorMain() {
	const { todayDate, userId, selectedDate, selectedDateInWords, visitCountForMonth } = useStore()

	const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo()
	const { data: fetchedAppointmentsData, isLoading: isAppointmentsLoading } = useGetDoctorAppointment({
		limit: 10,
		status: 'completed',
		dateFrom: '2024-01-01',
	}) || []
	const { data: fetchedAppointmentsTodayData, isLoading: isAppointmentsTodayLoading } = useGetDoctorAppointment({
		limit: 10,
		id: userId,
		dateFrom: selectedDate,
		dateTo: selectedDate,
	}) || []


	const fetchedAppointments = fetchedAppointmentsData?.slots || []
	const fetchedAppointmentsToday = fetchedAppointmentsTodayData?.slots || []

	const user = {
		first_name: userInfo?.first_name || '',
		last_name: userInfo?.last_name || '',
		todayVisitCount: fetchedAppointmentsToday?.length || 0,
		visitsAllTime: visitCountForMonth
	}

	return (
		<div className="content">





			<h1 className={styles.greeting}>
				{isUserInfoLoading ? <Skeleton width={220} /> : `Witaj ${user.first_name}! `}
			</h1>


			<div className={styles.topLayer}>
				<div className={`${styles.visits} ${styles.mainCard} ${styles.biggerCard}`}>
					<img id="robot" src={robot} alt="Robot" className={styles.robotImage} />


					<div className={`${styles.visitCount} ${styles.twoSide}`}>
						<p className={styles.titleCard}> {selectedDate !== todayDate ? "Wizyty " + selectedDateInWords : 'Dzisiejsze wizyty'}</p>
						<p className={styles.countNumber}>{isAppointmentsTodayLoading ? <Skeleton width={50} /> : user.todayVisitCount}</p>
					</div>


					<div className={styles.botCards}>
						<div className={`${styles.visitStats} ${styles.card}`}>
							<p>Całkowita liczba pacjentów</p>
							<div className={styles.center}>
								<p className={`${styles.biggerCard} ${styles.smCountNumber}`}>124</p>
								<div
									className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
								>
									<p>12%</p>
									<img src={graphDown} alt="Graph Down" className={styles.graphIcon} />
								</div>
							</div>
						</div>


						<div className={`${styles.visitStats} ${styles.card}`}>
							<p>Wizyt w całym miesiącu</p>
							<div className={styles.center}>
								<p className={`${styles.biggerCard} ${styles.smCountNumber}`}>
									{user.visitsAllTime}
								</p>
								<div
									className={`${styles.graph} ${styles.tCenter} ${styles.smBack} ${styles.flex} ${styles.itemsCenter}`}
								>
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
					<div className={styles.history}>
						{fetchedAppointmentsData && fetchedAppointments.length === 0 && <p className={styles.noVisits}>Nie masz wizyt</p>}
						{fetchedAppointmentsToday && !isAppointmentsLoading ?
							fetchedAppointments
								.slice(-3)
								.map((appointment, index) => (
									<VisitItem
										firstName={appointment?.patient?.first_name}
										lastName={appointment?.patient?.last_name}
										img={appointment?.patient?.photo}
										date={appointment?.date}
										startTime={appointment?.start_time || '00:00'}
										endTime={appointment?.end_time}
										type={appointment?.visit_type}
										patientId={appointment?.patient?.patientId}
										key={index}
									/>
								)) : <SkeletonTodayVisitItem count={3} />}
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
						{selectedDate === todayDate ? (
							<p className={styles.titleCard}>Dzisiejsze wizyty</p>
						) : (
							<p className={styles.titleCard}> Wizyty {selectedDateInWords}</p>
						)}

						<NavLink className={styles.black} to="/todays-visits">
							<div className={`${styles.flex} ${styles.center}`}>
								<p className={styles.followLink}>Zobacz wszystkie</p>
								<img className={styles.ico} src={follow} alt="Follow" />
							</div>
						</NavLink>
					</div>

					<div className={styles.history}>
						{fetchedAppointmentsTodayData && fetchedAppointmentsToday.length === 0 && <p className={styles.noVisits}>Nie masz wizyt</p>}
						{fetchedAppointmentsToday && !isAppointmentsTodayLoading ?
							fetchedAppointmentsToday
								.slice(-6)
								.map((appointment, index) => (
									<TodayVisitItem
										firstName={appointment?.patient?.first_name}
										lastName={appointment?.patient?.last_name}
										img={appointment?.patient.photo}
										type={appointment?.visit_type}
										startTime={appointment?.start_time || '00:00'}
										endTime={appointment?.end_time}
										date={appointment?.date}
										patientId={appointment?.patient?.patientId}
										key={index}
									/>
								)) : <SkeletonTodayVisitItem count={6} />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DoctorMain
