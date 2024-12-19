import { useState, useEffect } from "react"
import useStore from "../../../data/store"
import DropdownStas from "../../Dropdown/DropdownStas"
import Choice from "../../Modal/Choice"
import styles from "./AddSpecialization.module.css"
import plus from "@assets/img/plus.png"
import { useForm } from 'react-hook-form'

function AddSpecializationModal({ onAddSpecialization }) {
  const { setModalActive } = useStore()
  const visitTypeOptions = ["Ortopeda", "Dentysta", "Kardiolog"]

  const [visitTypes, setVisitTypes] = useState([
    { id: 1, type: "", price: "" },
  ])
  const [specialty, setSpecialty] = useState(visitTypeOptions[0])
  useEffect(() => {
    setSpecialty(visitTypeOptions[0])
  }, [])
  const { control, handleSubmit, watch } = useForm({

  })
  const addVisitType = () => {
    setVisitTypes([...visitTypes, { id: Date.now(), type: "", price: "" }])
  }

  const handleTypeChange = (index, value) => {
    const updatedVisitTypes = [...visitTypes]
    updatedVisitTypes[index].type = value
    setVisitTypes(updatedVisitTypes)
  }

  const handlePriceChange = (index, value) => {
    const updatedVisitTypes = [...visitTypes]
    updatedVisitTypes[index].price = value
    setVisitTypes(updatedVisitTypes)
  }

  const handleAddSpecialization = () => {
    onAddSpecialization({ specialty, visitTypes })
    setModalActive(false)
  }

  return (
    <div>
      <h1>Dodanie specjalizacji</h1>
      <DropdownStas
        control={control} name={"."}
        options={visitTypeOptions}
        label="Stanowisko"
        onChange={(value) => setSpecialty(value)}
        selected={specialty}
      />
      <div className={styles.inputs}>
        {visitTypes.map((visit, index) => (
          <div key={visit.id} className={styles.flex}>
            <div className={styles.type}>
              <DropdownStas
                control={control} name={".."}
                placeholder="Wybierz typ wizyty"
                type="input"
                label={index === 0 ? "Typ wizyty" : ""}
                onChange={(value) => handleTypeChange(index, value)}
              />
            </div>
            <div className={styles.price}>
              <DropdownStas
                control={control} name={"..."}
                label={index === 0 ? "Cena" : ""}
                type="input"
                placeholder="100"
                onChange={(value) => handlePriceChange(index, value)}
              />
            </div>
          </div>
        ))}
      </div>
      <button onClick={addVisitType} className={styles.addVisit}>
        Dodaj typ
        <img src={plus} alt="Add visit type" />
      </button>
      <Choice
        choice1="Anuluj"
        choice2="Dodaj"
        cb1={() => setModalActive(false)}
        cb2={handleAddSpecialization}
      />
    </div>
  )
}

export default AddSpecializationModal
