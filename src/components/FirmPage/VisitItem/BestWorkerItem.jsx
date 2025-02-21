import { NavLink } from "react-router-dom";
import star from "@assets/img/star.png";
import styles from "./BestWorkerItem.module.css";
import { pageConfig } from "../../../config/config";
import { motion } from "framer-motion";

function VisitItem({ id, img, name, rating, index, specialty }) {
  return (
    <NavLink
      key={index}
      to={pageConfig.firm.workersInfo.slice(0, 9) + id}
      className={styles.black}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
        className={`${styles.record} ${styles.center} ${styles.between}`}
      >
        <div className={styles.flex}>
          <img className={styles.round} src={img} alt="" />
          <div
            className={`${styles.nameSection} ${styles.flexColumn} ${styles.evenly}`}
          >
            <p className={styles.name}>{name}</p>
            <p className={`${styles.date} ${styles.grey}`}>{specialty}</p>
          </div>
        </div>
        <div className={styles.rating}>
          <p>{rating}</p>
          <img src={star} alt="" />
        </div>
      </motion.div>
    </NavLink>
  );
}

export default VisitItem;
