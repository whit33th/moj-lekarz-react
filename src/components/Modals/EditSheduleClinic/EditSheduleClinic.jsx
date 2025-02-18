"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./EditSheduleClinic.module.css";
import Choice from "../../Modal/Choice";
import usePutTimetable from "../../../api/hooks/GeneralHooks/Schedules/usePutTimetable";

function EditSheduleClinic({ initialSchedule, setModalActive }) {
  const defaultSchedule = {
    Poniedziałek: { from: "", to: "" },
    Wtorek: { from: "", to: "" },
    Środa: { from: "", to: "" },
    Czwartek: { from: "", to: "" },
    Piątek: { from: "", to: "" },
    Sobota: { from: "", to: "" },
    Niedziela: { from: "", to: "" },
  };

  const dayMapping = {
    Poniedziałek: 1,
    Wtorek: 2,
    Środa: 3,
    Czwartek: 4,
    Piątek: 5,
    Sobota: 6,
    Niedziela: 7,
  };

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: defaultSchedule,
  });

  const { mutate } = usePutTimetable();

  useEffect(() => {
    if (initialSchedule && Object.keys(initialSchedule).length > 0) {
      Object.entries(initialSchedule).forEach(([day, times]) => {
        setValue(`${day}.from`, times.from);
        setValue(`${day}.to`, times.to);
      });
    }
  }, [initialSchedule, setValue]);

  const onSubmit = (data) => {
    const timetablesData = Object.entries(data).map(([day, times]) => {
      const startTime = times.from === "" ? null : times.from.length === 5 ? times.from : times.from;
      const endTime = times.to === "" ? null : times.to.length === 5 ? times.to : times.to;

      if (initialSchedule && initialSchedule[day]) {
        return {
          id: initialSchedule[day].id,
          dayOfWeek: initialSchedule[day].day_of_week,
          startTime,
          endTime,
        };
      } else {
        return {
          dayOfWeek: dayMapping[day],
          startTime,
          endTime,
        };
      }
    });

    mutate(timetablesData);
  };

  return (
    <div className={styles["schedule-editor"]}>
      <h1>Edytowanie grafiku pracy</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["schedule-form"]}
      >
        {Object.entries(defaultSchedule).map(([day]) => (
          <div className={styles["time-row"]} key={day}>
            <label>{day}</label>
            <div className={styles["time-inputs"]}>
              <div className={styles["time-input-group"]}>
                <span>od</span>
                <Controller
                  name={`${day}.from`}
                  control={control}
                  render={({ field }) => (
                    <input type="time" {...field} format="24h" />
                  )}
                />
              </div>
              <div className={styles["time-input-group"]}>
                <span>do</span>
                <Controller
                  name={`${day}.to`}
                  control={control}
                  render={({ field }) => (
                    <input type="time" {...field} format="24h" />
                  )}
                />
              </div>
            </div>
          </div>
        ))}
        <Choice
          choice1={"Anuluj"}
          choice2={"Edytuj"}
          cb1={() => setModalActive(false)}
          cb2={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
}

export default EditSheduleClinic;
