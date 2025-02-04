import { useEffect, useMemo, useState } from "react"
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
  setRangeForDay,
  viewDay,
  viewMonthAgenda,
} from "@schedule-x/calendar"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import "@schedule-x/theme-default/dist/index.css"
import styles from "./Calendar.module.css"
import { createEventModalPlugin } from "@schedule-x/event-modal"
import useGetDoctorAppointment from "@hooks/DoctorHooks/useGetDoctorAppointment"
import useStore from "@data/store"
import { useSearchParams } from 'react-router-dom'
import useGetAppointmentClinic from "../../../api/hooks/ClinicHooks/useGetAppointmentClinic"
import InputDropdownStas from "@components/Dropdown/InputDropdownStas"
import BlueBtn from "@components/Buttons/BlueBtn/BlueBtn"
import { useForm, Controller } from "react-hook-form"

function CalendarClinic() {
  const { userId } = useStore()
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("date"))
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
      callbacks: {
        onRangeUpdate(range) {
          setStartView(range.start.slice(0, 10))
          setEndView(range.end.slice(0, 10))
        },
      }
    },

    plugins
  )

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      specialty: "",
      doctor: "",
      patient: "",
      date: ""
    }
  });

  const start = calendar.$app.calendarState.range.v.start.slice(0, 10)
  const end = calendar.$app.calendarState.range.v.end.slice(0, 10)

  
  const [startView, setStartView] = useState(start)
  const [endView, setEndView] = useState(end)
  const { data: appointmentsData, isLoading } = useGetAppointmentClinic({
    // id: userId,
    // dateFrom: startView,
    // dateTo: endView,
  })
  console.log(appointmentsData)

  const appointments = useMemo(() => appointmentsData?.appointments || [], [appointmentsData])

  const [date, setDate] = useState("")

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching...")
  }

  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Implement search logic here with all form values
  }

 
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
        description: appointment?.description + '🏷️' + appointment?.service?.price + "zł" || "",

        location: 'Sala 4', // optional
        title: appointment?.service?.name || "",


      }))

      calendar.eventsService.set(mappedEvents)

    }
  }, [appointments, calendar])

  


  return (
    <div className="content">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.filtersGrid}>
        <InputDropdownStas 
          {...register("specialty")}
          control={control}
          options={[]}
          placeholder="Wybierz specjalizacje"
          seeOptions={true}
        />
        <InputDropdownStas 
          {...register("doctor")}
          control={control}
          options={[]}
          placeholder="Wybierz lekarza"
          seeOptions={true}
        />
        <InputDropdownStas 
          {...register("patient")}
          control={control}
          options={['zxc']}
          placeholder="Wybierz pacjenta"
          seeOptions={true}
        />
        <div className={styles.searchGroup}>
          <div className={styles.dropdownContainer} style={{flex: 1}}>
            <div className={styles.dropdown}>
              <input 
                type="date"
                className={styles.dateInput}
                {...register("date")}
              />
            </div>
          </div>
          <div style={{flex: '1'}}>
            <BlueBtn cb={handleSubmit(onSubmit)}>Szukaj</BlueBtn>
          </div>
        </div>
      </form>

      <div className={`${isLoading ? styles.loading : ''} ${styles.calendarContainer}`}>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  )
}

export default CalendarClinic