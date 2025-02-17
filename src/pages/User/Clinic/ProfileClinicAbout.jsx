import { motion } from "framer-motion";
import styles from "./style/ProfileClinicAbout.module.css";

function ProfileClinicAbout({ description }) {
  return (
    <motion.div 
      className={styles.descriptionBlock}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <p>{description}</p>
    </motion.div>
  );
}

export default ProfileClinicAbout;
