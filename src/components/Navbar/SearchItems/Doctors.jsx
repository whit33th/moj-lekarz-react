import { NavLink } from "react-router-dom";
import styles from "./SearchItems.module.css";
import grey from "@assets/img/grey.png";
import { pageConfig } from "../../../config/config";
import useStore from "../../../data/store";

function SearchDoctorsItem({ data }) {
  const { setSearchActive } = useStore();

  return (
    <>
      <div className={`${styles.searchItem} ${styles.searchItemContainer}`}>
        <div className={`${styles.sectionTitle}`}>
          <img src={grey} alt="" width={20} height={20} />
          <h1>Lekarze</h1>
        </div>
        {!data?.doctors?.length ? (
          <div className={`${styles.borders} ${styles.noData}`}>
            Nie znaleziono lekarzy
          </div>
        ) : (
          data.doctors.map((doctor, index) => (
            <NavLink
              to={pageConfig.firm.workersInfo.slice(0, 9) + doctor.id}
              onClick={() => setSearchActive(false)}
              key={index}
              className={`${styles.searchItemContent} ${styles.borders}`}
            >
              <div className={styles.searchItemImg}>
                <img src={doctor?.user?.photo || grey} alt="Avatar" />
              </div>
              <div className={styles.searchItemInfo}>
                <p>
                  {doctor?.user?.first_name} {doctor?.user?.last_name}
                </p>
                <p className={styles.phone}>{doctor?.user?.phone}</p>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </>
  );
}

export default SearchDoctorsItem;
