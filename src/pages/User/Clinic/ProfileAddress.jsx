import styles from "./style/ProfileAddress.module.css";
import imgIcon1 from "@assets/img/simple-line-i.svg";
import imgIcon2 from "@assets/img/ph_phone-light (2).svg";
import imgIcon3 from "@assets/img/oui_email.svg";
import imgIcon4 from "@assets/img/fluent_text-number-list-ltr-20-regular.svg";
import imgIcon5 from "@assets/img/Group-1.svg";

function ProfileAddress({ data }) {
  const week = ["Pт", "Wt", "Śr", "Cz", "Pt", "So", "Ni"];

  console.log(data.timetables);
  return (
    <div className={styles.addressBlock}>
      <div className={styles.leftBlock}>
        <p>
          <img src={imgIcon1} />
          {data.address?.street} {data.address?.home}
          {data.address?.flat ? `/${data.address?.flat}` : ""},{" "}
          {data.address?.city}, {data.address?.province}{" "}
          {data.address?.post_index}
        </p>
        <p>
          <img src={imgIcon2} />
          Telefon: {data.phone}
        </p>
        <p>
          <img src={imgIcon3} />
          Email: {data.email}
        </p>
        <p>
          <img src={imgIcon4} />
          Numer NIP: {data.nip}
        </p>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.rightTextBlock}>
          <img src={imgIcon5} />
          Godziny pracy:
        </div>
        <div className={styles.rightTimeBlock}>
          {data?.timetables?.map((slot, i) => (
            <div className={styles.timeItem} key={slot.id}>
              {week[i]}
              <span>
                {slot?.start_time && slot?.end_time
                  ? slot?.start_time?.slice(0, 5) +
                    " - " +
                    slot?.end_time?.slice(0, 5)
                  : "Brak"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProfileAddress;
