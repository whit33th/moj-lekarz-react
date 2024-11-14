import { PropTypes } from "prop-types";
import styles from "./RecipeItem.module.css";

function RecipeItem({ img, name }) {
  return (
    <tr>
      <td className={styles.nameTd}>
        <img className={styles.round} src={img} alt="Profile" />
        <div className={styles.userInfo}>
          <span>{name}</span>
          <span>21.12.2002</span>
        </div>
      </td>
      <td className={styles.tCenter}>Lorem</td>
      <td className={styles.tCenter}>
        <div
          className={styles.receptId}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span>3223</span>
        </div>
      </td>
    </tr>
  );
}

RecipeItem.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
};

export default RecipeItem;
