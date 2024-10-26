import React, { useState } from "react";
import left from "../../../assets/img/left.png";
import separator from "../../../assets/img/separator.png";
import right from "../../../assets/img/right.png";
import styles from "./Calendar.module.css";

function Calendar() {
  const today = new Date(); // Current date
  const [activeTab, setActiveTab] = useState("Tydzień");
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // Current month
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // Current year

  // Array of month names in Polish
  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  function handleActiveTab(tab) {
    setActiveTab(tab);
  }

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // December
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // January
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysOfWeek = ["PN", "WT", "SR", "CZ", "PT", "SB", "ND"];
  const timeSlots = Array.from({ length: 30 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  const CalendarHeader = () => (
    <div className={styles.calendarNavbar}>
      <div
        className={styles.calendarNavbarButt}
        style={{ background: "#A6DEF7" }}
      >
        <button className={styles.changeDate} onClick={handlePreviousMonth}>
          <img
            className={styles.opacityLess}
            id="left-butt"
            src={left}
            alt="Left"
          />
        </button>
        <img
          className={styles.separator}
          src={separator}
          alt="Separator"
        />
        <button className={styles.changeDate} onClick={handleNextMonth}>
          <img
            className={styles.opacityLess}
            id="right-butt"
            src={right}
            alt="Right"
          />
        </button>
        {/* Кнопка для возврата к текущему месяцу */}
      </div>

      <span className={styles.calendarNavbarDate}>
        {/* Отображение диапазона дат */}
        <span className={styles.calendarNavbarDay}>
          {new Date(currentYear, currentMonth, 1).getDate()}-
          {new Date(currentYear, currentMonth + 1, 0).getDate()}
        </span>
        <span className={styles.calendarNavbarMonth}>
          {monthNames[currentMonth]}
        </span>
        <span className={styles.calendarNavbarYear}>{currentYear}</span>
      </span>
      <div className={styles.calendarNavbarButt}>
        <button
          className={`${activeTab === "Tydzień" ? styles.active : ""} ${
            styles.changeTypeDate
          }`}
          onClick={() => handleActiveTab("Tydzień")}
        >
          Tydzień
        </button>
        <button
          className={`${activeTab === "Miesiąc" ? styles.active : ""} ${
            styles.changeTypeDate
          }`}
          onClick={() => handleActiveTab("Miesiąc")}
        >
          Miesiąc
        </button>
      </div>
    </div>
  );

  const CalendarDaysHeader = () => (
    <div className={styles.headerRow}>
      {activeTab === "Tydzień" && (
        <div className={styles.timeSlotEmptySlot}></div>
      )}
      {daysOfWeek.map((day) => (
        <div key={day} className={styles.dayHeader}>
          {day}
        </div>
      ))}
    </div>
  );

  const TimeColumn = () => (
    <div className={styles.timeColumn}>
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <div className={styles.timeSlot}>{time}</div>
          <div className={styles.timeSlotEmptySlot}></div>
        </React.Fragment>
      ))}
    </div>
  );

  const CalendarDaysGrid = () => {
    if (activeTab === "Miesiąc") {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get number of days in the current month
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Get the first day of the month (0-6, where 0 is Sunday)
      const totalCells = 35; // 6 weeks * 7 days = 42 cells to fill

      // Calculate how many days are needed from the next month
      const daysInLastRow = totalCells - (daysInMonth + firstDayOfMonth); // Calculate how many empty spaces are left after filling current month days
      let nextMonthDaysToAdd = 0;

      // Determine how many days from next month to add based on the last row
      const currentMonthDaysInLastRow = Math.min(daysInMonth, daysInLastRow);
      if (currentMonthDaysInLastRow >= 2) {
        nextMonthDaysToAdd = 5; // If 2 days in the last row, add 5 from next month
      } else if (currentMonthDaysInLastRow === 1) {
        nextMonthDaysToAdd = 6; // If only 1 day in the last row, add 6 from next month
      }

      // Prepare the grid
      const dayRows = Array.from(
        { length: Math.ceil(totalCells / 7) },
        (_, rowIndex) => (
          <div key={rowIndex} className={styles.dayRow}>
            {Array.from({ length: 7 }, (_, dayIndex) => {
              const day = rowIndex * 7 + dayIndex - firstDayOfMonth + 1; // Calculate the day of the month
              const isCurrentMonth = day > 0 && day <= daysInMonth;
              const isNextMonth =
                day > daysInMonth && day <= daysInMonth + nextMonthDaysToAdd;

              return isCurrentMonth ? (
                <div
                  key={dayIndex}
                  className={`${styles.dayCellMonth} ${
                    today.getDate() === day &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear()
                      ? styles.today
                      : ""
                  }`}
                >
                  <span>{day}</span>
                </div>
              ) : isNextMonth ? (
                <div
                  key={dayIndex}
                  className={`${styles.dayCellMonth} ${styles.greyedOut}`}
                >
                  <span>{day - daysInMonth}</span>{" "}
                  {/* Display the next month day */}
                </div>
              ) : (
                <div
                  key={dayIndex}
                  className={`${styles.dayCellMonth} ${styles.greyedOut}`}
                >
                  {day <= 0 ? (
                    <span>
                      {new Date(currentYear, currentMonth, 0).getDate() + day}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        )
      );
      return <div className={styles.daysGrid}>{dayRows}</div>;
    }

    // Original weekly view
    const rows = Array.from({ length: 60 }, (_, i) => (
      <div key={i} className={styles.dayRow}>
        {Array.from({ length: 7 }, (_, j) => (
          <div key={j} className={styles.dayCell}></div>
        ))}
      </div>
    ));
    return <div className={styles.daysGrid}>{rows}</div>;
  };

  return (
    <div className="content">
      <CalendarHeader />
      <div>
        {currentMonth !== today.getMonth() && (
          <div
            className={styles.resetDate}
            onClick={() => {
              setCurrentMonth(today.getMonth());
              setCurrentYear(today.getFullYear());
            }}
          >
            Wróć na bieżący miesiąc
          </div>
        )}
        <div className={styles.calendarContainer}>
          <CalendarDaysHeader />
          <div className={styles.timeAndDays}>
            {activeTab === "Tydzień" && <TimeColumn />}
            <CalendarDaysGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
