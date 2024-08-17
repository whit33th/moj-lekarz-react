import styles from './Member.module.css'

function Member({ img, index, name, lastMessage, newMessageCount = "1" }) {

	

	return (
		<div
			// onClick={() => handleMemberClick(index)}
			className={`${styles.member}`}
		>
			<div className={styles.memberLeft}>
				<img src={img} alt="profile" />
				<div className={styles.memberInfo}>
					<p className={styles.bold}>{name}</p>
					<p className={ `${styles.grey} ${styles.lastMessage}`}>{lastMessage}</p>
				</div>
			</div>
			<div className={styles.notificationCount}>
				<span>{newMessageCount}</span>
			</div>
		</div>
	)
}





export default Member