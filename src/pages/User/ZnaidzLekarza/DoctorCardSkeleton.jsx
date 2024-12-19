import styles from "./style/DoctorCard.module.css"
import Skeleton from "react-loading-skeleton"

function DoctorCardSkeleton({ count }) {
	return (
		Array.from({ length: count }).map((_, index) => (
			<div key={index} className={styles.doctorCard}>

				<div style={{ width: "100%", display: "flex", gap: "30px", marginBottom: "20px" }}>
					<Skeleton circle height={75} width={75} />
					<div style={{ display: "flex", flexDirection: "column", width: "100%" }} >
						<Skeleton count={5} />
					</div>
				</div>

				<div style={{ width: "100%", display: "flex", gap: "50px" }}>

					<div style={{ flex: '1' }}>
						<Skeleton width={125} />
						<div className={styles.skeletonGrid}>
							{Array.from({ length: 11 }).fill(0).map((_, index) => (
								<div key={index}>

									<Skeleton borderRadius={6} height={30} />
								</div>
							))}
						</div>
					</div>
					<div style={{ flex: '1' }}>
						<Skeleton width={125} />
						<div className={styles.skeletonGrid}>
							{Array.from({ length: 3 }).fill(0).map((_, index) => (
								<div key={index}>

									<Skeleton borderRadius={6} height={30} />
								</div>
							))}
						</div>
					</div>
				</div>




			</div>
		))
	)
}

export default DoctorCardSkeleton
