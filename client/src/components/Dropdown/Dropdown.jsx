import { Children, useState } from "react";
import styles from "./Dropdown.module.css"; // Импортируем CSS-модуль

const Dropdown = ({ label, options, color, selectedOption='Wybierz',children,childrenLeft }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ setSelectedOption] = useState(""); // Управляем состоянием внутри компонента

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      {label && <label>{label}</label>}
			
      <div
        style={{ backgroundColor: color }} // Применяем цвет фона
        className={styles.dropdown}
        onClick={toggleDropdown}
      >
				{childrenLeft}
        {selectedOption || "Wybierz..."}
        {children}
        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {options.map((option) => (
              <li
                key={option}
                className={styles.dropdownMenuItem}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
