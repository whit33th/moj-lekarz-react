import { useEffect, useMemo, useState } from "react"
import leftArrow from "@assets/img/left.png"
import rightArrow from "@assets/img/right.png"
import styles from "./CalendarBlock.module.css"
import useStore from "@data/store"
import useGetDoctorAppointment from "@hooks/DoctorHooks/useGetDoctorAppointment"
import Skeleton from 'react-loading-skeleton'

const CalendarBlock = () => {
  const { userId, selectedDate, setSelectedDate, todayDate, setVisitCountForMonth } = useStore()
  const [currentDate, setCurrentDate] = useState(new Date())

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  const { data: appointmentsData, isSuccess, isLoading } = useGetDoctorAppointment({
    id: userId,
    dateFrom: startOfMonth.toISOString().slice(0, 10),
    dateTo: endOfMonth.toISOString().slice(0, 10),
  })


  const appointments = useMemo(() => appointmentsData?.slots || [], [appointmentsData])


  useEffect(() => {
    if (isSuccess) {
      setVisitCountForMonth(appointments.length)
    }
  }, [isSuccess, appointments, setVisitCountForMonth])



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

  const renderSkeletonDays = () => {
    const totalCells = 42
    return Array.from({ length: totalCells }).map((_, i) => (
      <div key={`skeleton-${i}`} className={styles.day}>
        <Skeleton circle={true} height={40} width={40} />
      </div>
    ))
  }

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
    const startDay = startDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())
    const totalCells = 42

    const today = new Date().toISOString().slice(0, 10)
    const days = []

    const prevMonthDays = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    )

    const nextMonthDaysCount = totalCells - (daysInMonth + startDay)

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

      const isSelected = selectedDate === formattedDate

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => {
            if (isSelected) {
              setSelectedDate(todayDate)
            } else {
              setSelectedDate(formattedDate)
            }
          }}
          className={`${styles.day} ${today === formattedDate ? styles.today : ""}
            ${appointments?.some((appointment) => appointment.date === formattedDate) ? styles.reserved : ""}
            ${isSelected ? styles.selected : ""}`}
        >
          {i}
        </div>
      )
    }

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
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    )
  }

  function handleCalendarToDefault() {
    setCurrentDate(new Date())
    setSelectedDate(todayDate)
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarNavbar}>
        <div className={styles.calendarNavbarButt}>
          <span onClick={prevMonth}>
            <img src={leftArrow} alt="Previous month" />
          </span>
          <div className={styles.calendarNavbarDate}>
            <span onClick={() => handleCalendarToDefault()}>
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
        {isLoading ? renderSkeletonDays() : renderDays()}
      </div>
    </div>
  )
}

export default CalendarBlock
