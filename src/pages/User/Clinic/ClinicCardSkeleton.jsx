import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./style/ClinicCard.module.css";

function ClinicCardSkeleton() {
  return (
    <div className={styles.clinicCard}>
      <div className={styles.nameBlock}>
        <Skeleton circle className={styles.avatarSkeleton} />
        <div className={styles.nameBlockText}>
          <div className={styles.nameSection}>
            <Skeleton width={200} />
            <div className={styles.starsBlock}>
              <Skeleton width={100} />
            </div>
          </div>
          <Skeleton width={150} />
          <div className={styles.specialties}>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  width={80}
                  className={styles.specialtySkeleton}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={styles.clinicInfo}>
        <div>
          <Skeleton circle width={20} height={20} />
          <div>
            <Skeleton width={180} />
            <Skeleton width={120} />
          </div>
        </div>
      </div>
      <div className={styles.link}>
        <Skeleton width={120} />
      </div>
    </div>
  );
}

export default ClinicCardSkeleton;
