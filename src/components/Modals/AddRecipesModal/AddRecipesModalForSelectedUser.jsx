import plus from '@assets/img/plusBlack.png'
import { useForm } from 'react-hook-form'
import useStore from '../../../data/store'
import InputDropdownStas from '../../Dropdown/InputDropdownStas'
import Choice from '../../Modal/Choice'
import styles from './AddRecipesModal.module.css'

import cross from '@assets/img/cross.png'
import useGetMedication from '@hooks/DoctorHooks/useGetMedication'
import usePostPrescriptions from '@hooks/DoctorHooks/usePostPrescriptions'
import { useState } from 'react'
import { toast } from 'sonner'

function AddRecipesModalForSelectedUser({ patientId, name }) {
  const { setModalActive } = useStore()
  const { data: medicationList } = useGetMedication({})
  const { mutate } = usePostPrescriptions()

  // Состояние для добавленных препаратов
  const [addedMedications, setAddedMedications] = useState([])

  const medicationOptions = medicationList?.map(medication => ({
    label: `${medication.name}`,
    id: medication.id,
  })) || []

  const { control, handleSubmit, register, getValues, setValue } = useForm({
    mode: "onChange",
  })
  const addNewMedication = () => {
    const medication = getValues("medication")
    // Проверяем, существует ли препарат в списке опций
    if (medication && medicationOptions.some(option => option.id === medication.id)) {
      if (!addedMedications.some(item => item.id === medication.id)) {
        setAddedMedications([...addedMedications, medication])
        setValue("medication", null)
      }
      else {
        toast.warning('Ten lek jest juz w liscie')
      }
    }
  }
  const onSubmit = () => {
    const prescriptionData = {
      patientId: patientId,
      medications: addedMedications.map(med => med.id), 
    }
    mutate(prescriptionData)
    console.log(prescriptionData)
  }
  const removeMedication = (id) => {
    setAddedMedications(addedMedications.filter(med => med.id !== id))
  }

  return (
    <div>
      <h1>Dodaj recepturę</h1>
      <form className={styles.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.modalInputBox}>
          <InputDropdownStas
            control={control}
            placeholder={name}
            disabled
            seeOptions={false}
            {...register("patient", {
            })}
          />

          <InputDropdownStas
            control={control}
            placeholder="Wybierz lek"
            options={medicationOptions}
            seeOptions
            {...register("medication", {

            })}
          />

          <button onClick={addNewMedication} type="button" className={styles.buttDef}>
            <span>Dodaj następujący lek</span>
            <img src={plus} alt="plus" />
          </button>
        </div>

        {/* Рендер списка добавленных лекарств */}
        <div style={addedMedications.length > 0 ? { display: 'flex' } : { display: 'none' }} className={styles.addedMedications}>
          {addedMedications.map((medication, index) => (
            <div key={index} className={styles.addedMedicationItem}>
              <span>{medication.label}</span>

              <img style={{ cursor: 'pointer' }} width={15} height={15} src={cross} alt="" onClick={() => removeMedication(medication.id)} />

            </div>
          ))}
        </div>

        <Choice
          cb1={() => setModalActive(false)}
          choice1="Anuluj"
          cb2={handleSubmit(onSubmit)}
          choice2="Dodaj"
        />
      </form>
    </div>
  )
}

export default AddRecipesModalForSelectedUser
