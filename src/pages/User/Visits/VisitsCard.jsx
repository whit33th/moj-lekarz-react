import React from "react";
import styles from "./VisitsCard.module.css";
import imgName from "@assets/img/simple-line-i.svg";
import imgType from "@assets/img/Vector14.svg";
import phoneImg from "@assets/img/ph_phone-light.svg";
import closeImg from "@assets/img/Vector (33).svg";

function VisitsCard({ data, deleteFc }) {
  console.log(data);

  const appointment = {
    id: data?.id || 1,
    doctorName:
      data?.doctor?.first_name + " " + data?.doctor?.last_name || "Brak",
    img: data?.doctor?.photo || "Brak",
    doctorType: data?.service?.specialty?.name || "Brak",
    date: data?.date || "Brak",
    time: data?.start_time + " - " + data?.end_time || "Brak",
    clinicalName: data?.clinic?.name || "Brak",
    clinicalAddress:
      data?.clinic?.address.street +
        " " +
        data?.clinic?.address.home +
        ", " +
        data?.clinic?.address.city || "Brak",
    phone: data?.clinic?.phone || "Brak",
    serviceName: data?.service?.name || "Brak",
    servicePrice: data?.service?.price + " zł" || "Brak",
  };

  return (
    <div className={styles.visitsCard}>
      <div className={styles.visitsCardTimeBlock}>
        <p>{appointment.date}</p>
        <p className={styles.visitsCardTimeText}>{appointment.time}</p>
      </div>
      <div className={styles.visitsCardNameBlock}>
        <img src={imgType} alt="Doctor" />
        <div>
          <p>{appointment.doctorName}</p>
          <p className={styles.visitsCardType}>{appointment.doctorType}</p>
        </div>
      </div>
      <div className={styles.visitsCardAddressBlock}>
        <img src={imgName} alt="Location" />
        <div>
          <p>{appointment.clinicalName}</p>
          <p className={styles.visitsCardCity}>{appointment.clinicalAddress}</p>
        </div>
        <div className={styles.visitsCardAddressBlockBtnPhone}>
          <a href={`tel:+${appointment.phone}`}>
            <img src={phoneImg} alt="Phone" />
            {appointment.phone}
          </a>
        </div>
      </div>
      <div className={styles.visitsCardBottomPrice}>
        <p>
          {appointment.serviceName} - {appointment.servicePrice}
        </p>
      </div>
      <span
        className={styles.deleteBtn}
        onClick={() => deleteFc(appointment.id)}
      >
        <img src={closeImg} alt="X" />
      </span>
    </div>
  );
}
export default VisitsCard;
