import { useState, useRef, useEffect } from "react";
import styles from "./DropdownStas.module.css";
import unpointed from "../../assets/img/unpointed.png";
import pointed from "../../assets/img/pointed.png";
import Filter from "../Modals/Filter/Filter";

const DropdownStas = ({
                        label,
                        options = ["No options"],
                        color,
                        defaultOption = "Wybierz...",
                        children,
                        childrenLeft,
                        selectedOptionChanging = true,
                        listStyle,
                        type, // Тип выпадающего меню, например, фильтр
                        onChange,
                      }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
      defaultOption || options[0]
  );
  const dropdownRef = useRef(null);

  // Состояние фильтра
  const [filterState, setFilterState] = useState({
    selectedGender: "K",
    selectedSortOption: "az",
    dateFrom: "",
    dateTo: "",
  });

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  const handleFilterChange = (newFilterState) => {
    setFilterState(newFilterState);
  };

  const resetFilter = () => {
    setFilterState({
      selectedGender: "K",
      selectedSortOption: "az",
      dateFrom: "",
      dateTo: "",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div ref={dropdownRef} className={styles.dropdownContainer}>
        {label && <label>{label}</label>}
        <div
            style={{ backgroundColor: color }}
            className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
            onClick={toggleDropdown}
        >
          {childrenLeft}
          {selectedOptionChanging === false
              ? defaultOption
              : selectedOption || "Wybierz..."}
          {children}

          {isOpen &&
              (type === "filter" ? (
                  <Filter
                      onClick={(e) => e.stopPropagation()}
                      filterState={filterState}
                      onFilterChange={handleFilterChange}
                      onReset={resetFilter}
                  />
              ) : (
                  <ul className={styles.dropdownMenu}>
                    {options.map((option) => (
                        <li
                            key={option}
                            className={styles.dropdownMenuItem}
                            onClick={() => handleOptionClick(option)}
                        >
                          <div className={styles.center}>
                            {listStyle === "elipse" ? (
                                <img
                                    src={selectedOption !== option ? unpointed : pointed}
                                    alt=""
                                />
                            ) : (
                                ""
                            )}
                            <span className={styles.option}>{option}</span>
                          </div>
                        </li>
                    ))}
                  </ul>
              ))}
        </div>
      </div>
  );
};

export default DropdownStas;
