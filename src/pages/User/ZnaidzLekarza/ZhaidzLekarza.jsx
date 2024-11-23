import React, { useState } from "react"
import styles from "./style/ZhaidzLekarza.module.css"
import DatePicker from "react-datepicker"
import DoctorCard from "./DoctorCard"
import DropdownStas from '../../../components/Dropdown/DropdownStas'
import { useForm } from 'react-hook-form'

const arraySelectOptions = {
  select1: ["ortoped", "logoped", "surgeon"],
  select2: ["Poznań", "Tokyo", "NYC"],
  select3: ["Options 1", "Options 2", "Options 3"],
}


function ZhaidzLekarza(props) {
  const doctorCard = props.doctorCard
  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [selectedOption1, setSelectedOption1] = useState("")
  const [selectedOption2, setSelectedOption2] = useState("")
  const [selectedOption3, setSelectedOption3] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const [state, setState] = useState(doctorCard)
  const { control, handleSubmit, watch } = useForm({

  })
  const handleOptionClick = (option, setSelectedOption, setIsOpen) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  const toggleDropdown = (isOpen, setIsOpen) => {
    setIsOpen(!isOpen)
  }
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

                <DropdownStas control={control} name={"."} options={arraySelectOptions.select1} placeholder={"Wybierz specjalizacje"} />

              </div>

              <div className={styles.dropdownContainer}>
                <DropdownStas control={control} name={".."} options={arraySelectOptions.select2} placeholder={"Wybierz miasto"} />
              </div>

              <div className={styles.formCalendar}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                  minDate={new Date()}
                  placeholderText="Wybierz dzień"
                />
              </div>

              <div className={`${styles.dropdownContainer} ${styles.litle}`}>
                <DropdownStas control={control} name={"..."} options={arraySelectOptions.select3} placeholder={"Wybierz ..."} />
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
        {state.map((item) => (
          <DoctorCard
            data={item}
            key={item.id}
            selectedDate={selectedDate}
            addZapis={props.addZapis}
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

export default ZhaidzLekarza
