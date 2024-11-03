import React, { useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import styles from "./Calendar.module.css";

function Calendar() {
  // Инициализация календаря
  const plugins = [createEventsServicePlugin()];
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    locale: 'pl-PL',
    dayBoundaries: {
      start: '07:00',
      end: '21:45',
    },
    events: [
      {
        id: '1',
        title: 'Pavel Kerenda',
        start: '2024-10-27 08:00', // Убедитесь, что время указано правильно
        end: '2024-10-27 08:15',
      },
      {
        id: '2',
        title: 'Встреча с клиентом',
        start: '2024-10-27 09:00',
        end: '2024-10-27 10:00',
      },
      {
        id: '3',
        title: 'Обеденный перерыв',
        start: '2024-10-27 12:00',
        end: '2024-10-27 13:00',
      },
      {
        id: '4',
        title: 'Проектная встреча',
        start: '2024-10-27 15:00',
        end: '2024-10-27 16:00',
      },
    ],
  }, plugins);

  useEffect(() => {
    calendar.eventsService.getAll(); // Получаем все события
  }, [calendar]);

  return (
    <div className="content">
      <div className={styles.calendarContainer}>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
			
    </div>
  );
}

export default Calendar;
