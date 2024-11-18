import styles from "./Search.module.css";
import searchIco from "../../../assets/img/search.png";
function Search({ placeholder, onChange }) {
  return (
    <div className={styles.search}>
      <img src={searchIco} alt="search" />
      <input
        onChange={onChange}
        className={styles.searchInput}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}

export default Search;
