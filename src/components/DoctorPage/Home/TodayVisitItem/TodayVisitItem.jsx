import { NavLink } from 'react-router-dom'
import styles from './VisitItem.module.css'

import VisitModal from '../../../Modals/VisitModal/VisitModal'
import useStore from '../../../../data/store'

function TodayVisitItem({ img, firstName, lastName, date, startTime, endTime, index, type, patientId }) {

    const { setModalActive, setModalContent } = useStore()
    function openMainModalInfo() {
        setModalActive(true)
        setModalContent(<VisitModal props={{ img, firstName, lastName, date, startTime, endTime, index, type, patientId }} />)
    }
    return (

        <button onClick={openMainModalInfo} key={index} className={`${styles.record} ${styles.center} ${styles.between}`}>
            <div className={styles.flex}>
                <img className={styles.round} src={img} alt="" />
                <div className={`${styles.nameSection} ${styles.flexColumn} ${styles.evenly}`}>
                    <p className={styles.name}>{firstName} {lastName} </p>
                    <p className={styles.date}>{type}</p>
                </div>
            </div>
            <p className={styles.time}>{startTime.slice(0, 5)}</p>
        </button>

    )
}

export default TodayVisitItem
