import { NavLink } from 'react-router-dom';
import styles from './VisitItem.module.css';

import VisitModal from '../../../Modals/VisitModal/VisitModal'
import useStore from './../../../../data/store';

function VisitItem({ img, name, date, time, index }) {

    const { setModalActive, setModalContent } = useStore();
    function openMainModalInfo() {
        setModalActive(true);
        setModalContent(<VisitModal/>);
      }
    return (
        
            <div onClick={openMainModalInfo} key={index} className={`${styles.record} ${styles.center} ${styles.between}`}>
                <div className={styles.flex}>
                    <img className={styles.round} src={img} alt="" />
                    <div className={`${styles.nameSection} ${styles.flexColumn} ${styles.evenly}`}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.date}>{date}</p>
                    </div>
                </div>
                <p className={styles.time}>{time}</p>
            </div>
        
    );
}

export default VisitItem;
