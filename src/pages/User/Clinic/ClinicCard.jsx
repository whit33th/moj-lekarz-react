import grey from "@assets/img/grey.png";
import imgIcon1 from "@assets/img/simple-line-i.svg";
import starimg from "@assets/img/Star.svg";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import styles from "./style/ClinicCard.module.css";

function ClinicCard({ data }) {
  const clinic = {
    id: data?.id,
    photo: data?.photo,
    name: data?.name,
    nip: data?.nip,
    nrLicense: data?.nr_license,

    email: data?.email,
    phone: data?.phone,
    description: data?.description,
    averageRating: data?.averageRating,
    rating:
      data?.rating % 1 >= 0.6
        ? Math.ceil(data?.rating)
        : Math.floor(data?.rating) || 0,
    services: data?.services,
    address: {
      city: data?.address?.city,
      province: data?.address?.province,
      street: data?.address?.street,
      home: data?.address?.home,
      flat: data?.address?.flat,
      postIndex: data?.address?.post_index,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
      className={styles.clinicCard}
    >
      <div className={styles.nameBlock}>
        <img src={clinic.photo || grey} alt="</div>clinic" />
        <div className={styles.nameBlockText}>
          <div className={styles.nameSection}>
            <p>{clinic.name}</p>
            <p className={styles.starsBlock}>
              {Array.from({ length: clinic.rating }).map((_, index) => (
                <img
                  key={index}
                  src={starimg}
                  alt="star"
                  className={styles.imgNameBlockStar}
                />
              ))}
            </p>
          </div>
          <span>{clinic?.services?.specialty?.name}</span>
          <div className={styles.specialties}>
            {clinic?.services?.slice(0, 5).map((s, index) => (
              <span key={index} className={styles.serviceTag}>
                {s.name + " "}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.clinicInfo}>
        <div>
          <img src={imgIcon1} alt="address" />
          <div>
            <p>
              {clinic.address?.street}, {clinic.address?.postIndex},{" "}
              {clinic.address?.city}
            </p>
          </div>
        </div>
        {/* <div>
          <img src={imgIcon2} alt="price" />
          <div>
            <p>
              {data.uslugiAndPrice[0]?.list[0].name}{" "}
              {data.uslugiAndPrice[0].list[0].price}zł{" "}
            </p>
          </div>
        </div> */}
      </div>
      <div className={styles.link}>
        <NavLink to={"/profileClinic/" + clinic.id}>
          Zobacz więcej &#8594;
        </NavLink>
      </div>
    </motion.div>
  );
}

export default ClinicCard;
