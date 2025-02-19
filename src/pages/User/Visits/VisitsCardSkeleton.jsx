import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./VisitsCard.module.css";

function VisitsCardSkeleton() {
  return (
    <div className={styles.visitsCard} style={{ opacity: 0.7 }}>
      <div className={styles.visitsCardTimeBlock}>
        <Skeleton width={90} height={16} />
        <Skeleton width={120} height={16} style={{ marginTop: 8 }} />
      </div>
      <div className={styles.visitsCardNameBlock}>
        <Skeleton circle width={20} height={20} />
        <div style={{ marginLeft: 12, flex: 1 }}>
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={14} style={{ marginTop: 6 }} />
        </div>
      </div>
      <div className={styles.visitsCardAddressBlock}>
        <Skeleton circle width={20} height={20} />
        <div style={{ marginLeft: 12, flex: 1 }}>
          <Skeleton width="70%" height={16} />
          <Skeleton width="90%" height={14} style={{ marginTop: 6 }} />
        </div>
        <div className={styles.visitsCardAddressBlockBtnPhone}>
          <Skeleton width={130} height={30} style={{ borderRadius: 15 }} />
        </div>
      </div>
      <div className={styles.visitsCardBottomPrice}>
        <Skeleton width="50%" height={16} />
      </div>
      <div style={{ position: "absolute", right: 15, top: 15 }}>
        <Skeleton circle width={24} height={24} />
      </div>
    </div>
  );
}

export default VisitsCardSkeleton;
