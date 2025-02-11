import styles from "./style/Uslugi.module.css";
import { NavLink } from "react-router-dom";

function UslugiCard({ services }) {
  return (
    <div className={styles.uslugiBlock}>
      {services?.map((service) => (
        <div className={styles.uslugiItem} key={service.id}>
          <div className={styles.titleBlock}>
            <div className={styles.uslugiTypeItem}>
              <div>
                {service.name} - {service.price} zł
              </div>
              {/* <div>
                <NavLink to={`/appointment/${service.id}`}>
                  Umów się na wizytę &#8594;
                </NavLink>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UslugiCard;
