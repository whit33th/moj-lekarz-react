/* eslint-disable no-undef */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Patient.module.css';
import moreInfo from '../../../assets/img/more-info.png';
import { NavLink } from 'react-router-dom'

function PatientItem({ img, name, id, gender }) {
	// State to manage the modal visibility
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to toggle modal visibility
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<tr>
			<td className={styles.nameTd}>
				<img className={styles.round} src={img} alt="Profile" />
				<span>{name}</span>
			</td>
			<td className={styles.tCenter}>{id}</td>
			<td className={styles.tCenter}>{gender}</td>
			<td className={styles.tCenter}>
				<div
					className={styles.moreInfoButt}
					style={{
						position: 'relative',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<img 
						className={styles.moreInfo} 
						src={moreInfo} 
						alt="More Info" 
						onClick={toggleModal} // Toggle modal on click
						style={{ cursor: 'pointer' }} 
					/>
					
					{isModalOpen && (
						<div className={styles.moreInfoModal}>
							<NavLink className={styles.hoverOpacity} href="pacjent-info.php" to='patient-info'>
								<p>Informacja</p>
							</NavLink>
							<NavLink className={styles.hoverOpacity} to='/'>
								<p>Wiadomość</p>
							</NavLink>
						</div>
					)}
				</div>
			</td>
		</tr>
	);
}

PatientItem.propTypes = {
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	gender: PropTypes.string.isRequired
};

export default PatientItem;
