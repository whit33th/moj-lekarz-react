import styles from "./ReviewModal.module.css";
import avatar from "@assets/img/profil.webp";
import RedBorderBtn from "../../Buttons/RedBorderBtn/RedBorderBtn";
import BlueBorderBtn from "../../Buttons/BlueBorderBtn/BlueBorderBtn";
import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import { useState } from "react";
import InputDropdownStas from "../../Dropdown/InputDropdownStas";
import useDeleteReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/useDeleteReviews";
import usePatchReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/usePatchReviews";

import star from "@assets/img/Star.svg";
import starGrey from "@assets/img/Star 6.svg";
import { useForm } from "react-hook-form";
import useStore from "../../../data/store";

const ModerationModal = ({ id, name, date, text, rating, avatar, tags }) => {
  console.log(id);
  const [RefuseBtn, setRefuseBtn] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const { setModalActive } = useStore();
  const { mutate: deleteReview } = useDeleteReviews();
  const { mutate: acceptReview } = usePatchReviews();
  const reasons = [
    "Niedozwolona zawartość",
    "Spam",
    "Konflikt interesów",
    "Obsceniczny język",
    "Zastraszanie lub nękanie",
    "Mowa dyskryminacji lub nienawiści",
    "Dane osobowe i informacje",
    "Bezużyteczne",
  ];

  const positiveFeedbacks = [
    "Profesjonalne podejście",
    "Dbałość o komfort pacjenta",
  ];
  const negativeFeedbacks = ["Zbyt krótka wizyta", "Ograniczona dostępność"];

  function toggleRefuse() {
    setRefuseBtn(!RefuseBtn);
  }
  const { control, register, getValues, handleSubmit, watch } = useForm({});
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleDelete = () => {
    console.log(getValues('reason'))
    if (getValues('reason')) {
      deleteReview(id);
      
    }
  };

  const handleAccept = () => {
    acceptReview(id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          src={avatar}
          alt="Avatar"
          className={styles.avatar}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/path/to/default/avatar.png";
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
      <div className={styles.choice}>
        {RefuseBtn === false ? (
          <BlueBorderBtn cb={toggleRefuse}>Odmowa</BlueBorderBtn>
        ) : (
          <RedBorderBtn cb={toggleRefuse}>Odmowa</RedBorderBtn>
        )}

        <BlueBtn cb={handleAccept}>Akceptacja</BlueBtn>
      </div>
      <div className={styles.refuseReason}>
        {RefuseBtn && (
          <>
            <h2>Wybierz powód</h2>
            <div className={styles.choice}>
              <div style={{ width: "100%" }}>
                <InputDropdownStas
                  control={control}
                  name={"."}
                  options={reasons}
                  seeOptions
                  selectedOption={selectedOption}
                  object={false}
                  onOptionSelect={handleOptionSelect}
                  placeholder={"Wybierz powód"}
                  {...register("reason", {
                    required: { message: "Pole wymagane" },
                  })}
                />
              </div>
              <BlueBtn cb={handleDelete} disabled={!selectedOption}>
                Wyślij
              </BlueBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModerationModal;
