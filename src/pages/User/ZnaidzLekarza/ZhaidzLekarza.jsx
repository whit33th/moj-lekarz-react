import React, { useState } from "react"
import styles from "./style/ZhaidzLekarza.module.css"
import DatePicker from "react-datepicker"
import DoctorCard from "./DoctorCard"
import DropdownStas from '../../../components/Dropdown/DropdownStas'
import { useForm } from 'react-hook-form'
import useSearchAppointments from '@hooks/PatientHooks/useSearchAppointments'
import DoctorCardSkeleton from './DoctorCardSkeleton'

const arraySelectOptions = {
  select1: ["Ortopeda", "Logopeda", "Chirurg", "Kardiolog", "Ginekolog"],
  select2: ["Poznan", "Warszawa", "Wroclaw"],
  select3: ["Konsultacja", "Badanie"],
}


function ZnajdzLekarza(props) {
  const doctorCard = props.doctorCard
  const [selectedDate, setSelectedDate] = useState(null)
  const [state, setState] = useState(doctorCard)
  const { control, register, handleSubmit, getValues } = useForm({

  })


  const { data, isLoading } = useSearchAppointments({
    // specialty: 'Assistant',
    // date: '2025-07-10',
    select: (data) => data?.data.slots
  })






  const clickFilterBtn = () => {
    const filteredDoctors = doctorCard.filter((doctor) => {
      const matchesType = selectedOption1
        ? doctor.type === selectedOption1
        : true
      const matchesCity = selectedOption2
        ? doctor.address.city === selectedOption2
        : true

      const matchesDate = selectedDate
        ? doctor.dates.some(
          (dateObj) =>
            dateObj.date === selectedDate.toLocaleDateString("pl-PL")
        )
        : true
      return matchesCity && matchesType && matchesDate
    })
    setState(filteredDoctors)
  }
  return (
    <div className={styles.zhaidzLekarza}>
      <div className={styles.filterBlock}>
        <div className={styles.filterBlockContent}>
          <h1>Umów się na wizytę</h1>
          <div className={styles.filterBlockContentSelects}>
            <div className={styles.mainFormIntupsBlock}>
              <div className={styles.dropdownContainer}>

                <DropdownStas control={control} name={"specialty"} options={arraySelectOptions.select1} placeholder={"Wybierz specjalizacje"} searchParamsName={"specialty"} />

              </div>

              <div className={styles.dropdownContainer}>
                <DropdownStas control={control} name={"city"} options={arraySelectOptions.select2} placeholder={"Wybierz miasto"} searchParamsName={"city"} />
              </div>

              <div className={styles.formCalendar}>
                <input type="date" placeholder="Data wizyty" className={styles.calendar} {...register("date")} defaultValue={getValues("date")} />
              </div>

              <div className={`${styles.dropdownContainer} ${styles.litle}`}>
                <DropdownStas control={control} name={"type"} options={arraySelectOptions.select3} placeholder={"Wybierz ..."} searchParamsName={"type"} />
              </div>
            </div>
            <div className={styles.filterBtnBlock}>
              <button onClick={clickFilterBtn}>Szukaj terminu</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.zhaidzLekarzaContentBlock}>
        <div className={styles.zhaidzLekarzaContentTitle}>
          <h2>Wybierz spośród {state.length} dostępnych specjalistów</h2>
          <button>Zobacz na mapę</button>
        </div>
      </div>
      <div className={styles.doctorsCards}>
        {isLoading ? <DoctorCardSkeleton count={3} /> : data?.map((item) => (
          <DoctorCard
            data={item}
            key={item.doctor_id}
            // selectedDate={selectedDate}
            // addZapis={props.addZapis}
            loading={isLoading}
          />
        ))}
        {state.length == 0 && (
          <div className={styles.nonDoctorCardBlock}>
            <h1>Brak dostępnych terminów</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default ZnajdzLekarza
