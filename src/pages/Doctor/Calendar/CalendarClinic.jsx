import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useMemo, useState } from "react";
import styles from "./Calendar.module.css";

import InputDropdownStas from "@components/Dropdown/InputDropdownStas";
import useGetPatientsList from "@hooks/DoctorHooks/useGetPatientsList";
import { Controller, useForm } from "react-hook-form";
import useGetAppointmentClinic from "../../../api/hooks/ClinicHooks/useGetAppointmentClinic";
import useGetWorkersList from "../../../api/hooks/ClinicHooks/useGetWorkersList";
import useGetClinicServices from "../../../api/hooks/ServicesHooks/useGetClinicServices";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";

function CalendarClinic() {
  const { data: clinic } = useGetUserInfo();
  const { data: workers } = useGetWorkersList({ clinicId: clinic?.id });
  const { data: patients } = useGetPatientsList({});
  const { data: specialties } = useGetClinicServices({ clinicId: clinic?.id });

  const [formValues, setFormValues] = useState({
    specialty: null,
    doctor: null,
    patient: null,
    date: "",
  });

  const specialtyOptions = useMemo(() => {
    if (!specialties?.length) return [];
    return specialties.map((spec) => ({
      label: spec.name || "",
      value: spec.id,
    }));
  }, [specialties]);

  const workerOptions = useMemo(() => {
    if (!workers?.doctors?.length) return [];
    return workers?.doctors?.map((doctor) => ({
      label: `${doctor.user.first_name || ""} ${
        doctor.user.last_name || ""
      }`.trim(),
      value: doctor.id,
    }));
  }, [workers]);

  const patientOptions = useMemo(() => {
    if (!patients?.length) return [];
    return patients.map((patientData) => ({
      label: `${patientData.patient.user.first_name || ""} ${
        patientData.patient.user.last_name || ""
      }`.trim(),
      value: patientData.patient.id,
    }));
  }, [patients]);

  const { data: appointmentsData, isLoading } = useGetAppointmentClinic({
    doctorId: formValues.doctor?.value || null,
    patientId: formValues.patient?.value || null,
    date: formValues.date || null,
    specialty: formValues.specialty?.value || null,
    limit: 1000,
  });

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
        end: "23:59",
      },
      events: [],
      callbacks: {
        onRangeUpdate(range) {
          setStartView(range.start.slice(0, 10));
          setEndView(range.end.slice(0, 10));
        },
      },
    },

    plugins
  );

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      specialty: "",
      doctor: "",
      patient: "",
      date: "",
    },
  });

  const start = calendar.$app.calendarState.range.v.start.slice(0, 10);
  const end = calendar.$app.calendarState.range.v.end.slice(0, 10);

  const [setStartView] = useState(start);
  const [setEndView] = useState(end);

  const appointments = useMemo(
    () => appointmentsData?.appointments || [],
    [appointmentsData]
  );

  const onSubmit = () => {};

  useEffect(() => {
    const subscription = watch((value) => {
      setFormValues(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (appointments) {
      const mappedEvents = appointments.map((appointment) => ({
        id: appointment?.id || "",
        people: [
          "Pacjent: " +
            appointment?.patient?.first_name +
            " " +
            appointment?.patient?.last_name || "",
        ],
        start:
          appointment?.date + " " + appointment?.start_time.slice(0, 5) || "",
        end: appointment?.date + " " + appointment?.end_time.slice(0, 5) || "",
        eventModal: "zxc",
        description: "Cena: " + appointment?.service?.price + "zł" || "",

        location:
          "Lekarz: " +
          appointment?.doctor?.first_name +
          " " +
          appointment?.doctor?.last_name, // optional
        title: appointment?.service?.name || "",
      }));

      calendar.eventsService.set(mappedEvents);
    }
  }, [appointments, calendar]);

  return (
    <div className="content">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.filtersGrid}>
        <Controller
          name="specialty"
          control={control}
          render={({ field }) => (
            <InputDropdownStas
              {...field}
              options={specialtyOptions}
              placeholder="Wybierz specjalizacje"
              seeOptions={true}
              object={true}
              control={control}
              name="specialty"
            />
          )}
        />
        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
            <InputDropdownStas
              {...field}
              options={workerOptions}
              placeholder="Wybierz lekarza"
              seeOptions={true}
              object={true}
              control={control}
              name="doctor"
            />
          )}
        />
        <Controller
          name="patient"
          control={control}
          render={({ field }) => (
            <InputDropdownStas
              {...field}
              options={patientOptions}
              placeholder="Wybierz pacjenta"
              seeOptions={true}
              object={true}
              control={control}
              name="patient"
            />
          )}
        />
      </form>

      <div
        className={` ${isLoading ? styles.loading : ""} ${
          styles.calendarContainer
        }`}
      >
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
}

export default CalendarClinic;
