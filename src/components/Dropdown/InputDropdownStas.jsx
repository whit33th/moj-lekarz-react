import { useEffect, useRef, useState } from "react"
import styles from "./InputDropdownStas.module.css"
import { useController } from "react-hook-form"

const InputDropdownStas = ({
  options,
  placeholder,
  seeOptions = false,
  control,
  name,
}) => {
 
  const {
    field: { value, onChange },
  } = useController({ name, control })

  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleOptionClick = (option) => {
    if (option !== "Brak dopasowań") {
      onChange(option) // обновляем значение через `react-hook-form`
    }
    setIsOpen(false)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    onChange(inputValue) // обновляем значение через `react-hook-form`

    if (inputValue.trim() === "") {
      setFilteredOptions(options)
    } else {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
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

  return (
    <div ref={dropdownRef} className={styles.dropdownContainer}>
      <div
        className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
        onClick={toggleDropdown}
      >
        <input
          type="text"
          className={styles.dropdownInput}
          value={value || ""}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        {seeOptions && (
          <span
            className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
          ></span>
        )}
      </div>
      {seeOptions &&
        isOpen && (
          <ul className={styles.dropdownMenu}>
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
  )
}

export default InputDropdownStas
