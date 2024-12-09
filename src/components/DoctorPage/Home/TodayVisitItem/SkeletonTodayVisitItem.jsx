import Skeleton from 'react-loading-skeleton'
import styles from './VisitItem.module.css'

function SkeletonTodayVisitItem({ count }) {
	return (
		Array(count).fill(0).map((_, index) => <div key={index} className={`${styles.record} ${styles.center} ${styles.between}`}>
			<div className={styles.flex}>
				<Skeleton circle={true} height={50} width={50} className={styles.round} />
				<div className={`${styles.nameSection} ${styles.flexColumn} ${styles.evenly}`}>
					<Skeleton width={100} height={20} className={styles.name} />
					<Skeleton width={80} height={15} className={styles.date} />
				</div>
			</div>
			<Skeleton width={65} height={36}  />
		</div>)
	)
}

export default SkeletonTodayVisitItem
