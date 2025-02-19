import bucket from "@assets/img/bucketBlue.png";
import plus from "@assets/img/plus.png";
import starGrey from "@assets/img/Star 6.svg";
import star from "@assets/img/Star.svg";
import InputDropdownStas from "@components/Dropdown/InputDropdownStas";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteDoctor from "../../../api/hooks/ClinicHooks/useDeleteDoctor ";
import usePutDoctorInfo from "../../../api/hooks/ClinicHooks/usePutDoctorInfo";
import useGetFullInfo from "../../../api/hooks/DoctorHooks/useGetFullInfo";
import useGetClinicSpecialties from "../../../api/hooks/GeneralHooks/SpecialtyHooks/useGetClinicSpecialties";
import useGetClinicServices from "../../../api/hooks/ServicesHooks/useGetClinicServices";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import BlueBorderBtn from "../../../components/Buttons/BlueBorderBtn/BlueBorderBtn";
import RedBorderBtn from "../../../components/Buttons/RedBorderBtn/RedBorderBtn";
import DropdownStas from "../../../components/Dropdown/DropdownStas";
import Choice from "../../../components/Modal/Choice";
import AddVisitTypeModal from "../../../components/Modals/AddVisitType/AddVisitTypeModal";
import InputError from "../../../components/UI/InputError/InputError";
import useStore from "../../../data/store";
import styles from "./WorkersInfo.module.css";

import grey from "@assets/img/grey.png";

