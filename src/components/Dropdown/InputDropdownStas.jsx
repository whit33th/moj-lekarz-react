import { useEffect, useRef, useState } from "react"
import styles from "./InputDropdownStas.module.css"
import { useController } from "react-hook-form"

const InputDropdownStas = ({
  options,
  placeholder,
  seeOptions = false,
  control,
  name,
  disabled = false,
}) => {
  const {
    field: { value, onChange },
  } = useController({ name, control })

  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])
  
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleOptionClick = (option) => {
    if (option !== "Brak dopasowań") {
      onChange(option) // update value using react-hook-form with the entire option (including ID)
    }
    setIsOpen(false)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    onChange(inputValue) // update value with input

    if (inputValue.trim() === "") {
      setFilteredOptions(options)
    } else {
      const filtered = options.filter((option) =>
        option?.label?.toLowerCase().includes(inputValue.toLowerCase())
      )
      setFilteredOptions(filtered.length > 0 ? filtered : ["Brak dopasowań"])
    }

    setIsOpen(true)
  }

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const renderOption = (option) => {
    if (typeof option === "string") {
      return (
        <li
          key={option}
          className={styles.dropdownMenuItem}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </li>
      )
    }

    return (
      <li
        key={option.value}
        className={styles.dropdownMenuItem}
        onClick={() => handleOptionClick(option)}
      >
        {option.label}
      </li>
    )
  }

  return (
    <div ref={dropdownRef} className={styles.dropdownContainer}>
      <div
        className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
        onClick={toggleDropdown}
      >
        <input
          type="text"
          className={styles.dropdownInput}
          value={value ? value.label : ""}
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
          {filteredOptions.map((option, index) => renderOption(option))}
        </ul>
      )}
    </div>
  )
}

export default InputDropdownStas
