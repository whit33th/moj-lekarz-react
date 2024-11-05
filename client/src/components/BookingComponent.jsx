import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './styles/BookingComponent.module.css';
import './styles/Calendar.css';

const BookingComponent = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectTime, setSelectTime] = useState('');

  const availableDates = {
    '2024-08-17': ['13:00', '14:00', '22:00'],
    '2024-08-18': ['12:00', '13:00'],
    '2024-08-22': ['12:00', '13:00'],
    '2024-08-20': ['12:00', '13:00'],
    '2024-08-29': ['12:00', '13:00', '14:00', '15:00', '17:00', '18:00', '19:00', '19:30'],
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Формат YYYY-MM-DD
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);

    if (date) {

      // Преобразуем дату в строку формата DD.MM.YYYY
      const formattedDate2 = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    
      props.setDateValue(formattedDate2)
    }
    setSelectedDate(date);
    setAvailableTimes(availableDates[formattedDate] || []);
    
  };
  const handleTimeChange = (time) => {
    props.setTimeValue(time)
    setSelectTime(time)
    
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      if (availableDates[formattedDate]) {
        return styles.availableDate;
      }
    }
    return null;
  };

  const formatShortWeekday = (locale, date) => {
    const weekdays = ['PN', 'WT', 'SR', 'CZ', 'PT', 'SB', 'ND'];
    return weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1];
  };

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 0, 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  return (
    <div className={styles.bookingContainer}>
      <div className={styles.bookingContainerRow}>
        <div className={styles.calendarContainer}>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className={styles.customCalendar}
            tileClassName={tileClassName}
            locale="pl-PL"
            next2Label={null}
            prev2Label={null}
            formatShortWeekday={formatShortWeekday}
            minDate={startOfMonth}
            maxDate={endOfMonth}
          />
          {selectedDate && availableTimes.length > 0 && (
            <div className={styles.timeSlots}>
              {availableTimes.map((time, index) => (
                <button
                  key={index}
                  className={`${styles.timeSlot} ${
                    selectTime === time ? styles.activeTimeSlot : ''
                  }`}
                  onClick={() => handleTimeChange(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;