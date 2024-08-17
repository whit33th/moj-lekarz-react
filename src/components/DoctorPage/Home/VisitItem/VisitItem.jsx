import { NavLink } from 'react-router-dom';
import styles from './VisitItem.module.css';

function VisitItem({ img, name, date, time, index }) {
    return (
        <NavLink key={index} to="/user" className={styles.black}>
            <div className={`${styles.record} ${styles.center} ${styles.between}`}>
                <div className={styles.flex}>
                    <img className={styles.round} src={img} alt="" />
                    <div className={`${styles.nameSection} ${styles.flexColumn} ${styles.evenly}`}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.date}>{date}</p>
                    </div>
                </div>
                <p className={styles.time}>{time}</p>
            </div>
        </NavLink>
    );
}

export default VisitItem;
