import imgIcon4 from "@assets/img/fluent_text-number-list-ltr-20-regular.svg";
import imgIcon5 from "@assets/img/Group-1.svg";
import imgIcon3 from "@assets/img/oui_email.svg";
import imgIcon2 from "@assets/img/ph_phone-light (2).svg";
import imgIcon1 from "@assets/img/simple-line-i.svg";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import styles from "./style/ProfileAddress.module.css";

function ProfileAddress({ data }) {
  const week = ["Pт", "Wt", "Śr", "Cz", "Pt", "So", "Ni"];
  const isLoading = !data;

  return (
    <motion.div
      className={styles.addressBlock}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.div
        className={styles.leftBlock}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
      >
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Skeleton width={300} height={24} />
                </motion.p>
              ))
          : [
              {
                icon: imgIcon1,
                text: `${data.address?.street} ${data.address?.home}${
                  data.address?.flat ? `/${data.address?.flat}` : ""
                }, ${data.address?.city}, ${data.address?.province} ${
                  data.address?.post_index
                }`,
              },
              { icon: imgIcon2, text: `Telefon: ${data.phone}` },
              { icon: imgIcon3, text: `Email: ${data.email}` },
              { icon: imgIcon4, text: `Numer NIP: ${data.nip}` },
            ].map((item, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <img src={item.icon} />
                {item.text}
              </motion.p>
            ))}
      </motion.div>

      <motion.div
        className={styles.rightBlock}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {isLoading ? (
          <>
            <Skeleton
              width={150}
              height={24}
              style={{ marginBottom: "15px" }}
            />
            {Array(7)
              .fill(0)
              .map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Skeleton
                    width={200}
                    height={20}
                    style={{ marginBottom: "10px" }}
                  />
                </motion.div>
              ))}
          </>
        ) : (
          <>
            <div className={styles.rightTextBlock}>
              <img src={imgIcon5} />
              Godziny pracy:
            </div>
            <div className={styles.rightTimeBlock}>
              {data?.timetables?.map((slot, i) => (
                <motion.div
                  className={styles.timeItem}
                  key={slot.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  {week[i]}
                  <span>
                    {slot?.start_time && slot?.end_time
                      ? slot?.start_time?.slice(0, 5) +
                        " - " +
                        slot?.end_time?.slice(0, 5)
                      : "Brak"}
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
export default ProfileAddress;
