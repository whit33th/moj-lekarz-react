import styles from "./style/ProfileClinicAbout.module.css";

function ProfileClinicAbout({ description }) {
  return (
    <div className={styles.descriptionBlock}>
      <p>{description}</p>
    </div>
  );
}

export default ProfileClinicAbout;
