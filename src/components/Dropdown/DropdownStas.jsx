import { useState, useRef, useEffect } from "react"
import { useController } from "react-hook-form"
import styles from "./DropdownStas.module.css"

const DropdownStas = ({
  options,
  label,
  placeholder,
  type = "dropdown",
  control,
  name,
}) => {
  let field = { value: "", onChange: () => { } }

  if (control && name) {
    field = useController({ name, control }).field
  }

  const [internalValue, setInternalValue] = useState("")
  const value = control && name ? field.value : internalValue
  const onChange = control && name ? field.onChange : setInternalValue

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    if (type === "dropdown") {
      setIsOpen((prev) => !prev)
    }
  }

  const handleOptionClick = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  const handleInputChange = (event) => {
    onChange(event.target.value)
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
