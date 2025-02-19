import phone from "@assets/img/foto.webp";
import img3 from "@assets/img/Frame1.svg";
import img4 from "@assets/img/Frame2.svg";
import img5 from "@assets/img/Frame3.svg";
import img1 from "@assets/img/image1.svg";
import img2 from "@assets/img/image2.svg";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import styles from "./style/MobileAppPage.module.css";

function MobileAppPage() {
  return (
    <div className={styles.moblie}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.firstBlock}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.firstBlockLeft}
        >
          <h1>Zadbaj o swoje zdrowie z naszą aplikacją!</h1>
          <p>
            Nie zapominaj o przjęciu leków i wizytach! Nasza aplikacja jest
            tutaj, aby Cię wspierać. Pobierz teraz!
          </p>
          <div className={styles.firstBlockLeftIcons}>
            <a target="_blank" href="https://www.apple.com/pl/app-store">
              <img src={img2} />
            </a>
            <a target="_blank" href="https://play.google.com/store">
              <img src={img1} />
            </a>
          </div>
          <div className={styles.qrBlock}>
            <div className={styles.qr}>
              <QRCode
                value="https://mojlekarz.netlify.app"
                style={{ height: "100%", width: "100%" }}
              ></QRCode>
            </div>

            <p>Zeskanuj kod i pobierz</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.firstBlockRight}
        >
          <img src={phone} alt="phone" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
        className={styles.imageBlock}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.imagesBlockItem}
        >
          <div className={styles.itemImg}>
            <img src={img3} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>Zawsze pamiętaj o wizytach</p>
            <p>
              Otrzymasz powiadomienia, które przypomną Ci o terminach umówionych
              wizyt.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.imagesBlockItem}
        >
          <div className={styles.itemImg}>
            <img src={img5} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>
              Łatwo przeglądaj szczegóły swojej wizyty
            </p>
            <p>
              W dowolnym miejscu i czasie, możesz zobaczyć szczegóły swojej
              wizyty
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.imagesBlockItem}
        >
          <div className={styles.itemImg}>
            <img src={img4} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>Pamiętaj o zażywaniu leków</p>
            <p>
              Otrzymasz powiadomienia, które przypomną. Ci o zażywaniu leków.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
export default MobileAppPage;
