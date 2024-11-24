import { useState, useEffect } from "react";
import styles from "./style/DoctorProfile.module.css";
import ReviewCard from "../ReviewCard";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router-dom";
import useStore from "../../../data/store";

const reviewData = [{}, {}, {}, {}];

function DoctorProfile() {
  const [doctorInfo, setDoctorInfo] = useState({});
  const { id } = useParams();
  const { doctorCard } = useStore();

  useEffect(() => {
    const doctor = doctorCard.find((item) => item.id == id);
    setDoctorInfo(doctor || null);
  }, [id, doctorCard]);
  console.log(doctorInfo);
  return (
    <div className={styles.doctorProfile}>
     
      <div className={styles.doctorProfileRow}>
        <div className={styles.profileNameBlock}>
          <div>
            <img src={doctorInfo.imglink} alt="profileImage" />
          </div>
          <div>
            <p className={styles.profileName}>{doctorInfo.name}</p>
          </div>
          <div>
            <p className={styles.profileType}>{doctorInfo.type}</p>
          </div>
          <div className={styles.profileNameBtn}>
            <NavLink to={`/znajdz-lekarza/zapis/${id}`}>Umów wizytę</NavLink>
          </div>
        </div>
        <div className={styles.profileDescription}>
          <p>{doctorInfo.description}</p>
        </div>
      </div>
      <div className={styles.mapBlock}>
        {}
        <iframe
          src="https:"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={styles.titleBLock}>
        <h2>Opinia o lekarze</h2>
        <button>
          {" "}
          <NavLink to={`/reviews/user/${0}`}>Zobacz wszyatkie</NavLink>{" "}
        </button>
      </div>
      <div className={styles.review}>
        {reviewData.map((item) => (
          <ReviewCard />
        ))}
      </div>
    </div>
  );
}
export default DoctorProfile;
