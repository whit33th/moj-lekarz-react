import { useState, useRef, useEffect } from "react";
import styles from "./DropdownStas.module.css";

const DropdownStas = ({ options, label, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    placeholder || options[0] || "Wybierz"
  );
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option); 
    }
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
        className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
        onClick={toggleDropdown}
      >
        <span
          className={selectedOption === placeholder ? styles.placeholder : ""}
        >
          {selectedOption}
        </span>
        {options && (
          <span
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
          ></span>
        )}
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options &&
            options.map((option, index) => (
              <li
                key={index}
                className={styles.dropdownMenuItem}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownStas;
