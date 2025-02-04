import { useState, useEffect } from "react";
import styles from "./style/DoctorProfile.module.css";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router-dom";
import useStore from "../../../data/store";

import grey from "@assets/img/grey.png";
import useGetFullInfo from "./../../../api/hooks/DoctorHooks/useGetFullInfo";
import Skeleton from "react-loading-skeleton";
import { pageConfig } from "../../../config/config";
import useGetDoctorReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/useGetDoctorReviews";
import ReviewCard from "../ReviewCard";

function DoctorProfile() {
  const [doctorInfo, setDoctorInfo] = useState({});
  const { id } = useParams();
  const { data, isLoading } = useGetFullInfo({ id });

  const doctor = {
    id: isLoading ? 0 : data?.id,
    rating: isLoading ? 0 : data?.rating,
    name: isLoading ? (
      <Skeleton width={200} />
    ) : (
      data?.user?.first_name + " " + data?.user?.last_name || "brak"
    ),
    img: data?.user.photo || grey,
    specialty: isLoading ? (
      <Skeleton width={150} />
    ) : (
      data?.specialty?.name || "brak"
    ),
    description: isLoading ? <Skeleton count={6} /> : data?.description,
  };
  const { doctorCard } = useStore();

  const { data: reviews } = useGetDoctorReviews({
    doctorId: id,
  });


  useEffect(() => {
    const doctor = doctorCard.find((item) => item.id == id);
    setDoctorInfo(doctor || null);
  }, [id, doctorCard]);
 
  return (
    <div className={styles.doctorProfile}>
      <div className={styles.doctorProfileRow}>
        <div className={styles.profileNameBlock}>
          <div>
            <img src={doctor.img} alt=" " />
          </div>
          <div>
            <p className={styles.profileName}>{doctor.name}</p>
          </div>
          <div>
            <p className={styles.profileType}>{doctor.specialty}</p>
          </div>
          <div className={styles.profileNameBtn}>
            <NavLink to={`${pageConfig.patient.searchVisits}zapis/${id}`}>
              Umów wizytę
            </NavLink>
          </div>
        </div>
        <div className={styles.profileDescription}>
          <p>{doctor.description}</p>
        </div>
      </div>
      <div className={styles.mapBlock}>
        <iframe
          src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Киев, Крещатик, 1"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {reviews?.reviews.length > 0 && (
        <div>
          <div className={styles.titleBLock}>
            <h2>Opinia o lekarze</h2>
            <button>
              {" "}
              <NavLink to={`/reviews/user/${0}`}>Zobacz wszyatkie</NavLink>{" "}
            </button>
          </div>
          <div className={styles.review}>
            {reviews?.reviews.map((data, index) => (
              <ReviewCard key={index} reviews={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default DoctorProfile;
