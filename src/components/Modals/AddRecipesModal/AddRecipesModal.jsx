import plus from '../../../assets/img/plusBlack.png'
import styles from './AddRecipesModal.module.css'
import Choice from '../../Modal/Choice'
import useStore from '../../../data/store'
import { useForm } from 'react-hook-form'
import InputDropdownStas from './../../Dropdown/InputDropdownStas'
import useGetPatientsList from './../../../hooks/DoctorHooks/useGetPatientsList'
import usePostPrescriptions from '../../../hooks/DoctorHooks/usePostPrescriptions'
import useGetMedication from '../../../hooks/DoctorHooks/useGetMedication'
import usePostMedications from '../../../hooks/DoctorHooks/usePostMedications'

function AddRecipesModal() {
  const { setModalActive, userId } = useStore()
  const { data: patientList } = useGetPatientsList({})
  const { data: medicationList } = useGetMedication({})
  const { mutate, isSuccess } = usePostPrescriptions()

  const patientOptions = patientList?.map(patient => ({
    label: `${patient.patient.user.first_name} ${patient.patient.user.last_name}`,
    patientId: patient.patient.id,
  })) || []

  const medicationOptions = medicationList?.map(medication => ({
    label: `${medication.name}`,
    id: medication.id,
  })) || []

  const { control, handleSubmit, register,getValues } = useForm({
    mode: "onChange",
  })
  const { mutate: postMedication } = usePostMedications()

  const onSubmit = (data) => {
    const prescriptionData = {
      patientId: data.patient.patientId,
      doctorId: userId,
      medicationId: data.medication.id
    }
    mutate(prescriptionData)

    console.log(data)
  }

  function addNewMedication() {
    const medicationData = {
      name: getValues("medication"),
    }
    postMedication(medicationData)
  }


  return (
    <div>
      <h1>Dodaj recepturę</h1>
      <form className={styles.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.modalInputBox}>
          <InputDropdownStas
            control={control}
            placeholder="Wybierz pacjenta"
            options={patientOptions}
            seeOptions
            {...register("patient", {
              required: "Pacjent jest wymagany",
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

          <button onClick={addNewMedication} type="button" className={styles.buttDef}>
            <span>Dodaj następujący lek</span>
            <img src={plus} alt="plus" />
          </button>
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

export default AddRecipesModal
