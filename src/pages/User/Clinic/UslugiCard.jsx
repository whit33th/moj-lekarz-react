import { motion } from "framer-motion";
import styles from "./style/Uslugi.module.css";

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
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default UslugiCard;
