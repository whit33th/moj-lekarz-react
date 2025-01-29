import { NavLink } from "react-router-dom";
import styles from "./SearchItems.module.css";
import grey from "@assets/img/grey.png";
import { pageConfig } from "../../../config/config";
import useStore from "../../../data/store";
function SearchPatientsItem({ data }) {
  const { setSearchActive } = useStore();

  return (
    <>
      <div className={`${styles.searchItem} ${styles.searchItemContainer}`}>
        <div className={`${styles.sectionTitle}`}>
          <img src={grey} alt="" width={20} height={20} />
          <h1>Pacjenci</h1>
        </div>
        {data?.patients?.length === 0 ? (
          <div className={`${styles.borders} ${styles.noData}`}>
            {" "}
            Nie znaleziono pacjentów{" "}
          </div>
        ) : (
          data?.patients?.map((patient, index) => (
            <NavLink
              to={pageConfig.doctor.patientInfo.slice(0, 13) + "/" + patient.id}
			  onClick={() => setSearchActive(false)}
              key={index}
              className={`${styles.searchItemContent} ${styles.borders}`}
            >
              <div className={styles.searchItemImg}>
                <img src={patient?.user?.photo || grey} alt="Avatar" />
              </div>
              <div className={styles.searchItemInfo}>
                <p>
                  {patient?.user?.first_name + " " + patient?.user?.last_name}
                </p>
                <p className={styles.phone}>{patient?.user?.phone}</p>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </>
  );
}

export default SearchPatientsItem;
