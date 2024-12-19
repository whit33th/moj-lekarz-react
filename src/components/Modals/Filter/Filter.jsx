import { useRef } from "react"
import Choice from "../../Modal/Choice"
import Search from "../../UI/Search/Search"
import styles from "./Filter.module.css"
import unpointed from "@assets/img/unpointed.png"
import pointed from "@assets/img/pointed.png"

function Filter({ onClick, filterState, onFilterChange, onReset }) {
  const inputDateFrom = useRef()
  const inputDateTo = useRef()

  const handleGenderSelect = (gender) => {
    onFilterChange({ ...filterState, selectedGender: gender })
  }

  const handleSortSelect = (sortOption) => {
    onFilterChange({ ...filterState, selectedSortOption: sortOption })
  }

  const handleDateChange = () => {
    onFilterChange({
      ...filterState,
      dateFrom: inputDateFrom.current.value,
      dateTo: inputDateTo.current.value,
    })
  }

  return (
    <div onClick={onClick} className={styles.filterWindow}>
      <div className={styles.slim}>
        <div className={styles.searchContainer}>
          <Search placeholder="Id pacjeta..." />
        </div>
        <div className={styles.filterSection}>
          <label>Plec</label>
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleButton} ${filterState.selectedGender === "K" ? styles.activeButton : ""
                }`}
              onClick={() => handleGenderSelect("K")}
            >
              K
            </button>
            <button
              className={`${styles.toggleButton} ${filterState.selectedGender === "M" ? styles.activeButton : ""
                }`}
              onClick={() => handleGenderSelect("M")}
            >
              M
            </button>
          </div>
        </div>
        <div className={styles.filterSection}>
          <label>Wiek od:</label>
          <input
            ref={inputDateFrom}
            type="text"
            className={styles.dateInput}
            placeholder="dd_mm_rrrr"
            value={filterState.dateFrom}
            onChange={handleDateChange}
          />
        </div>
        <div className={styles.filterSection}>
          <label>Wiek do:</label>
          <input
            ref={inputDateTo}
            type="text"
            className={styles.dateInput}
            placeholder="dd_mm_rrrr"
            value={filterState.dateTo}
            onChange={handleDateChange}
          />
        </div>
        <div className={styles.radioContainer}>
          <div className={styles.radioButton}>
            <div>
              <img
                onClick={() => handleSortSelect("az")}
                src={
                  filterState.selectedSortOption === "az" ? pointed : unpointed
                }
                alt="A to Z"
                className={styles.radioIcon}
                draggable="false"
              />
            </div>
            <label>A to Z</label>
          </div>
          <div className={styles.radioButton}>
            <div>
              <img
                onClick={() => handleSortSelect("za")}
                src={
                  filterState.selectedSortOption === "za" ? pointed : unpointed
                }
                alt="Z to A"
                className={styles.radioIcon}
                draggable="false"
              />
            </div>
            <label>Z to A</label>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Choice choice1="Anuluj" choice2="Sortuj" cb1={onReset} />
      </div>
    </div>
  )
}

export default Filter
