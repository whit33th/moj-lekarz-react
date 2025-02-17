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
import MapboxWithGeocoding from "../../../components/UI/Map/Map";
import { motion } from "framer-motion";

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

  const hospitalAddress = `${data?.user?.address?.street}, ${data?.user?.address?.post_index} ${data?.user?.address?.city}, Polska`;

  // const hospitalAddress = "Lipka, 59047, Polska";
  return (
    <div className={styles.doctorProfile}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className={styles.doctorProfileRow}
      >
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
            {/* <NavLink to={`$zapis/${id}`}>
              Umów wizytę
            </NavLink> */}
          </div>
        </div>
        <div className={styles.profileDescription}>
          <p>{doctor.description}</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className={styles.mapBlock}
      >
        {!data ? (
          <Skeleton height={500} />
        ) : (
          <MapboxWithGeocoding address={data?.user ? hospitalAddress : ""} />
        )}
      </motion.div>
      {reviews?.reviews.length > 0 && (
        <div>
          <div className={styles.titleBLock}>
            <h2>Opinia o lekarzu</h2>
            {/* <button>
              {" "}
              <NavLink to={`/reviews/user/${0}`}>Zobacz wszystkie</NavLink>{" "}
            </button> */}
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
