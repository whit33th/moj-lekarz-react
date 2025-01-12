import { useState } from "react";
import plus from "@assets/img/plusBlack.png";
import styles from "./AddRecipesModal.module.css";
import Choice from "../../Modal/Choice";
import useStore from "../../../data/store";
import { useForm } from "react-hook-form";
import InputDropdownStas from "./../../Dropdown/InputDropdownStas";
import useGetPatientsList from "@hooks/DoctorHooks/useGetPatientsList";
import usePostPrescriptions from "@hooks/DoctorHooks/usePostPrescriptions";
import useGetMedication from "@hooks/DoctorHooks/useGetMedication";
import cross from "@assets/img/cross.png";
import { toast } from "sonner";

function AddRecipesModal() {
  const { setModalActive } = useStore();
  const { data: patientList } = useGetPatientsList({});
  const { data: medicationList } = useGetMedication({});
  const { mutate } = usePostPrescriptions();

  const [addedMedications, setAddedMedications] = useState([]);

  const patientOptions =
    patientList?.map((patient) => ({
      label: `${patient.patient.user.first_name} ${patient.patient.user.last_name}`,
      id: patient.patient.id,
    })) || [];

  const medicationOptions =
    medicationList?.map((medication) => ({
      label: `${medication.name}`,
      id: medication.id,
    })) || [];

  const { control, handleSubmit, register, getValues, setValue } = useForm({
    mode: "onChange",
  });

  const addNewMedication = () => {
    const medication = getValues("medication");

    if (
      medication &&
      medicationOptions.some((option) => option.id === medication.id)
    ) {
      if (!addedMedications.some((item) => item.id === medication.id)) {
        setAddedMedications([...addedMedications, medication]);
        setValue("medication", null);
      } else {
        toast.warning("Ten lek jest juz w liscie");
      }
    }
  };

  const onSubmit = (data) => {
    const prescriptionData = {
      patientId: data.patient.id,
      medicationsIds: addedMedications.map((med) => med.id),

      expirationDate: new Date(Date.now() + 359 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };
    mutate(prescriptionData);
    console.log(prescriptionData);
  };

  const removeMedication = (id) => {
    setAddedMedications(addedMedications.filter((med) => med.id !== id));
  };

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
            {...register("medication", {})}
          />

          <button
            onClick={addNewMedication}
            type="button"
            className={styles.buttDef}
          >
            <span>Dodaj następujący lek</span>
            <img src={plus} alt="plus" />
          </button>
        </div>

        <div
          style={
            addedMedications.length > 0
              ? { display: "flex" }
              : { display: "none" }
          }
          className={styles.addedMedications}
        >
          {addedMedications.map((medication, index) => (
            <div key={index} className={styles.addedMedicationItem}>
              <span>{medication.label}</span>

              <img
                style={{ cursor: "pointer" }}
                width={15}
                height={15}
                src={cross}
                alt=""
                onClick={() => removeMedication(medication.id)}
              />
              {/* <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeMedication(medication.id)}
              >
                Usuń
              </button> */}
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
  );
}

export default AddRecipesModal;
