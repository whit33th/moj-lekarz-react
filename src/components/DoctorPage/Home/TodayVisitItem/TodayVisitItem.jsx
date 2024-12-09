import { NavLink } from 'react-router-dom'
import styles from './VisitItem.module.css'

import VisitModal from '../../../Modals/VisitModal/VisitModal'
import useStore from '../../../../data/store'

function TodayVisitItem({ img, firstName, lastName, type, time, index }) {

    const { setModalActive, setModalContent } = useStore()
    function openMainModalInfo() {
        setModalActive(true)
        setModalContent(<VisitModal />)
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
            <p className={styles.time}>{time.slice(0, 5)}</p>
        </button>

    )
}

export default TodayVisitItem
