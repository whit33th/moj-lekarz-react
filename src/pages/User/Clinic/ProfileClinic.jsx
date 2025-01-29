import { useState } from "react";
import starimg from "@assets/img/Star.svg";
import styles from "./style/ProfileClinic.module.css";
import UslugiCard from "./UslugiCard";
import ProfileClinicAbout from "./ProfileClinicAbout";
import ProfileAddress from "./ProfileAddress";
import ProfileClinicReviews from "./ProfileClinicReviews";

import { useParams } from "react-router-dom";
import useGetClinicsById from "./../../../api/hooks/ClinicHooks/useGetClinicsById";
import useGetClinicReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/useGetClinicReviews";
import useGetClinicServices from "./../../../api/hooks/ServicesHooks/useGetClinicServices";

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

  return (
    <div className={styles.profileClinic}>
      <div className={styles.profileClinicRow}>
        <div className={styles.clinicNameBlock}>
          <div className={styles.profileImg}>
            <img src={clinic.photo} />
          </div>
          <div>
            <p>{clinic.name}</p>
          </div>
          <div className={styles.clinicStars}>
            {Array.from({ length: clinic.rating }).map((_, index) => (
              <img
                key={index}
                src={starimg}
                alt="star"
                className={styles.imgNameBlockStar}
              />
            ))}
          </div>
        </div>

        <div className={styles.clinicMenu}>
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
        </div>

        <div className={styles.profileClinicContent}>
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
        </div>
      </div>
    </div>
  );
}
export default ProfileClinic;
