import { useState, useEffect, useRef } from "react";
import leftArrow from "../../../../assets/img/left.png";
import rightArrow from "../../../../assets/img/right.png";
import styles from "./CalendarBlock.module.css";
import useStore from "../../../../data/store";

const CalendarBlock = () => {
  const { selectedDate, setSelectedDate } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const renderCount = useRef(0); // Начинаем с 0 для первого рендера

  // Подсчёт количества рендеров
  useEffect(() => {
    renderCount.current += 1; // Увеличиваем счётчик при каждом рендере
    console.log(`Компонент ререндерился ${renderCount.current} раз(а)`);
  }, []); 
  useEffect(() => {
    if (!selectedDate) {
      const today = new Date();
      setSelectedDate({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate(),
      });
    }
  }, [selectedDate, setSelectedDate]);
  const daysOfWeek = ["PN", "WT", "SR", "CZ", "PT", "SB", "ND"];
  const months = [
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

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const startDay = startDayOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth();
    const days = [];

    const reservedDates = [
      { year: 2024, month: 10, day: 3 },
      { year: 2024, month: 10, day: 9 },
      { year: 2024, month: 10, day: 15 },
      { year: 2024, month: 10, day: 27 },
      { year: 2024, month: 10, day: 30 },
    ];

    const isReserved = (year, month, day) =>
      reservedDates.some(
        (date) => date.year === year && date.month === month && date.day === day
      );

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected =
        selectedDate &&
        selectedDate.year === currentDate.getFullYear() &&
        selectedDate.month === currentDate.getMonth() &&
        selectedDate.day === i;

      days.push(
        <div
          key={i}
          onClick={() => {
            if (
              selectedDate &&
              selectedDate.year === currentDate.getFullYear() &&
              selectedDate.month === currentDate.getMonth() &&
              selectedDate.day === i
            ) {
              // Если кликнули на уже выбранный день, сбрасываем выделение и устанавливаем текущую дату
              const today = new Date();
              setSelectedDate({
                year: today.getFullYear(),
                month: today.getMonth(),
                day: today.getDate(),
              });
            } else {
              // Если кликнули на новый день, устанавливаем его как выбранный
              setSelectedDate({
                year: currentDate.getFullYear(),
                month: currentDate.getMonth(),
                day: i,
              });
            }
          }}
          className={`${styles.day} ${
            isCurrentMonth && i === today.getDate() ? styles.today : ""
          } ${
            isReserved(currentDate.getFullYear(), currentDate.getMonth(), i)
              ? styles.reserved
              : ""
          } ${isSelected ? styles.selected : ""}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };
 

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

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
      <div className={styles.days}>{renderDays()}</div>
    </div>
  );
};

export default CalendarBlock;
