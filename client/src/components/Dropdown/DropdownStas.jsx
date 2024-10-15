import { useState } from 'react';
import styles from './DropdownStas.module.css';

const DropdownStas = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div  onClick={toggleDropdown} className={styles.dropdownContainer}>
      <div className={styles.dropdown}>
        {selectedOption || "Kim jesteś"}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}></span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
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
