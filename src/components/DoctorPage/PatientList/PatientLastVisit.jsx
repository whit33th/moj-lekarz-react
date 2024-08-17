import styles from './Patient.module.css'

function PatientLastVisit({img,name, id, date, time}) {
	return (
		<tr>
			<td className={styles.nameTd}>
				<img className={styles.round} src={img} alt="Profile" />
				<span className={styles.nameTd}>{name}</span>
			</td>
			<td className={styles.tCenter}>{id}</td>
			<td className={styles.tCenter}>{date}</td>
			<td className={`${styles.tCenter} ${styles.lastVisitsTime}`}>
				<span>{time}</span>
			</td>
		</tr>
	)
}

export default PatientLastVisit