import { useState, useRef, useEffect } from "react"
import { useController } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./DropdownStas.module.css"

const DropdownStas = ({
  options,
  label,
  placeholder,
  type = "dropdown",
  control,
  name,
  searchParamsName,
  valueOnSearchParams = true
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const getInitialSearchValue = () => {
    if (valueOnSearchParams && searchParamsName) {
      return new URLSearchParams(location.search).get(searchParamsName) || ""
    }
    return ""
  }

  const initialSearchValue = getInitialSearchValue()
  const [internalValue, setInternalValue] = useState(initialSearchValue)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const field = useController({ name, control })?.field || { value: internalValue, onChange: setInternalValue }
  const value = field.value
  const onChange = field.onChange

  // Синхронизация значения с параметрами URL при загрузке страницы
  useEffect(() => {
    if (valueOnSearchParams && searchParamsName && initialSearchValue) {
      onChange(initialSearchValue)
    }
  }, [initialSearchValue, onChange, valueOnSearchParams, searchParamsName])

  const toggleDropdown = () => {
    if (type === "dropdown") {
      setIsOpen((prev) => !prev)
    }
  }

  const handleOptionClick = (option) => {
    onChange(option)
    setIsOpen(false)

    // Если указан searchParamsName, обновляем параметры URL
    if (searchParamsName) {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set(searchParamsName, option)
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true })
    }
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value
    onChange(newValue)

    // Если указан searchParamsName, обновляем параметры URL
    if (searchParamsName) {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set(searchParamsName, newValue)
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true })
    }
  }

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
      {label && <label>{label}</label>}
      <div
        className={`${styles.dropdown} ${type === "input" ? styles.dropdownInput : ""
          } ${isOpen ? styles.open : ""}`}
        onClick={toggleDropdown}
      >
        {type === "input" ? (
          <input
            type="text"
            value={value || ""}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={styles.inputField}
          />
        ) : (
          <span className={value === placeholder ? styles.placeholder : ""}>
            {value || placeholder}
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
  )
}

export default DropdownStas
