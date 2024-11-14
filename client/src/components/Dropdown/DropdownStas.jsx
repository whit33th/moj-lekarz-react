import { useState, useRef, useEffect } from "react";
import styles from "./DropdownStas.module.css";

const DropdownStas = ({
  options, 
  label,
  placeholder,
  onChange,
  type = "dropdown",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    placeholder || (type === "dropdown" && options[0]) || "Wybierz"
  );
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (type === "dropdown") {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
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
        className={`${styles.dropdown} ${
          type === "input" ? styles.dropdownInput : ""
        } ${isOpen ? styles.open : ""}`}
        onClick={toggleDropdown}
      >
        {type === "input" ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={styles.inputField}
          />
        ) : (
          <span
            className={selectedOption === placeholder ? styles.placeholder : ""}
          >
            {selectedOption}
          </span>
        )}
        {type === "dropdown" && options && (
          <span
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
          ></span>
        )}
      </div>
      {type === "dropdown" && isOpen && (
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
