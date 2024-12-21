import styles from "./SearchItems.module.css"
function SearchPostsItem({ data }) {

	if (data?.posts?.length === 0) {
		return
	}
	return (
		<>
			<div className={styles.searchItem}>
				<h1>Posty</h1>
				<div className={styles.searchItemContent}>
					<div className={styles.searchItemImg}>
						{/* <img src={grey} alt="Avatar" /> */}
					</div>
					<div className={styles.searchItemInfo}>
						<p>Name Surname</p>
						<p className={styles.searchItemInfoPhone}>+3834384348</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default SearchPostsItem