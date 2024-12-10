
import { useEffect } from 'react'
import styles from './Pagination.module.css'
import Skeleton from 'react-loading-skeleton'

const Pagination = ({ value = 1, onChange = () => { }, total, isLoading }) => {


	if (total <= 1) {
		return null
	}
	if (isLoading) {
		return <div style={{ display: 'flex', justifyContent: 'center' }}>
			<Skeleton height={30} width={200} />
		</div>
	}



	const maxPagesToShow = 5
	const pageNumbers = []


	const getStartPage = () => Math.max(1, value - Math.floor(maxPagesToShow / 2))
	const getEndPage = (startPage) => Math.min(total, startPage + maxPagesToShow - 1)

	const startPage = getStartPage()
	const endPage = getEndPage(startPage)

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i)
	}

	const handlePageChange = (page) => onChange(page)

	const showEllipsis = (position) => position === 'start' ? startPage > 2 : endPage < total - 1

	return (
		<div className={styles.paginationContainer}>
			{value > 1 && (
				<button onClick={() => handlePageChange(value - 1)} className={styles.pageButton}>&lt;</button>
			)}

			{startPage > 1 && (
				<>
					<button
						onClick={() => handlePageChange(1)}
						className={`${styles.pageButton} ${value === 1 ? styles.active : ""}`}
					>
						1
					</button>
					{showEllipsis('start') && <span className={styles.dots}>...</span>}
				</>
			)}

			{pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => handlePageChange(number)}
					className={`${styles.pageButton} ${value === number ? styles.active : ""}`}
				>
					{number}
				</button>
			))}

			{endPage < total && (
				<>
					{showEllipsis('end') && <span className={styles.dots}>...</span>}
					<button
						onClick={() => handlePageChange(total)}
						className={`${styles.pageButton} ${value === total ? styles.active : ""}`}
					>
						{total}
					</button>
				</>
			)}

			{value < total && (
				<button onClick={() => handlePageChange(value + 1)} className={styles.pageButton}> &gt; </button>
			)}
		</div>
	)
}

export default Pagination
