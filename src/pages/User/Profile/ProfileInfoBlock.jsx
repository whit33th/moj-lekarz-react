import useGetUserInfo from "@api/hooks/UserHooks/useGetUserInfo";
import usePutUserInfo from "@api/hooks/UserHooks/usePutUserInfo";
import grey from "@assets/img/grey.png";
import img from "@assets/img/Vector (22).svg";
import usePostUpdateImg from "@hooks/UserHooks/usePostUpdateImg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import styles from "./ProfileInfoBlock.module.css";

function ProfileInfoBlock() {
  const { data: user } = useGetUserInfo();
  const { mutate } = usePutUserInfo();
  const [stateChangeBlock, setStateChangeBlock] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [fileForUpload, setFileForUpload] = useState(null);
  const { mutate: uploadImage } = usePostUpdateImg();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      pesel: "",
      phone: "",
      email: "",
      city: "",
      cityCode: "",
      street: "",
      houseNumber: "",
      apartmentNumber: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.first_name,
        lastName: user.last_name,
        gender: user.gender === "male" ? "mężczyzna" : "kobieta",
        pesel: user.pesel,
        phone: user.phone,
        email: user.email,
        city: user.address?.city,
        cityCode: user.address?.post_index,
        street: user.address?.street,
        houseNumber: user.address?.home,
        apartmentNumber: user.address?.flat,
      });
    }
  }, [user, reset]);

  const toggleChangeBlock = () => {
    setStateChangeBlock(!stateChangeBlock);
  };

  const onSubmit = (data) => {
    const formData = {
      email: data.email,
      phone: data.phone,
      first_name: data.firstName,
      last_name: data.lastName,
      pesel: data.pesel,
      gender: data.gender === "mężczyzna" ? "male" : "female",
      city: data.city,
      province: "",
      street: data.street,
      home: data.houseNumber,
      flat: data.apartmentNumber,
      post_index: data.cityCode,
    };
    console.log("Submitting formData:", formData);
    mutate(formData);
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileForUpload(file);
      const objectUrl = URL.createObjectURL(file);
      setSelectedImg(objectUrl);
    }
  };

  const handleUploadImage = () => {
    if (fileForUpload) {
      const formData = new FormData();
      formData.set("image", fileForUpload);
      uploadImage(formData);
      setFileForUpload(null);
    }
  };

  return (
    <div className={styles.profileInfoBlock}>
      <div className={styles.profileInfoImgBlock}>
        <div className={styles.profileImg}>
          <label htmlFor="imageInput">
            <img src={selectedImg || user?.photo || grey} alt="Profile" />
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            style={{ display: "none" }}
          />
        </div>
        {fileForUpload && (
          <button className={styles.updatePhotoBtn} onClick={handleUploadImage}>
            Aktualizuj zdjęcie
          </button>
        )}
        <p>
          {user?.first_name} {user?.last_name}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.changeBlock} ${
          stateChangeBlock ? styles.open : ""
        }`}
      >
        <div className={styles.line}></div>
        <div className={styles.changeBlockLeft}>
          <div className={styles.changeInputBlock}>
            <p>Imię</p>
            <input
              type="text"
              {...register("firstName", {
                required: "Imię jest wymagane",
                minLength: {
                  value: 2,
                  message: "Imię musi mieć minimum 2 znaki",
                },
              })}
              placeholder="Name"
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </div>
          <div className={styles.changeInputBlock}>
            <p>Nazwisko</p>
            <input
              type="text"
              {...register("lastName")}
              placeholder="SurName"
            />
          </div>
          <div className={styles.changeInputBlock}>
            <p>Plec</p>
            <input
              type="text"
              {...register("gender", {
                pattern: {
                  value: /^(mężczyzna|kobieta)$/i,
                  message: "Płeć może być tylko 'mężczyzna' lub 'kobieta'",
                },
              })}
              placeholder="mężczyzna albo kobieta"
            />
            {errors.gender && (
              <span className={styles.error}>{errors.gender.message}</span>
            )}
          </div>
          <div className={styles.changeInputBlock}>
            <p>PESEL</p>
            <input
              type="text"
              {...register("pesel", {
                required: "PESEL jest wymagany",
                pattern: {
                  value: /^\d{11}$/,
                  message: "PESEL musi mieć 11 cyfr",
                },
              })}
              placeholder="08058615499"
            />
            {errors.pesel && (
              <span className={styles.error}>{errors.pesel.message}</span>
            )}
          </div>
          <div className={styles.changeInputBlock}>
            <p>Telefon</p>
            <input
              type="tel"
              {...register("phone", {
                pattern: {
                  value: /^[0-9/+]+$/,
                  message: "Tylko cyfry albo +",
                },
                minLength: {
                  value: 9,
                  message: "Minimum 9 cyfr",
                },
              })}
              placeholder="555666777"
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>
          <div className={styles.changeInputBlock}>
            <p>Email</p>
            <input
              type="email"
              {...register("email", {
                required: "Email jest wymagany",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Nieprawidłowy format email",
                },
              })}
              placeholder="jantom@gmail.com"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className={styles.changeBlockRight}>
          <div className={styles.changeInputBlock}>
            <p>Miasto:</p>
            <input type="text" {...register("city")} placeholder="City" />
          </div>
          <div className={styles.changeInputBlock}>
            <p>Kod posztowy:</p>
            <input
              type="text"
              {...register("cityCode", {
                required: "Kod pocztowy jest wymagany",
                pattern: { value: /^\d{5}$/, message: "Format: XXXXX" },
              })}
              placeholder="32712"
              maxLength="5"
            />
            {errors.cityCode && (
              <span className={styles.error}>{errors.cityCode.message}</span>
            )}
          </div>
          <div className={styles.changeInputBlockAddress}>
            <div className={styles.changeInputBlock}>
              <p>Ulica:</p>
              <input type="text" {...register("street")} placeholder="Street" />
            </div>
            <div className={styles.changeInputBlock}>
              <p>Numer domu:</p>
              <input
                type="text"
                {...register("houseNumber")}
                placeholder="House Number"
              />
            </div>
            <div className={styles.changeInputBlock}>
              <p>Mieszkanie:</p>
              <input
                type="text"
                {...register("apartmentNumber")}
                placeholder="36"
              />
            </div>
          </div>
        </div>
        <BlueBtn type="submit" className={styles.submitButton}>
          Zapisz zmiany
        </BlueBtn>
      </form>
      <div className={styles.changeBtn} onClick={toggleChangeBlock}>
        <img src={img} alt="Toggle Change Block" />
      </div>
    </div>
  );
}

export default ProfileInfoBlock;
