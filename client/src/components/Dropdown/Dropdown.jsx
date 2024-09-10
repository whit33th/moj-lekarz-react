import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css"; 
import unpointed from "../../assets/img/unpointed.png";
import pointed from "../../assets/img/pointed.png";
import Choice from '../Modal/Choice'

const Dropdown = ({
  label,
  options = ["No options"],
  color,
  defaultOption = "Wybierz...",
  children,
  childrenLeft,
  selectedOptionChanging = true,
  listStyle,
  type, // Add type prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    console.log(selectedOption);
    setIsOpen(false);
  }, [selectedOption]);

  // Filter constant
  const filter = (
    <div className={styles.filterWindow}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Id pacjeta..."
        />
      </div>
      <div className={styles.filterSection}>
        <label>Plec</label>
        <div className={styles.toggle}>
          <button className={styles.toggleButton}>K</button>
          <button className={styles.toggleButton}>M</button>
        </div>
      </div>
      <div className={styles.filterSection}>
        <label>Wiek od:</label>
        <input
          type="text"
          className={styles.dateInput}
          placeholder="dd_mm_rrrr"
        />
      </div>
      <div className={styles.filterSection}>
        <label>Wiek do:</label>
        <input
          type="text"
          className={styles.dateInput}
          placeholder="dd_mm_rrrr"
        />
      </div>
      <div className={styles.filterSection}>
        <div className={styles.radioContainer}>
          <div className={styles.radioButton}>
            <input type="radio" id="az" name="sort" />
            <label htmlFor="az">Od A do Z</label>
          </div>
          <div className={styles.radioButton}>
            <input type="radio" id="za" name="sort" />
            <label htmlFor="za">Od Z do A</label>
          </div>
        </div>
      </div>
      <Choice choice1='Anuluj' choice2='Sortuj'></Choice>
    </div>
  );

  return (
    <div className={styles.dropdownContainer}>
      {label && <label>{label}</label>}
      
      <div
        style={{ backgroundColor: color }} 
        className={styles.dropdown}
        onClick={toggleDropdown}
      >
        {childrenLeft}
        {selectedOptionChanging === false
          ? defaultOption
          : selectedOption || "Wybierz..."}
        {children}
        
        {isOpen && (
          type === 'filter' ? (
            filter
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
          )
        )}
      </div>
    </div>
  );
};

export default Dropdown;