export default function WorkersInfo() {
  const { id } = useParams();
  const { data: doctor } = useGetFullInfo({ id: id });
  const { data: clinic } = useGetUserInfo();
  const { data: services } = useGetClinicServices({ clinicId: clinic?.id });
  const { control, handleSubmit, register, reset, formState } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { setModalActive, setModalContent } = useStore();
  const { mutate } = usePutDoctorInfo();
  const { mutate: deleteDoctor } = useDeleteDoctor();

  const [visitTypes, setVisitTypes] = useState([]);

  useEffect(() => {
    if (doctor) {
      reset({
        firstName: doctor?.user?.first_name,
        lastName: doctor?.user?.last_name,
        email: doctor?.user?.email,
        phone: doctor?.user?.phone,
        gender: doctor?.user?.gender === "male" ? "Mężczyzna" : "Kobieta",
        city: doctor?.user?.address?.city,
        province: doctor?.user?.address?.province,
        street: doctor?.user?.address?.street,
        home: doctor?.user?.address?.home,
        flat: doctor?.user?.address?.flat,
        postIndex: doctor?.user?.address?.post_index,
        position: {
          label: doctor?.specialty?.name,
          value: doctor?.specialty?.id,
        },
        description: doctor?.description,
        hiredAt: new Date(doctor?.hired_at).toLocaleDateString(),
      });

      setVisitTypes(
        doctor?.services?.map((service) => ({
          id: service?.id?.toString(),
          name: service?.name,
          price: parseFloat(service?.price),
          checked: true,
        })) || []
      );
    }
  }, [doctor, reset]);

  const { data } = useGetClinicSpecialties({ clinicId: clinic?.id });
  const option = [
    "Usunięcie z powodu nieobecności",
    "Usunięcie z powodu rozwiązania umowy",
    "Usunięcie z powodu zaniedbania",
    "Kalendarz nullam non iaculis massa",
    "Nunc kalendarz aliquam metus",
  ];

  const specialtyOptions = useMemo(() => {
    if (!data?.length) return [];
    return data.map((spec) => ({
      label: spec.name || "",
      value: spec.id,
    }));
  }, [data]);

  function handleModal() {
    const doctorServices = doctor?.services || [];
    setModalActive(true);
    setModalContent(
      <AddVisitTypeModal
        onAddVisitType={addVisitType}
        allServices={services || []}
        existingServices={doctorServices}
      />
    );
  }

  function addVisitType(selectedTypes) {
    setVisitTypes((prevTypes) => {
      const existingIds = prevTypes.map((type) => type.id);

      const newTypes = selectedTypes.filter(
        (type) => !existingIds.includes(type.id)
      );

      return [...prevTypes, ...newTypes];
    });
  }

  function handleDeleteVisitType(id) {
    setVisitTypes((prevTypes) => prevTypes.filter((type) => type.id !== id));
  }

  const onSubmit = (formData) => {
    const updateData = {
      doctorId: id,
      userData: {
        email: formData.email,
        phone: formData.phone,
        first_name: formData.firstName,
        last_name: formData.lastName,
      },
      addressData: {
        city: formData.city,
        province: formData.province,
        street: formData.street,
        home: parseInt(formData.home),
        flat: parseInt(formData.flat),
        post_index: formData.postIndex,
      },
      doctorData: {
        hired_at: doctor?.hired_at,
        description: formData.description,
        specialty_id: parseInt(formData.position?.value),
      },
      servicesIds: visitTypes.map((type) => parseInt(type.id)),
    };
    mutate(updateData);
  };

  const editModal = (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Czy na pewno chcesz
        <br /> edytować konto?
      </h1>

      <div className={styles.actions}>
        <BlueBorderBtn cb={() => setModalActive(false)}>Nie</BlueBorderBtn>
        <RedBorderBtn cb={handleSubmit(onSubmit)}>Tak</RedBorderBtn>
      </div>
    </div>
  );
  function handleEditModal() {
    setModalActive(true);
    setModalContent(editModal);
  }

  function deleteAccountStatus() {
    deleteDoctor(id);
  }

  const modalContentDeleteAccount = (
    <>
      <h1>Usuwanie konta</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <DropdownStas
          control={control}
          name={"."}
          placeholder={"Jakub Witold Jagoda"}
        />
        <DropdownStas
          control={control}
          name={".."}
          placeholder={"Wpisz tekst"}
          options={option}
        />
        <Choice
          choice1={"Anuluj"}
          choice2={"Usuń"}
          cb1={() => setModalActive(false)}
          cb2={() => setModalContent(acceptDeleting)}
        ></Choice>
      </div>
    </>
  );
  const acceptDeleting = (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Czy na pewno chcesz <br /> Usunąć konto?
      </h1>
      <div className={styles.actions}>
        <BlueBorderBtn cb={() => setModalContent(modalContentDeleteAccount)}>
          Nie
        </BlueBorderBtn>
        <RedBorderBtn cb={deleteAccountStatus}>Tak</RedBorderBtn>
      </div>
    </div>
  );
  function handleDelete() {
    setModalActive(true);
    setModalContent(modalContentDeleteAccount);
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.returnButton}>
        Powrót
      </button>

      <h1 className={styles.title}>Informacje o pracowniku</h1>

      <div className={styles.profileSection}>
        <img
          className={styles.profileImage}
          src={doctor?.user?.photo || grey}
          alt="Profile"
        />
        <h1 className={styles.profileName}>
          {doctor?.user?.first_name} {doctor?.user?.last_name}
        </h1>
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              key={i}
              src={i < Math.round(doctor?.rating || 0) ? star : starGrey}
              alt="star"
              className={styles.imgNameBlockStar}
            />
          ))}
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoRow}>
          <div className={styles.infoGroup}>
            <label>Imię</label>
            <input
              type="text"
              {...register("firstName", {
                required: "Imię jest wymagane",
                minLength: { value: 2, message: "Imię musi mieć min. 2 znaki" },
              })}
            />
            <InputError errorField="firstName" formState={formState} />
          </div>
          <div className={styles.infoGroup}>
            <label>Nazwisko</label>
            <input
              type="text"
              {...register("lastName", {
                required: "Nazwisko jest wymagane",
                minLength: {
                  value: 2,
                  message: "Nazwisko musi mieć min. 2 znaki",
                },
              })}
            />
            <InputError errorField="lastName" formState={formState} />
          </div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoGroup}>
            <label>Email</label>
            <input
              type="text"
              {...register("email", {
                required: "Email jest wymagany",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Nieprawidłowy format email",
                },
              })}
            />
            <InputError errorField="email" formState={formState} />
          </div>
          <div className={styles.infoGroup}>
            <label>Data zatrudnienia</label>
            <input type="text" {...register("hiredAt")} />
          </div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoGroup}>
            <label>Płeć</label>
            <input type="text" {...register("gender")} />
          </div>
          <div className={styles.infoGroup}>
            <label>Tel.</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Telefon jest wymagany",
                pattern: {
                  value: /^\+?\d{9,}$/,
                  message: "Minimum 9 cyfr",
                },
              })}
            />
            <InputError errorField="phone" formState={formState} />
          </div>
        </div>
      </div>

      <div className={styles.addressSection}>
        <div className={styles.addressGrid}>
          <div className={styles.infoGroup}>
            <label>Miasto</label>
            <input
              type="text"
              {...register("city", {
                required: "Miasto jest wymagane",
              })}
            />
            <InputError errorField="city" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Województwo</label>
            <input
              type="text"
              {...register("province", {
                required: "Województwo jest wymagane",
              })}
            />
            <InputError errorField="province" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Kod pocztowy</label>
            <input
              type="text"
              {...register("postIndex", {
                required: "Kod pocztowy jest wymagany",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Nieprawidłowy format kodu pocztowego: XXXXX",
                },
              })}
            />
            <InputError errorField="postIndex" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Ulica</label>
            <input
              type="text"
              {...register("street", {
                required: "Ulica jest wymagana",
              })}
            />
            <InputError errorField="street" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Nr Domu</label>
            <input
              type="text"
              {...register("home", {
                required: "Numer domu jest wymagany",
              })}
            />
            <InputError errorField="home" formState={formState} />
          </div>

          <div className={styles.infoGroup}>
            <label>Nr Lokalu</label>
            <input type="text" {...register("flat")} />
            <InputError errorField="flat" formState={formState} />
          </div>
        </div>
        <div className={styles.descriptionSection}>
          <div className={styles.infoGroup} style={{ width: "100%" }}>
            <label>Opis</label>
            <input
              type="text"
              {...register("description", {
                required: "Opis jest wymagany",
                minLength: {
                  value: 10,
                  message: "Opis musi mieć min. 10 znaków",
                },
              })}
              style={{ width: "100%" }}
            />
            <InputError errorField="description" formState={formState} />
          </div>
        </div>
      </div>

      <div className={styles.positionSection}>
        <div>
          <label>Stanowisko</label>
          <Controller
            name="position"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputDropdownStas
                {...field}
                options={specialtyOptions}
                placeholder="Wybierz specjalizacje"
                seeOptions={true}
                object={true}
                control={control}
                name="position"
              />
            )}
          />
        </div>
      </div>

      <div className={styles.visitsSection}>
        {visitTypes?.length > 0 && (
          <>
            <h3>Typy wizyt:</h3>
            {visitTypes.map((visit) => (
              <div key={visit.id} className={styles.visitType}>
                <span>
                  {visit.name} - {visit.price.toFixed(2)} zł
                </span>
                <img
                  src={bucket}
                  alt="Delete visit type"
                  onClick={() => handleDeleteVisitType(visit.id)}
                  className={styles.deleteIcon}
                />
              </div>
            ))}
          </>
        )}
        <button onClick={handleModal} className={styles.addVisit}>
          Dodaj typ
          <img src={plus} alt="Add visit type" />
        </button>
      </div>

      <div className={styles.buttonGroup}>
        <Choice
          choice1={"Usuń"}
          choice2={"Edytuj"}
          cb1={handleDelete}
          cb2={handleEditModal}
        />
      </div>
    </div>
  );
}
