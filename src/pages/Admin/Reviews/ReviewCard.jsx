import starGrey from "@assets/img/Star 6.svg";
import star from "@assets/img/Star.svg";
import { motion } from "framer-motion";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import ReviewModal from "../../../components/Modals/ReviewModal/ReviewModal";
import useStore from "../../../data/store";
import styles from "./ReviewCard.module.css";

const ReviewCard = ({ id, name, date, text, rating, avatar, tags }) => {
  const { setModalActive, setModalContent } = useStore();

  function handleModal() {
    setModalActive(true);
    setModalContent(
      <ReviewModal
        id={id}
        name={name}
        date={date}
        text={text}
        rating={rating}
        avatar={avatar}
        tags={tags}
      />
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className={styles.card}
    >
      <div className={styles.header}>
        <img src={avatar || avatar} alt="Avatar" className={styles.avatar} />
        <div className={styles.headerInfo}>
          <div className={styles.gap}>
            <div className={styles.topHeader}>
              <h3 className={styles.name}>{name}</h3>
              {rating && (
                <div className={styles.rating}>
                  {[...Array(5)].map((_, index) => (
                    <img
                      key={index}
                      src={index < rating ? star : starGrey}
                      alt="star"
                      className={styles.imgNameBlockStar}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className={styles.date}>{date}</p>
          </div>

          <div className={styles.service}>
            {tags &&
              tags.map((tag, index) => (
                <div
                  key={index}
                  className={
                    tag.includes("Bad") || tag.includes("Un")
                      ? styles.bad
                      : styles.good
                  }
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
      <div className={styles.buttonDiv}>
        <div></div>
        <BlueBtn cb={handleModal}> Zobacz </BlueBtn>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
