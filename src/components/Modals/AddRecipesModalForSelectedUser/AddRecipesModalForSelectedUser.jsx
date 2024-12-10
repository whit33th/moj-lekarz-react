import plus from '../../../assets/img/plusBlack.png'
import styles from './AddRecipesModal.module.css'
import Choice from '../../Modal/Choice'
import useStore from '../../../data/store'
import { useForm } from 'react-hook-form'
import InputDropdownStas from '../../Dropdown/InputDropdownStas'

import usePostPrescriptions from '../../../hooks/DoctorHooks/usePostPrescriptions'
import useGetMedication from '../../../hooks/DoctorHooks/useGetMedication'

function AddRecipesModalForSelectedUser({ patientId, name }) {
  const { setModalActive, userId } = useStore()

  const { data: medicationList } = useGetMedication({})
  const { mutate, isSuccess, isPending } = usePostPrescriptions()

  const medicationOptions = medicationList?.map(medication => ({
    label: `${medication.name}`,
    id: medication.id,
  })) || []

  const { control, handleSubmit, register } = useForm({
    mode: "onChange",
  })
  const onSubmit = (data) => {
    console.log(data.medication.id)
    const prescriptionData = {
      patientId: patientId,
      doctorId: userId,
      medicationId: data.medication.id
    }
    mutate(prescriptionData)
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
              required: "Lek jest wymagany",
            })}
          />

          <button type="submit" className={styles.buttDef}>
            <span>Dodaj następujący lek</span>
            <img src={plus} alt="plus" />
          </button>
        </div>


        <Choice
          cb1={() => setModalActive(false)}
          choice1="Anuluj"

          choice2="Dodaj"
        />
      </form>
    </div>
  )
}

export default AddRecipesModalForSelectedUser
