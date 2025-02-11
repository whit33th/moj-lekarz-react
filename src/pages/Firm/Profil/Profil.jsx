"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Profil.module.css";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import useGetClinicSpecialties from "../../../api/hooks/GeneralHooks/SpecialtyHooks/useGetClinicSpecialties";
import Skeleton from "react-loading-skeleton";
import useStore from "../../../data/store";
import EditSheduleClinic from "../../../components/Modals/EditSheduleClinic/EditSheduleClinic";
import usePostUpdateImg from '@hooks/UserHooks/usePostUpdateImg';
import grey from "@assets/img/grey.png";
import usePutClinicInfo from "../../../api/hooks/ClinicHooks/usePutClinicInfo";
import InputError from "../../../components/UI/InputError/InputError";

function ProfilFirm() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { mutate: uploadImage } = usePostUpdateImg();
  const { mutate: updateClinicInfo, isPending } = usePutClinicInfo();
  
  const { data, isLoading } = useGetUserInfo();
  const { data: specialties, isLoading: specialtiesLoading } =
    useGetClinicSpecialties({
      clinicId: data?.id,
    });

  const { setModalActive, setModalContent } = useStore();

  const { register, reset, handleSubmit, formState } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        nip: data.nip,
        nr_license: data.nr_license,
        email: data.email,
        phone: data.phone,
        description: data.description,
        province: data.address.province,
        city: data.address.city,
        post_index: data.address.post_index,
        street: data.address.street,
        home: data.address.home,
        flat: data.address.flat,
      });
    }
  }, [data, reset]);

  const transformTimetables = (timetables) => {
    const daysMap = {
      1: "Poniedziałek",
      2: "Wtorek",
      3: "Środa",
      4: "Czwartek",
      5: "Piątek",
      6: "Sobota",
      7: "Niedziela",
    };

    return timetables.reduce((acc, schedule) => {
      acc[daysMap[schedule.day_of_week]] = {
        id: schedule.id,
        from: schedule.start_time ? schedule.start_time.substring(0, 5) : "",
        to: schedule.end_time ? schedule.end_time.substring(0, 5) : "",
        day_of_week: schedule.day_of_week 
      };
      return acc;
    }, {});
  };

  const workHours = data ? transformTimetables(data.timetables) : {};

  function handleEditSheduleModal() {
    setModalActive(true);
    setModalContent(<EditSheduleClinic setModalActive={setModalActive} initialSchedule={workHours} />);
  }

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedImg(objectUrl);
      
      const formData = new FormData();
      formData.set('image', file);
      uploadImage(formData);
    }
  };

  const onSubmit = (formData) => {
    updateClinicInfo({
      name: formData.name,
      nip: formData.nip,
      nr_license: formData.nr_license,
      email: formData.email,
      phone: formData.phone,
      description: formData.description,
      city: formData.city,
      street: formData.street,
      province: formData.province,
      home: formData.home,
      flat: formData.flat,
      post_index: formData.post_index,
    });
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-header"]}>
        <div className={styles["image-upload"]}>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImgChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="profileImage">
            <img
              src={selectedImg || data?.photo || grey}
              alt="Profile"
              className={styles["profile-image"]}
              style={{ cursor: 'pointer' }}
            />
          </label>
        </div>
        <h1>{data?.name}</h1>
        {!specialtiesLoading ? (
          <p className={styles.specialization}>
            {specialties?.length  || "Brak"} specjalizacji
          </p>
        ) : (
          <Skeleton height={24} width={125} />
        )}
      </div>

      <div className={styles["profile-content"]}>
        <form className={styles["form-section"]} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-group"]}>
            <label>Województwo</label>
            <input 
              {...register("province", { 
                required: "Województwo jest wymagane",
                minLength: { value: 2, message: "Minimum 2 znaki" }
              })} 
            />
            <InputError errorField="province" formState={formState} />
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label>Miasto</label>
              <input 
                {...register("city", { 
                  required: "Miasto jest wymagane",
                  minLength: { value: 2, message: "Minimum 2 znaki" }
                })} 
              />
              <InputError errorField="city" formState={formState} />
            </div>
            <div className={styles["form-group"]}>
              <label>Kod pocztowy</label>
              <input 
                {...register("post_index", { 
                  required: "Kod pocztowy jest wymagany",
                  pattern: { value: /^\d{5}$/, message: "Format: XXXXX" }
                })} 
              />
              <InputError errorField="post_index" formState={formState} />
            </div>
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label>Ulica</label>
              <input 
                {...register("street", { 
                  required: "Ulica jest wymagana"
                })} 
              />
              <InputError errorField="street" formState={formState} />
            </div>
            <div className={styles["form-group"]}>
              <label>Numer budynku</label>
              <input 
                {...register("home", { 
                  required: "Numer budynku jest wymagany"
                })} 
              />
              <InputError errorField="home" formState={formState} />
            </div>
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label>Numer NIP</label>
              <input 
                {...register("nip", { 
                  required: "NIP jest wymagany",
                  pattern: { value: /^\d{10}$/, message: "NIP musi mieć 10 cyfr" }
                })} 
              />
              <InputError errorField="nip" formState={formState} />
            </div>
            <div className={styles["form-group"]}>
              <label>Numer licencji</label>
              <input 
                {...register("nr_license", { 
                  required: "Numer licencji jest wymagany"
                })} 
              />
              <InputError errorField="nr_license" formState={formState} />
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label>Telefon</label>
            <input 
              {...register("phone", { 
                required: "Telefon jest wymagany"
              })} 
            />
            <InputError errorField="phone" formState={formState} />
          </div>

          <div className={styles["form-group"]}>
            <label>Email</label>
            <input 
              {...register("email", { 
                required: "Email jest wymagany",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Nieprawidłowy format email" }
              })} 
            />
            <InputError errorField="email" formState={formState} />
          </div>

          <BlueBtn 
            type="submit" 
            className={styles["edit-button"]}
            disabled={isPending}
          >
            {isPending ? "Zapisywanie..." : "Zapisz zmiany"}
          </BlueBtn>
        </form>

        <div className={styles["schedule-section"]}>
          <h2>Grafik pracy</h2>
          {Object.entries(workHours).map(([day, hours]) => (
            <div className={styles["schedule-row"]} key={day}>
              <span className={styles.day}>{day}:</span>
              {hours.from && hours.to ? (
                <span className={styles.hours}>
                  od {hours.from} do {hours.to}
                </span>
              ) : (
                <span className={styles.hours}>zamknięte</span>
              )}
            </div>
          ))}
          <BlueBtn
            cb={() => handleEditSheduleModal()}
            className={styles["edit-button"]}
          >
            Edytuj grafik pracy
          </BlueBtn>
        </div>
      </div>
    </div>
  );
}

export default ProfilFirm;
