import React, { useRef, useState } from 'react'
import styles from './SearchItems.module.css'

const Medications = ({ medications }) => {
	const [visible, setVisible] = useState(false)
	const scrollRef = useRef(null)
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	const handleWheel = (e) => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft += e.deltaY
		}
	}

	const startDrag = (e) => {
		setIsDragging(true)
		setStartX(e.clientX)
		setScrollLeft(scrollRef.current.scrollLeft)
	}

	const stopDrag = () => {
		setIsDragging(false)
	}

	const drag = (e) => {
		if (!isDragging) return
		const distance = e.clientX - startX
		scrollRef.current.scrollLeft = scrollLeft - distance
	}
	

	return (
		<div
			ref={scrollRef}
			className={styles.medications}
			onWheel={handleWheel}
			onMouseDown={startDrag}
			onMouseUp={stopDrag}
			onMouseLeave={stopDrag}
			onMouseMove={drag}
		>
			{Array.from({ length: 12 }).fill(0).map((_, index) => (
				<div key={index} className={styles.medication}>
					<p className={styles.medItemNumber}>{index + 1}.</p>
					<p className={styles.medItemName}>Aspirin</p>
					<p className={styles.medItemDosage}>100g</p>
				</div>
			))}
		</div>
	)
}

export default Medications
