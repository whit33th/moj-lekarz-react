import { useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import styles from "./Calendar.module.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
function Calendar() {
  const plugins = [createEventsServicePlugin(), createEventModalPlugin()];
  const calendar = useCalendarApp(
    {
      views: [
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
        createViewMonthAgenda(),
      ],
      locale: "pl-PL",
      dayBoundaries: {
        start: "07:00",
        end: "21:45",
      },
      events: [
        {
          id: "1",
          title: "Pavel Kerenda",
          start: "2024-11-16 08:00",
          end: "2024-11-16 08:15",
        },
        {
          id: "2",
          title: "Встреча с клиентом",
          start: "2024-11-17 09:00",
          end: "2024-11-17 10:00",
        },
        {
          id: "3",
          title: "Обеденный перерыв",
          start: "2024-11-18 12:00",
          end: "2024-11-18 13:00",
        },
        {
          id: "4",
          title: "Проектная встреча",
          start: "2024-11-18 15:00",
          end: "2024-11-18 16:00",
        },
        {
          id: "5",
          title: "Проектная встреча 2",
          start: "2024-11-18 15:00",
          end: "2024-11-18 16:00",
        },
        {
          id: "6",
          title: "Проектная встреча 3",
          start: "2024-11-18 15:00",
          end: "2024-11-18 16:00",
          eventModal: "zxc",
        },
      ],
    },
    plugins
  );
 
  useEffect(() => {
    calendar.eventsService.getAll();
  }, [calendar]);

  return (
    <div className="content">
      <div className={styles.calendarContainer}>
        <ScheduleXCalendar
          
          
          calendarApp={calendar}
        />
      </div>
    </div>
  );
}

export default Calendar;
