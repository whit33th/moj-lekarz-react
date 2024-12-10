import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import styles from "./Pagination.module.css"
import Skeleton from "react-loading-skeleton"

const Pagination = ({ total, isLoading, value, onChange }) => {
	const [searchParams, setSearchParams] = useSearchParams()

	// Определяем текущую страницу: приоритет отдаем `value`, если он передан
	const currentPage = value || parseInt(searchParams.get("page") || "1", 10)

	if (total <= 1) {
		return null
	}

	if (isLoading) {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Skeleton height={30} width={200} />
			</div>
		)
	}

	const maxPagesToShow = 5
	const pageNumbers = []

	const getStartPage = () =>
		Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
	const getEndPage = (startPage) =>
		Math.min(total, startPage + maxPagesToShow - 1)

	const startPage = getStartPage()
	const endPage = getEndPage(startPage)

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i)
	}

	// Функция для обработки смены страницы
	const handlePageChange = (page) => {
		if (page < 1 || page > total) return
		if (onChange) {
			onChange(page) // Вызываем внешний обработчик, если он передан
		}
		setSearchParams({ page: page.toString() }) // Обновляем URL
	}

	const showEllipsis = (position) =>
		position === "start" ? startPage > 2 : endPage < total - 1

	return (
		<div className={styles.paginationContainer}>
			{currentPage > 1 && (
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					className={styles.pageButton}
				>
					&lt;
				</button>
			)}

			{startPage > 1 && (
				<>
					<button
						onClick={() => handlePageChange(1)}
						className={`${styles.pageButton} ${currentPage === 1 ? styles.active : ""
							}`}
					>
						1
					</button>
					{showEllipsis("start") && <span className={styles.dots}>...</span>}
				</>
			)}

			{pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => handlePageChange(number)}
					className={`${styles.pageButton} ${currentPage === number ? styles.active : ""
						}`}
				>
					{number}
				</button>
			))}

			{endPage < total && (
				<>
					{showEllipsis("end") && <span className={styles.dots}>...</span>}
					<button
						onClick={() => handlePageChange(total)}
						className={`${styles.pageButton} ${currentPage === total ? styles.active : ""
							}`}
					>
						{total}
					</button>
				</>
			)}

			{currentPage < total && (
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					className={styles.pageButton}
				>
					&gt;
				</button>
			)}
		</div>
	)
}

export default Pagination
