import grey from "@assets/img/grey.png";
import useGetUserInfo from "@hooks/UserHooks/useGetUserInfo";
import usePostUpdateImg from "@hooks/UserHooks/usePostUpdateImg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePutUserInfo from "../../../api/hooks/UserHooks/usePutUserInfo";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import InputError from "../../../components/UI/InputError/InputError";
import styles from "./styles.module.css";

function Settings() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [fileForUpload, setFileForUpload] = useState(null);

  const { register, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
  });

  const {
    register: imgRegister,
    formState: imgFormState,
    handleSubmit: handleImgSubmit,
  } = useForm({
    mode: "onChange",
  });

  const { data: user, isLoading } = useGetUserInfo() || [];
  const { mutate } = usePostUpdateImg();
  const { mutate: mutateUserInfo } = usePutUserInfo();

  useEffect(() => {
    reset({
      name: isLoading ? "Ładowanie..." : user?.first_name || "Brak",
      surname: isLoading ? "Ładowanie..." : user?.last_name || "Brak",
      date: isLoading ? "2000-01-01" : user?.birthday?.slice(0, 10),
      pesel: isLoading ? "Ładowanie..." : user?.pesel || "Brak",
      tel: isLoading ? "Ładowanie..." : user?.phone || "Brak",
      email: isLoading ? "Ładowanie..." : user?.email || "Brak",
    });
  }, [user, reset, isLoading]);

  function onSubmit(data) {
    const formData = {
      first_name: data.name,
      last_name: data.surname,
      birthday: data.date,
      pesel: data.pesel,
      email: data.email,
      phone: data.tel,
    };
    mutateUserInfo(formData);
  }

  function changeImg() {
    const formData = new FormData();
    formData.set("image", fileForUpload);
    mutate(formData);
  }

  useEffect(() => {
    setSelectedImg(isLoading || !user ? grey : user?.photo);
  }, [isLoading, user]);

  function handleImgChange(event) {
    const file = event.target.files[0];
    setFileForUpload(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedImg(objectUrl);
    }
  }

  const settingData = (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.settingData}
    >
      <div className={styles.settingInfo}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="name">Imię</label>
              <input
                type="text"
                placeholder="Pawel"
                {...register("name", {
                  pattern: {
                    value: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/,
                    message: "Tylko litery",
                  },
                })}
              />
              <InputError formState={formState} errorField={"name"} />
            </div>
            <div>
              <label htmlFor="surname">Nazwisko</label>
              <input
                placeholder="Nowik"
                {...register("surname", {
                  pattern: {
                    value: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/,
                    message: "Tylko litery",
                  },
                })}
              />
              <InputError formState={formState} errorField={"surname"} />
            </div>
          </div>

          <div className={styles.halfRow}>
            <div>
              <label htmlFor="date">Data urodzenia</label>
              <input type="date" {...register("date")} />
              <InputError formState={formState} errorField={"date"} />
            </div>
            <div>
              <label htmlFor="pesel">Pesel</label>
              <input
                placeholder="03248891023"
                {...register("pesel", {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Tylko cyfry",
                  },
                  minLength: {
                    value: 11,
                    message: "Minimum 11 cyfr",
                  },
                  maxLength: {
                    value: 11,
                    message: "Maksymalnie 11 cyfr",
                  },
                })}
              />
              <InputError formState={formState} errorField={"pesel"} />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="tel">Telefon</label>
              <input
                placeholder="777 777 777"
                {...register("tel", {
                  pattern: {
                    value: /^[0-9/+]+$/,
                    message: "Tylko cyfry",
                  },
                  minLength: {
                    value: 9,
                    message: "Minimum 9 cyfr",
                  },
                })}
              />
              <InputError formState={formState} errorField={"tel"} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                placeholder="pavel@gmail.com"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Błędny email",
                  },
                })}
              />
              <InputError formState={formState} errorField={"email"} />
            </div>
          </div>

          <button>Zapisz zmiany</button>
        </form>
      </div>
      <div className={`${styles.settingImg}`}>
        <div className={styles.photo}>
          <img src={selectedImg} alt="" />
        </div>
        <form
          encType="multipart/form-data"
          className={styles.formImg}
          onSubmit={handleImgSubmit(changeImg)}
        >
          <div>
            <label htmlFor="fileUpload" className={styles.customButton}>
              Wybierz zdjęcie
            </label>
            <input
              className={styles.inputFileHidden}
              type="file"
              accept="image/*"
              {...imgRegister("photo", {
                required: "Wybierz zdjęcie",
                onChange: handleImgChange,
              })}
              id="fileUpload"
            />
            <InputError formState={imgFormState} errorField={"photo"} />
          </div>
          <div>
            <BlueBtn>Zapisz</BlueBtn>
          </div>
        </form>
      </div>
    </motion.div>
  );

  return <div className="content">{settingData}</div>;
}

export default Settings;
