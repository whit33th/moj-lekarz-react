import styles from "./ReviewCard.module.css"
import Choice from "../../../components/Modal/Choice"
import useStore from "../../../data/store"
import ModerationModal from "../../../components/Modals/ReviewModal/ModerationModal"
import star from "@assets/img/Star.svg"
import starGrey from "@assets/img/Star 6.svg"
import usePatchReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/usePatchReviews";

const ModerationCard = ({ id, name, date, text, rating, avatar, tags }) => {
  const { setModalActive, setModalContent } = useStore()
  const { mutate: acceptReview } = usePatchReviews();

  function handleModal() {
    setModalActive(true)
    setModalContent(
      <ModerationModal 
        id={id}
        name={name} 
        date={date} 
        text={text} 
        rating={rating}
        avatar={avatar}
        tags={tags}
      />
    )
  }

  function handleAccept() {
    acceptReview(id);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img 
          src={avatar} 
          alt="Avatar" 
          className={styles.avatar}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/path/to/default/avatar.png"; // Add path to your default avatar
          }}
        />
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
            {tags && tags.map((tag, index) => (
              <div 
                key={index} 
                className={tag.includes("Bad") || tag.includes("Un") ? styles.bad : styles.good}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
      <Choice choice1={"Otwórz"} choice2={"Akceptuj"} cb1={handleModal} cb2={handleAccept} />
    </div>
  )
}

export default ModerationCard
