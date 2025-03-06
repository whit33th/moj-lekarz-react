import { useState } from "react";
import {
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styles from "./MakeReview.module.css";
import imgName from "@assets/img/simple-line-i.svg";
import imgType from "@assets/img/Vector14.svg";
import starFilled from "@assets/img/Star.svg";
import starEmpty from "@assets/img/Star 6.svg";
import { pageConfig } from "../../../config/config";
import useGetTags from "../../../api/hooks/GeneralHooks/useGetTags";
import usePostReview from "../../../api/hooks/GeneralHooks/usePostReview";
import { toast } from "sonner";

function MakeReview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const { tags, isLoading } = useGetTags();
  const { mutate, isPending } = usePostReview();

  if (!state) {
    return <Navigate to={pageConfig.patient.visits} />;
  }

  const { doctor, clinic, visitDetails, date, time, endTime } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Proszę wybrać ocenę!");
      return;
    }

    mutate(
      {
        doctorId: doctor.id,
        rating,
        comment,
        tagsIds: selectedTags,
      },
      {
        onSuccess: () => {
          navigate(pageConfig.patient.visits);
        },
      }
    );
  };

  const handleTagClick = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.zapisDone}>
      <div className={styles.zapisDoneRow}>
        <div className={styles.contentWrapper}>
          <div className={styles.leftColumn}>
            <div className={styles.zapisDoneInfoBlockCard}>
              <div className={styles.zapisPageLeftTimeBlock}>
                <p>{date}</p>
                <p className={styles.zapisPageLeftTimeText}>
                  {time} - {endTime}
                </p>
              </div>

              <div className={styles.infoblock}>
                <div className={styles.infoblockNameBlock}>
                  <div className={styles.zapisPageLeftNameBlock}>
                    <img src={imgType} alt="Doctor" />
                    <div>
                      <p>{doctor.name}</p>
                      <p className={styles.zapisPageLeftType}>
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.infoblockPhoneBlock}>
                  <div className={styles.zapisPageLeftAddressBlock}>
                    <img src={imgName} alt="Location" />
                    <div>
                      <p>{clinic.name}</p>
                      <p className={styles.zapisPageLeftCity}>
                        {clinic.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.leftBlockBottomPrice}>
                <p>
                  {visitDetails.type} - {visitDetails.price} PLN
                </p>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.reviewCard}>
              <h2>Oceń wizytę</h2>
              <div className={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={star <= rating ? starFilled : starEmpty}
                    alt="star"
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>

              <div className={styles.tagsSection}>
                <h3>Pozytywne</h3>
                <div className={styles.tagsContainer}>
                  {tags?.positiveTags.map((tag) => (
                    <button
                      key={tag.id}
                      className={`${styles.tag} ${
                        selectedTags.includes(tag.id) ? styles.selected : ""
                      }`}
                      onClick={() => handleTagClick(tag.id)}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>

                <h3>Negatywne</h3>
                <div className={styles.tagsContainer}>
                  {tags?.negativeTags.map((tag) => (
                    <button
                      key={tag.id}
                      className={`${styles.tag} ${
                        selectedTags.includes(tag.id) ? styles.selected : ""
                      }`}
                      onClick={() => handleTagClick(tag.id)}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.commentSection}>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Napisz swoją opinię..."
                />
              </div>

              <button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Wysyłanie..." : "Wyślij opinię"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeReview;
