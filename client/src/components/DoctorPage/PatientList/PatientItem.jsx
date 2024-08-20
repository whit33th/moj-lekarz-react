/* eslint-disable no-undef */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Patient.module.css';
import moreInfo from '../../../assets/img/more-info.png';
import { NavLink } from 'react-router-dom'
import useStore from './../../../data/store';
import BlueBtn from '../../Buttons/BlueBtn/BlueBtn'
import BlueBorderBtn from './../../Buttons/BlueBorderBtn/BlueBorderBtn';

function PatientItem({ img, name, id, gender }) {
	// State to manage the modal visibility
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {setModalActive, setModalContent} = useStore()

	const files = [
		{ name: 'Dokument 1.pdf', date: '12.08.2023' },
		{ name: 'Dokument 2.pdf', date: '12.08.2023' },
		{ name: 'Dokument 3.pdf', date: '12.08.2023' },
		{ name: 'Dokument 4.pdf', date: '12.08.2023' },
		{ name: 'Dokument 5.pdf', date: '12.08.2023' },
	];

	function handleActiveStatus() {
    setModalActive(false);
  }
	const modalContent =(
		<div className={styles.fileContainer}>
      <div className={styles.header}>
        <h2>Wszystkie pliki</h2>
        <button className={styles.addFileButton}>Dodaj nowy plik</button>
      </div>
      <ul className={styles.fileList}>
        {files.map((file, index) => (
          <li key={index} className={styles.fileItem}>
            <div className={styles.fileIcon}></div>
            <div className={styles.fileInfo}>
              <p className={styles.fileName}>{file.name}</p>
              <p className={styles.fileDate}>{file.date}</p>
            </div>
            <div className={styles.downloadIcon}>
						<i className='bx bxs-download'></i>
						</div>
          </li>
        ))}
      </ul>

			<BlueBorderBtn cb={handleActiveStatus}>Back</BlueBorderBtn>
    </div>
	)

	function openMainModal (){
		setModalActive(true)
		setModalContent(modalContent)
	}
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
							<button onClick={openMainModal} className={styles.hoverOpacity} to='/'>
								<p>Dokumenty</p>
							</button>
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
