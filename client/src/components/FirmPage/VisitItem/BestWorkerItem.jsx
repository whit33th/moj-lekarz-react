import { NavLink } from 'react-router-dom';
import star from "../../../assets/img/star.png"
import styles from './BestWorkerItem.module.css';

function VisitItem({ img, name, position, rating = '5.0', index }) {
    return (
      <NavLink key={index} to="/workers/id" className={styles.black}>
        <div className={`${styles.record} ${styles.center} ${styles.between}`}>
          <div className={styles.flex}>
            <img className={styles.round} src={img} alt="" />
            <div
              className={`${styles.nameSection} ${styles.flexColumn} ${styles.evenly}`}
            >
              <p className={styles.name}>{name}</p>
              <p className={`${styles.date} ${styles.grey}`}>{position}</p>
            </div>
          </div>
          <div className={styles.rating}>
            <p>{rating}</p>
            <img src={star} alt="" />
          </div>
        </div>
      </NavLink>
    );
}

export default VisitItem;
