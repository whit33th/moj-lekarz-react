import { motion } from "framer-motion";
import styles from "./styles.module.css";

function AdditionalData({ description }) {
  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <textarea
        readOnly
        value={description}
        className={styles.textarea}
        placeholder="Wpisz tekst"
      ></textarea>
    </motion.form>
  );
}

export default AdditionalData;
