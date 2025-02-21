import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import exit from "@assets/img/cross.png";
import styles from "./AddWorkersModal.module.css";
import useStore from "../../../data/store";
import { useForm } from "react-hook-form";
import useGetClinicSpecialties from "../../../api/hooks/GeneralHooks/SpecialtyHooks/useGetClinicSpecialties";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import usePostDoctor from "../../../api/hooks/ClinicHooks/usePostDoctor";
import useGetClinicServices from "../../../api/hooks/ServicesHooks/useGetClinicServices";
import InputDropdownStas from "../../Dropdown/InputDropdownStas";
import InputError from "../../UI/InputError/InputError";
import Textarea from "../../UI/TextArea/Textarea";
import { useMemo } from "react";

function AddWorkersModal() {
  const { setModalActive } = useStore();
  const { data: clinic } = useGetUserInfo();
  const { data: specialties } = useGetClinicSpecialties({
    clinicId: clinic?.id,
  });
  const { data: services } = useGetClinicServices({ clinicId: clinic?.id });
  const { mutate, isPending } = usePostDoctor();

  const { register, handleSubmit, control, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      selectedServices: [],
      gender: "",
      hired_at: new Date().toISOString().split("T")[0],
    },
  });

  const specialtyOptions = useMemo(() => {
    if (!specialties?.length) return [];
    return specialties.map((spec) => ({
      label: spec.name,
      value: spec.id,
    }));
  }, [specialties]);

  const onSubmit = (data) => {
    const formattedData = {
      userData: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        gender:
          data.gender.toLowerCase() === "mężczyzna" ||
          data.gender.toLowerCase() === "mezczyzna"
            ? "male"
            : "female",
        pesel: data.pesel,
        phone: data.phone,
        birthday: data.birthday,
      },
      addressData: {
        city: data.city,
        province: data.province,
        street: data.street,
        home: data.home,
        flat: data.flat,
        post_index: data.post_index,
      },
      doctorData: {
        hired_at: data.hired_at,
        description: data.description,
      },
      specialtyId: data.specialty.value,
      servicesIds: data.selectedServices.map((id) => parseInt(id)),
    };

    mutate(formattedData);
  };

  return (
    <div className={styles.container}>
      <img onClick={() => setModalActive(false)} src={exit} alt="cross" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.infoGrid3}>
          <div className={styles.infoGroup}>
            <label>Imię*</label>
            <input
              {...register("first_name", { required: "Wymagane pole" })}
              type="text"
              placeholder="Wprowadź imię"
            />
            <InputError errorField="first_name" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Nazwisko*</label>
            <input
              {...register("last_name", { required: "Wymagane pole" })}
              type="text"
              placeholder="Wprowadź nazwisko"
            />
            <InputError errorField="last_name" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>PESEL*</label>
            <input
              {...register("pesel", {
                required: "Wymagane pole",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Nieprawidłowy format PESEL",
                },
              })}
              type="text"
              placeholder="Wprowadź PESEL"
            />
            <InputError errorField="pesel" formState={formState} />
          </div>
        </div>

        <div className={styles.infoGrid3}>
          <div className={styles.infoGroup}>
            <label>Email*</label>
            <input
              {...register("email", {
                required: "Wymagane pole",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Nieprawidłowy format email",
                },
              })}
              type="email"
              placeholder="przykład@email.com"
            />
            <InputError errorField="email" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Telefon*</label>
            <input
              {...register("phone", {
                required: "Wymagane pole",
                pattern: {
                  value: /^\+?[0-9]{9,}$/,
                  message: "Nieprawidłowy format telefonu",
                },
              })}
              type="tel"
              placeholder="+48XXXXXXXXX"
            />
            <InputError errorField="phone" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Data urodzenia*</label>
            <input
              {...register("birthday", { required: "Wymagane pole" })}
              type="date"
              placeholder="Wybierz datę"
            />
            <InputError errorField="birthday" formState={formState} />
          </div>
        </div>

        <div className={styles.infoGrid3}>
          <div className={styles.infoGroup}>
            <label>Płeć*</label>
            <input
              {...register("gender", {
                required: "Wymagane pole",
                validate: (value) => {
                  const lowerValue = value.toLowerCase();
                  if (
                    lowerValue === "mężczyzna" ||
                    lowerValue === "mezczyzna"
                  ) {
                    return true;
                  }
                  if (lowerValue === "kobieta") {
                    return true;
                  }
                  return 'Dozwolone wartości: "Mężczyzna" lub "Kobieta"';
                },
              })}
              type="text"
              placeholder='Wpisz "Mężczyzna" lub "Kobieta"'
            />
            <InputError errorField="gender" formState={formState} />
          </div>

          

          <div className={styles.infoGroup}>
            <label>Data zatrudnienia*</label>
            <input
              {...register("hired_at", { required: "Wymagane pole" })}
              type="date"
              placeholder="Wybierz datę"
            />
            <InputError errorField="hired_at" formState={formState} />
          </div>
        </div>

        <div className={styles.infoGrid3}>
          <div className={styles.infoGroup}>
            <label>Miasto*</label>
            <input
              {...register("city", { required: "Wymagane pole" })}
              type="text"
              placeholder="Wprowadź miasto"
            />
            <InputError errorField="city" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Województwo*</label>
            <input
              {...register("province", { required: "Wymagane pole" })}
              type="text"
              placeholder="Wprowadź województwo"
            />
            <InputError errorField="province" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Ulica*</label>
            <input
              {...register("street", { required: "Wymagane pole" })}
              type="text"
              placeholder="Wprowadź ulicę"
            />
            <InputError errorField="street" formState={formState} />
          </div>
        </div>

        <div className={styles.infoGrid3}>
          <div className={styles.infoGroup}>
            <label>Nr domu*</label>
            <input
              {...register("home", { required: "Wymagane pole" })}
              type="text"
              placeholder="Wprowadź nr domu"
            />
            <InputError errorField="home" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Nr mieszkania</label>
            <input 
              {...register("flat")} 
              type="text"
              placeholder="Wprowadź nr mieszkania"
            />
          </div>

          <div className={styles.infoGroup}>
            <label>Kod pocztowy*</label>
            <input
              {...register("post_index", {
                required: "Wymagane pole",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Format: XXXXX",
                },
              })}
              type="text"
              placeholder="XXXXX"
            />
            <InputError errorField="post_index" formState={formState} />
          </div>
        </div>

        <div className={styles.fullWidthGroup}>
          <label>Opis</label>
          <Textarea
            {...register("description")}
            resize={false}
            rows={3}
            placeholder="Wprowadź opis"
            style={{ maxWidth: "100%" }}
          />
        </div>

        <div className={styles.specializationField}>
          <label>Specjalizacja*</label>
          <InputDropdownStas
            control={control}
            object
            seeOptions
            name="specialty"
            rules={{ required: "Wymagane pole" }}
            options={specialtyOptions}
            placeholder="Wybierz specjalizację"
          />
          <InputError errorField="specialty" formState={formState} />
        </div>

        <div className={styles.servicesGrid}>
          <h3>Dostępne usługi:</h3>
          <div className={styles.servicesContainer}>
            {services?.map((service) => (
              <div key={service.id} className={styles.serviceItem}>
                <input
                  type="checkbox"
                  value={service.id}
                  id={`service-${service.id}`}
                  {...register("selectedServices")}
                  className={styles.checkbox}
                />
                <label htmlFor={`service-${service.id}`}>
                  {service.name} • {parseFloat(service.price).toFixed(2)} zł
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <BlueBtn type="submit" disabled={isPending}>
            {isPending ? "Dodawanie..." : "Dodaj"}
          </BlueBtn>
        </div>
      </form>
    </div>
  );
}

export default AddWorkersModal;
