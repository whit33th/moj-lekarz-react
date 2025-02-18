import styles from "./style/DoctorCard.module.css";
import starimg from "@assets/img/Star.svg";
import imgIcon1 from "@assets/img/simple-line-i.svg";
import imgIcon2 from "@assets/img/Vector14.svg";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import grey from "@assets/img/grey.png";
import { pageConfig } from "../../../config/config";
import useStore from "../../../data/store";
import { motion } from "framer-motion";

function DoctorCard({ data, loading, selectedDate, addZapis }) {
  const appointment = {
    id: data?.doctor_id || "Brak",
    clinicId: data?.clinic?.id || "Brak",
    name: data?.user?.first_name + " " + data?.user?.last_name || "Brak",
    price: data?.service?.price || "Brak",
    description: data?.description || "Brak",
    street: data?.clinic?.address?.street || "Brak",
    city: data?.clinic?.address?.city || "Brak",
    home: data?.clinic?.address?.home || "Brak",
    postCode: data?.clinic?.address?.post_index || "Brak",
    service: data?.service?.name || "Brak",
    rating: Math.floor(data?.rating) || 0,
    specialty: data?.specialty || "Brak",
    photo: data?.user?.photo || grey,
    slots: data?.available_slots || [],
    clinic: data?.clinic.name || "Brak",
    phone: data?.user?.phone || "Brak",
  };
  console.log(appointment);

  // const rating = parseInt(data.rating, 10);

  // const filteredDates = selectedDate
  //   ? data.dates.filter(
  //       (dateObj) => dateObj.date === selectedDate?.toLocaleDateString("pl-PL")
  //     )
  //   : data.dates;

  // const displayedDates = filteredDates.slice(0, 2);

  const { isAuth } = useStore();
  console.log(isAuth);
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
      className={styles.doctorCard}
    >
      <div className={styles.doctorCardInfo}>
        <div className={styles.doctorCardInfoImgBlock}>
          <NavLink to={`/profileDoctor/${appointment.id}`}>
            <img src={appointment.photo || grey} alt={"DoctorAvatar"} />
          </NavLink>
          <div>
            <p className={styles.doctorCardInfoImgBlockName}>
              {appointment.name}
            </p>
            <p>{appointment.specialty}</p>
            <p>
              {[...Array(appointment.rating)].map((_, index) => (
                <img
                  key={index}
                  src={starimg}
                  alt="star"
                  className={styles.imgNameBlockStar}
                />
              ))}
            </p>
          </div>
        </div>
        <div className={styles.doctorCardAddressBlock}>
          <div className={styles.location}>
            <img src={imgIcon1} alt="address" />
            <div>
              <p>
                {appointment.street}, {appointment.postCode}, {appointment.city}
              </p>
              <p className={styles.doctorCardAddressPlaceholder}>
                Firma: {appointment.clinic}
              </p>
            </div>
          </div>
          <div className={styles.servicesContainer}>
            {data?.service?.slice(0, 5).map((item, index) => (
              <div className={styles.serviceItem} key={index}>
                <img src={imgIcon2} alt="price" />
                <p>
                  {item.name} - {item.price}zł{" "}
                </p>
              </div>
            ))}
            {data?.service?.length > 5 ? (
              <p>Jeszcze {data?.service?.length - 5} usług(i)</p>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.doctorDescription}>
        <p>{appointment.description}</p>
        <div>
          <NavLink
            style={{ color: "#3E36B0" }}
            to={`/profileDoctor/${appointment.id}`}
            state={{
              address: {
                street: appointment.street,
                city: appointment.city,
                home: appointment.home,
                postCode: appointment.postCode,
                clinic: appointment.clinic
              }
            }}
          >
            Zobacz więcej &#8594;
          </NavLink>
        </div>
      </div>
      <div className={styles.doctorCardTimeBlock}>
        <h3>Najbliższe terminy:</h3>
        <div className={styles.doctorCardTimeBlockItems}>
          {appointment?.slots?.length > 0 ? (
            appointment?.slots?.map((item, index) => (
              <div className={styles.doctorCardTimeBlockItem} key={index}>
                <p style={{ fontWeight: "bold" }}>{item.date}</p>
                <div className={styles.doctorCardHoursItems}>
                  {item?.slots?.map((timeSlot, index) =>
                    isAuth ? (
                      <NavLink
                        to={`${pageConfig.patient.confirmVisit}/${appointment.id}`}
                        state={{
                          doctor: {
                            id: appointment.id,

                            name: appointment.name,
                            specialty: appointment.specialty,
                            photo: appointment.photo,
                            phone: appointment.phone,
                          },
                          clinic: {
                            name: appointment.clinic,
                            address: `${appointment.street}, ${appointment.postCode}, ${appointment.city}`,
                            id: appointment.clinicId,
                          },
                          appointment: {
                            date: item.date,
                            startTime: timeSlot,
                            endTime:
                              timeSlot.split(":")[0] +
                              ":" +
                              (parseInt(timeSlot.split(":")[1]) + 15),
                            service: appointment.service,
                          },
                        }}
                        className={styles.doctorCardHoursItem}
                        key={index}
                      >
                        {timeSlot}
                      </NavLink>
                    ) : (
                      <NavLink
                        to={pageConfig.login}
                        className={styles.doctorCardHoursItem}
                        key={index}
                      >
                        {timeSlot}
                      </NavLink>
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Brak dostępnych terminów na wybrany dzień.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default DoctorCard;
