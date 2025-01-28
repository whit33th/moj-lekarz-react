import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./InputDropdownStas.module.css";

const InputDropdownStas = ({
  options,
  placeholder,
  seeOptions = false,
  control,
  name,
  disabled = false,
  object = true,
  searchParamsName,
  valueOnSearchParams = true,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialSearchValue = () => {
    if (valueOnSearchParams && searchParamsName) {
      return new URLSearchParams(location.search).get(searchParamsName) || "";
    }
    return "";
  };

  const initialSearchValue = getInitialSearchValue();
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    field: { value = initialSearchValue, onChange },
  } = useController({ name, control });

  useEffect(() => {
    if (valueOnSearchParams && searchParamsName && initialSearchValue) {
      onChange(initialSearchValue);
    }
  }, [initialSearchValue, onChange, valueOnSearchParams, searchParamsName]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    if (option !== "Brak dopasowań") {
      onChange(option);
    }
    setIsOpen(false);

    if (searchParamsName) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set(searchParamsName, object ? option.label : option);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(object ? { label: inputValue } : inputValue);

    if (searchParamsName) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set(searchParamsName, inputValue);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }

    if (inputValue.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) => {
        if (object) {
          return option?.label
            ?.toLowerCase()
            .includes(inputValue.toLowerCase());
        }
        return option.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredOptions(filtered.length > 0 ? filtered : ["Brak dopasowań"]);
    }

    setIsOpen(true);
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

  const renderOption = (option) => {
    const label = object ? option.label : option;
    const key = object ? option.value : option;

    return (
      <li
        key={key}
        className={styles.dropdownMenuItem}
        onClick={() => handleOptionClick(option)}
      >
        {label}
      </li>
    );
  };

  return (
    <div ref={dropdownRef} className={styles.dropdownContainer}>
      <div
        className={`${styles.dropdown} ${
          isOpen && seeOptions ? styles.open : ""
        }`}
        onClick={toggleDropdown}
      >
        <input
          type="text"
          style={!seeOptions ? { width: '100%' } : { width: '80%' }}
          className={styles.dropdownInput}
          value={object ? (value ? value.label : "") : value || ""}
          placeholder={placeholder}
          onChange={handleInputChange}
          disabled={disabled}
        />
        {seeOptions && (
          <span
            className={`${styles.arrow} ${value && isOpen ? styles.open : ""}`}
          ></span>
        )}
      </div>
      {seeOptions && isOpen && (
        <ul className={styles.dropdownMenu}>
          {filteredOptions.map((option) => renderOption(option))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdownStas;
