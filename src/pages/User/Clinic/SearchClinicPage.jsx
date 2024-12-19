import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import styles from "./style/SearchClinicPage.module.css"
import ClinicCard from "./ClinicCard"

import useStore from "../../../data/store"
import DropdownStas from '../../../components/Dropdown/DropdownStas'

const arraySelectOptions = {
  select1: ["name1", "name2", "name3"],
  select2: ["ortoped", "logoped", "Kardiolog", "Ginekolog"],
  select3: ["Poznań", "Tokyo", "Ala"],
  select4: ["Publiczne", "Prywatne"],
}


function SearchClinicPage() {
  
  const { clinicCard } = useStore()
  const [state, setState] = useState(clinicCard)

  const { control, handleSubmit, watch } = useForm({

  })

  const watchFields = watch()

  const clickFilterBtn = () => {
    const { select1, select2, select3, select4 } = watchFields
    const filteredDoctors = clinicCard.filter((doctor) => {
      const matchesName = select1 ? doctor.name === select1 : true
      const matchesTypes = select2
        ? doctor.types.some((type) => select2.includes(type))
        : true
      const matchesCity = select3 ? doctor.address.city === select3 : true
      const publicType = select4 ? doctor.public === select4 : true
      return matchesCity && matchesName && matchesTypes && publicType
    })
    setState(filteredDoctors)
  }

  return (
    <div className={styles.clinickPage}>
      <h1>Wybierz spośród 5 324 dostępnych centrów medycznych</h1>
      <div className={styles.filterBlockContentSelects}>
        <form onSubmit={handleSubmit(clickFilterBtn)}>
          <div className={styles.mainFormIntupsBlock}>
            <div className={styles.dropdownContainer}>



              <DropdownStas
                name="select1"
                control={control}
                options={arraySelectOptions.select1}
                placeholder={"Wybierz centrum medyczny"}
                
              />


            </div>

            <div className={styles.dropdownContainer}>

              <DropdownStas
                name="select2"
                control={control}
                options={arraySelectOptions.select2}
                placeholder={"Wybierz specjalizacje"}
              />

            </div>

            <div className={`${styles.dropdownContainer} ${styles.litle}`}>

              <DropdownStas
                name="select3"
                control={control}
                options={arraySelectOptions.select3}
                placeholder={"Wybierz miasto"}
              />


            </div>

            <div className={`${styles.dropdownContainer} ${styles.litle}`}>

              <DropdownStas
                name="select4"
                control={control}

                options={arraySelectOptions.select4}
                placeholder={"Rodzaj wizyty"}
              />

            </div>

            <div className={styles.filterBtnBlock}>
              <button type="submit">Szukaj terminu</button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.clinicCardsBlock}>
        {state.map((item) => (
          <ClinicCard key={item.id} state={item} />
        ))}
      </div>
      {state.length === 0 && (
        <div className={styles.nonCinicCardBlock}>
          <h1>Brak dostępnych placówek medycznych</h1>
        </div>
      )}
    </div>
  )
}

export default SearchClinicPage
