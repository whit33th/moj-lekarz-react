import styles from "./style/Uslugi.module.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function UslugiCard({ services }) {
  return (
    <div className={styles.uslugiBlock}>
      {services?.map((service, index) => (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.uslugiItem}
          key={service.id}
        >
          <div className={styles.titleBlock}>
            <div className={styles.uslugiTypeItem}>
              <div>
                {service.name} - {service.price} zł
              </div>
              {/* <div>
                <NavLink to={`/appointment/${service.id}`}>
                  Umów się na wizytę &#8594;
                </NavLink>
              </div> */}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default UslugiCard;
