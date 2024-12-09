import { useEffect } from "react"
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import "@schedule-x/theme-default/dist/index.css"
import styles from "./Calendar.module.css"
import { createEventModalPlugin } from "@schedule-x/event-modal"
import useGetDoctorAppointment from "../../../hooks/DoctorHooks/useGetDoctorAppointment"
import useStore from "../../../data/store"

function Calendar() {
  const { userId, todayDate, setModalActive } = useStore()

  const { data: appointments } = useGetDoctorAppointment({
    id: userId,
    dateFrom: '2023-01-16',
    dateTo: '2026-01-16',
  })
  const plugins = [createEventsServicePlugin(), createEventModalPlugin(),]
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
        end: "23:59",
      },
      events: [],
    },

    plugins
  )

  useEffect(() => {
    if (appointments) {
      const mappedEvents = appointments.map((appointment) => ({
        id: appointment?.id || "",
        people: [
          appointment?.patient?.first_name +
          " " +
          appointment?.patient?.last_name || ""],
        start: appointment?.date + " " + appointment?.start_time.slice(0, 5) || "",
        end: appointment?.date + " " + appointment?.end_time.slice(0, 5) || "",
        eventModal: "zxc",
        description: 'Есть предложения что тут надо написать??',
        location: 'Sala 4', // optional
        title: 'Nazwa wizyty',
      }))
      calendar.eventsService.set(mappedEvents)
    }
  }, [appointments, calendar])




  console.log(appointments)
  return (
    <div className="content">
      <div className={styles.calendarContainer}>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  )
}

export default Calendar