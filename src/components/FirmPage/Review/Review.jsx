import styles from './Review.module.css'
	
import { NavLink } from 'react-router-dom'

function Review({
	name = "User",
	rate,
	info = "",
	date,
	img }) {

	return (
		<div className={styles.record}>


			<div className={styles.reviewCard}>

				<NavLink className={styles.black} href="#">
					<img src={img} alt="User Avatar" className={styles.avatar} />
				</NavLink>
				<div className={styles.reviewContent}>
					<NavLink className={styles.black} href="#">

						<div className={styles.reviewHeader}>
							<span className={styles.userName}>{name}</span>
							<span className={styles.reviewDate}>{date}</span>
						</div>

						<div className={styles.reviewRating}>
							<span className={styles.star}>★</span>
							<span className={styles.star}>★</span>
							<span className={styles.star}>☆</span>
							<span className={styles.star}>☆</span>
							<span className={styles.star}>☆</span>
						</div>

						<p className={styles.reviewText}>{info}</p>
					</NavLink>
					<NavLink href="#" className={styles.moreLink}>więcej</NavLink>
				</div>
			</div>

		</div>
	)
}

export default Review