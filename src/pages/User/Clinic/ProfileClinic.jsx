import grey from "@assets/img/grey.png";
import starimg from "@assets/img/Star.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import useGetClinicReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/useGetClinicReviews";
import useGetClinicsById from "./../../../api/hooks/ClinicHooks/useGetClinicsById";
import useGetClinicServices from "./../../../api/hooks/ServicesHooks/useGetClinicServices";
import ProfileAddress from "./ProfileAddress";
import ProfileClinicAbout from "./ProfileClinicAbout";
import ProfileClinicReviews from "./ProfileClinicReviews";
import styles from "./style/ProfileClinic.module.css";
import UslugiCard from "./UslugiCard";

function ProfileClinic() {
  const { id } = useParams();
  console.log(id);
  const { data } = useGetClinicsById({ clinicId: id });
  const { data: reviews } = useGetClinicReviews({ clinicId: id });
  const { data: services } = useGetClinicServices({ clinicId: id });
  const clinic = {
    id: data?.id || 0,
    photo: data?.photo || "",
    name: data?.name || "",
    role: data?.role || "",
    rating:
      data?.rating % 1 >= 0.6
        ? Math.ceil(data?.rating)
        : Math.floor(data?.rating) || 0,
    nip: data?.nip || "",
    nrLicense: data?.nr_license || "",
    email: data?.email || "",
    phone: data?.phone || "",
    description: data?.description || "",
    services: data?.services || [],
    address: {
      id: data?.address?.id || 0,
      city: data?.address?.city || "",
      province: data?.address?.province || "",
      street: data?.address?.street || "",
      home: data?.address?.home || "",
      flat: data?.address?.flat || "",
      postIndex: data?.address?.post_index || "",
    },
    timetables: data?.timetables || [],
  };

  const [menuBtnActive, setMenuBtnActive] = useState("Usługi");

  const isLoading = !data;

  const SkeletonStars = () => (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((_, idx) => (
        <Skeleton key={idx} width={20} height={20} />
      ))}
    </div>
  );

  return (
    <div className={styles.profileClinic}>
      <motion.div
        className={styles.profileClinicRow}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={styles.clinicNameBlock}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.profileImg}>
            {isLoading ? (
              <Skeleton circle width={150} height={150} />
            ) : (
              <img src={clinic.photo || grey} loading="eager" />
            )}
          </div>
          <div>
            {isLoading ? (
              <Skeleton width={200} height={24} />
            ) : (
              <p>{clinic.name}</p>
            )}
          </div>
          <div className={styles.clinicStars}>
            {isLoading ? (
              <SkeletonStars />
            ) : (
              Array.from({ length: clinic.rating }).map((_, index) => (
                <img
                  key={index}
                  src={starimg}
                  alt="star"
                  className={styles.imgNameBlockStar}
                />
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.clinicMenu}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <button
            className={`${styles.clinicMenuBtn} ${
              menuBtnActive == "Usługi" ? styles.active : ""
            }`}
            onClick={() => setMenuBtnActive("Usługi")}
          >
            Usługi
          </button>
          <button
            className={`${styles.clinicMenuBtn} ${
              menuBtnActive == "O nas" ? styles.active : ""
            }`}
            onClick={() => setMenuBtnActive("O nas")}
          >
            O nas
          </button>
          <button
            className={`${styles.clinicMenuBtn} ${
              menuBtnActive == "Adresy" ? styles.active : ""
            }`}
            onClick={() => setMenuBtnActive("Adresy")}
          >
            Adresy
          </button>
          <button
            className={`${styles.clinicMenuBtn} ${
              menuBtnActive == "Opinia" ? styles.active : ""
            }`}
            onClick={() => setMenuBtnActive("Opinia")}
          >
            Opinia
          </button>
        </motion.div>

        <motion.div
          className={styles.profileClinicContent}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {isLoading ? (
            <div style={{ padding: "20px" }}>
              <Skeleton
                count={5}
                height={40}
                style={{ marginBottom: "10px" }}
              />
            </div>
          ) : (
            <>
              {menuBtnActive == "Usługi" && <UslugiCard services={services} />}
              {menuBtnActive == "O nas" && (
                <ProfileClinicAbout description={clinic.description} />
              )}
              {menuBtnActive == "Adresy" && (
                <ProfileAddress data={clinic} graphics={""} />
              )}
              {menuBtnActive == "Opinia" && (
                <ProfileClinicReviews reviews={reviews} />
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
export default ProfileClinic;
