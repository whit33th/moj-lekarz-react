import { useState } from "react"
import leftArrow from "@assets/img/left.png"
import rightArrow from "@assets/img/right.png"
import styles from "./CalendarBlock.module.css"

const CalendarBlockManager = ({ onDateSelect, selectedDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysOfWeek = ["PN", "WT", "SR", "CZ", "PT", "SB", "ND"]
  const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
  ]

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const startDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1
  }

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
    const startDay = startDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())
    const totalCells = 42
    const days = []

    
    const prevMonthDays = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    )
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i
      days.push(
        <div key={`prev-${day}`} className={`${styles.day} ${styles.inactive}`}>
          {day}
        </div>
      )
    }

    
    for (let i = 1; i <= daysInMonth; i++) {
      const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(i).padStart(2, "0")}`

      const isSelected = selectedDates.includes(formattedDate)

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => onDateSelect(formattedDate)}
          className={`${styles.day} ${isSelected ? styles.selected : ""}`}
        >
          {i}
        </div>
      )
    }

   
    const nextMonthDaysCount = totalCells - (daysInMonth + startDay)
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      days.push(
        <div key={`next-${i}`} className={`${styles.day} ${styles.inactive}`}>
          {i}
        </div>
      )
    }

    return days
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarNavbar}>
        <div className={styles.calendarNavbarButt}>
          <span onClick={prevMonth}>
            <img src={leftArrow} alt="Previous month" />
          </span>
          <div className={styles.calendarNavbarDate}>
            <span>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
          </div>
          <span onClick={nextMonth}>
            <img src={rightArrow} alt="Next month" />
          </span>
        </div>
      </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayOfWeek}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {renderDays()}
      </div>
    </div>
  )
}

export default CalendarBlockManager
