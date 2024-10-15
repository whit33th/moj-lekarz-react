import { useState } from 'react';
import styles from './InputDropdownStas.module.css';

const InputDropdownStas = ({ options, selectedOption, onOptionSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (option !== 'Brak dopasowań') {
      onOptionSelect(option);
      setInputValue(option); // Устанавливаем выбранное значение в инпут
    }
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered.length > 0 ? filtered : ['Brak dopasowań']);
    }

    setIsOpen(true); 
  };

  return (
    <div onClick={toggleDropdown} className={styles.dropdownContainer}>
      <div className={styles.dropdown}>
        <input
          type="text"
          className={styles.dropdownInput}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          
        />
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li
              
              className={styles.dropdownMenuItem}
              
            >
             
            </li>
          {filteredOptions.map((option, index) => (
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

export default InputDropdownStas;
