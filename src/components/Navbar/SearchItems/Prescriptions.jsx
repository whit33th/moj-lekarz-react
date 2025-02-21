import styles from "./SearchItems.module.css";
import prescriptionIcon from "@assets/img/search-icons/Prescription.png";
import Medications from "./Medications";
import grey from "@assets/img/grey.png";
function SearchPrescriptionsItem({ data }) {
	
  return (
    <>
      <div className={`${styles.searchItem} ${styles.searchItemContainer}`}>
        <div className={`${styles.sectionTitle}`}>
          <img src={prescriptionIcon} alt="" width={20} height={20} />
          <h1>Recepty</h1>
        </div>
        {data?.prescription?.length === 0 ? (
          <div className={`${styles.borders} ${styles.noData}`}>
            {" "}
            Nie znaleziono pacjentów{" "}
          </div>
        ) : (
          data?.prescription?.map((item, index) => (
            <div key={index} className={styles.borders}>
              <div className={styles.searchItemContent}>
                <div className={styles.searchItemImg}>
                  <img src={item?.patient?.user?.photo || grey} alt="Avatar" />
                </div>
                <div className={styles.searchPrescriptionInfo}>
                  <p>
                    {item?.patient?.user?.first_name +
                      " " +
                      item?.patient?.user?.last_name}
                  </p>
                  <p className={styles.code}>{item?.code || "Brak"}</p>
                </div>
              </div>
              <Medications medications={item.medications} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default SearchPrescriptionsItem;
