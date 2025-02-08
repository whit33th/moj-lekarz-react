import styles from './StatCardSkeleton.module.css';

function StatCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.titleLine}></div>
      <div className={styles.content}>
        <div className={styles.number}></div>
        <div className={styles.percentageBox}></div>
      </div>
    </div>
  );
}

export default StatCardSkeleton;
