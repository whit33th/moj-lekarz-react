import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./AdminSkeletons.module.css";

export const StatCardSkeleton = () => (
  <div className={styles.cardSkeleton}>
    <div className={styles.cardHeader}>
      <Skeleton circle width={31} height={31} />
      <Skeleton width={100} height={30} borderRadius={100} />
    </div>
    <div className={styles.cardContent}>
      <Skeleton width={80} height={30} />
      <Skeleton width={160} />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 4 }) => (
  <div className={styles.tableSkeleton}>
    <Skeleton height={30} className={styles.tableTitle} />
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <Skeleton height={25} />
          </th>
          <th>
            <Skeleton height={25} />
          </th>
          <th>
            <Skeleton height={25} />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array(rows)
          .fill(0)
          .map((_, idx) => (
            <tr key={idx}>
              <td>
                <Skeleton height={20} />
              </td>
              <td>
                <Skeleton height={20} />
              </td>
              <td>
                <Skeleton height={20} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export const ChartSkeleton = () => (
  <div style={{ width: "100%", height: "200px" }}>
    <Skeleton height="100%" />
  </div>
);
