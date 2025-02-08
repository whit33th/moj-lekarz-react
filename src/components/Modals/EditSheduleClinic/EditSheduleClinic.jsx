"use client";

import { useState, useEffect } from "react";
import styles from "./EditSheduleClinic.module.css";
import Choice from "../../Modal/Choice";

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

  const [schedule, setSchedule] = useState(defaultSchedule);

  useEffect(() => {
    if (initialSchedule && Object.keys(initialSchedule).length > 0) {
      setSchedule(initialSchedule);
    }
  }, [initialSchedule]);

  const handleTimeChange = (day, field, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  return (
    <div className={styles["schedule-editor"]}>
      <h1>Edytowanie grafiku pracy</h1>

      <div className={styles["schedule-form"]}>
        {Object.entries(schedule).map(([day, times]) => (
          <div className={styles["time-row"]} key={day}>
            <label>{day}</label>
            <div className={styles["time-inputs"]}>
              <div className={styles["time-input-group"]}>
                <span>od</span>
                <input
                  type="time"
                  value={times?.from?.slice(0, 5)}
                  onChange={(e) =>
                    handleTimeChange(day, "from", e.target.value)
                  }
                  format="24h"
                />
              </div>
              <div className={styles["time-input-group"]}>
                <span>do</span>
                <input
                  type="time"
                  value={times?.to?.slice(0, 5)}
                  onChange={(e) => handleTimeChange(day, "to", e.target.value)}
                  format="24h"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Choice
        choice1={"Anuluj"}
        choice2={"Edytuj"}
        cb1={() => setModalActive(false)}
        cb2={() => {}}
      />
    </div>
  );
}

export default EditSheduleClinic;
