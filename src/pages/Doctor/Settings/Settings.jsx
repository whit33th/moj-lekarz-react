import grey from "@assets/img/grey.png";
import useGetUserInfo from "@hooks/UserHooks/useGetUserInfo";
import usePostUpdateImg from "@hooks/UserHooks/usePostUpdateImg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePutUserInfo from "../../../api/hooks/UserHooks/usePutUserInfo";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import Tabs from "../../../components/Buttons/Tabs/Tabs";

import InputError from "../../../components/UI/InputError/InputError";
import AdditionalData from "./AdditionalData";

import styles from "./styles.module.css";

import { motion } from "framer-motion";
import CalendarBlockSchedules from "../../../components/DoctorPage/Home/Calendar/CalendarBlockSchedules";
import AddDoctorIconModal from "../../../components/Modals/AddDoctorIcon/AddDoctorIconModal";
import useStore from "../../../data/store";
function Settings() {
  const { setModalActive, setModalContent } = useStore();
  const [activeTab, setActiveTab] = useState("Dane podstawowe");
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [fileForUpload, setFileForUpload] = useState(null);
  const { register, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      birthDate: "2000-01-01",
    },
  });

  const {
    register: imgRegister,
    formState: imgFormState,
    handleSubmit: handleImgSubmit,
  } = useForm({
    mode: "onChange",
  });

  function handleTabClick(name) {
    setActiveTab(name);
  }

  const { data: user, isLoading } = useGetUserInfo() || [];
  const { mutate } = usePostUpdateImg();

  useEffect(() => {
    reset({
      firstName: isLoading ? "Ładowanie..." : user?.first_name || "Brak",
      lastName: isLoading ? "Ładowanie..." : user?.last_name || "Brak",
      birthDate: isLoading ? "2000-01-01" : user?.birthday?.slice(0, 10),
      pesel: isLoading ? "Ładowanie..." : user?.pesel || "Brak",
      tel: isLoading ? "Ładowanie..." : user?.phone || "Brak",
      email: isLoading ? "Ładowanie..." : user?.email || "Brak",
      description: isLoading ? "Ładowanie..." : user?.description || "Brak",
      city: isLoading ? "Ładowanie..." : user?.address?.city || "Brak",
      street: isLoading ? "Ładowanie..." : user?.address?.street || "Brak",
      house: isLoading ? "Ładowanie..." : user?.address?.home || "Brak",
      flat: isLoading ? "Ładowanie..." : user?.address?.flat || "Brak",
      postCode: isLoading
        ? "Ładowanie..."
        : user?.address?.post_index || "Brak",
    });
  }, [user, reset, isLoading]);

  const { mutate: mutateUserInfo } = usePutUserInfo();
  function onSubmit(data) {
    const formData = {
      first_name: data.firstName,
      last_name: data.lastName,
      birthday: data.birthDate,
      gender: "",
      pesel: data.pesel,
      email: data.email,
      phone: data.tel,
      city: data.city,
      province: data.province || "",
      street: data.street,
      home: data.house,
      flat: data.flat,
      post_index: data.postCode,
      hired_at: data.birthDate,
      description: data.description,
    };
    mutateUserInfo(formData);
  }

  const urlToFile = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], "icon.png", { type: "image/png" });
    } catch (error) {
      console.error("Error converting URL to File:", error);
      return null;
    }
  };

  function handleImgChange(event) {
    const file = event.target.files[0];
    if (file) {
      setFileForUpload(file);
      setSelectedIcon(null);
      const objectUrl = URL.createObjectURL(file);
      setSelectedImg(objectUrl);
    }
  }

  const handleIconSelect = (iconPath) => {
    setSelectedIcon(iconPath);
    setSelectedImg(null);
    setFileForUpload(null);
  };

  async function changeImg() {
    const formData = new FormData();

    if (fileForUpload && !selectedIcon) {
      formData.set("image", fileForUpload);
    }

    if (selectedIcon && !fileForUpload) {
      const iconFile = await urlToFile(selectedIcon);
      if (iconFile) {
        formData.set("image", iconFile);
      }
    }

    if (formData.has("image")) {
      mutate(formData);
    }
  }

  const handleSubmitForm = handleImgSubmit(async () => {
    await changeImg();
  });

  useEffect(() => {
    setSelectedImg(isLoading || !user ? grey : user?.photo);
  }, [isLoading, user]);
  const workTime = (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.workTime}
    >
      <div style={{ width: "100%" }} className={styles.shadow}>
        <CalendarBlockSchedules />
      </div>
    </motion.div>
  );

  function handleIconClick() {
    setModalActive(true);
    setModalContent(<AddDoctorIconModal onSelectIcon={handleIconSelect} />);
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
              <label htmlFor="firstName">Imię</label>
              <input
                type="text"
                placeholder="Dariusz"
                {...register("firstName", {
                  pattern: {
                    value: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/,
                    message: "Tylko litery",
                  },
                })}
              />
              <InputError formState={formState} errorField={"firstName"} />
            </div>
            <div>
              <label htmlFor="lastName">Nazwisko</label>
              <input
                placeholder="Adamek"
                {...register("lastName", {
                  pattern: {
                    value: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/,
                    message: "Tylko litery",
                  },
                })}
              />
              <InputError formState={formState} errorField={"lastName"} />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="city">Miasto</label>
              <input
                type="text"
                placeholder="Warszawa"
                {...register("city", {
                  pattern: {
                    value: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/,
                    message: "Tylko litery",
                  },
                })}
              />
              <InputError formState={formState} errorField={"city"} />
            </div>
            <div>
              <label htmlFor="postCode">Kod posztowy</label>
              <input
                type="text"
                placeholder="61232"
                {...register("postCode", {
                  pattern: {
                    value: /^\d{5}$/,
                    message: "Nieprawidłowy format kodu pocztowego (np. 61232)",
                  },
                  maxLength: {
                    value: 5,
                    message: "Maksymalnie 5 znaków",
                  },
                })}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 5);
                }}
              />
              <InputError formState={formState} errorField={"postCode"} />
            </div>
          </div>
          <div className={styles.fullRow}>
            <div>
              <label htmlFor="street">Ulica</label>
              <input
                type="text"
                placeholder="Ul.Kutrzeby"
                {...register("street", {
                  pattern: {
                    value: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s.]+$/,
                    message: "Tylko litery",
                  },
                })}
              />
              <InputError formState={formState} errorField={"street"} />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="house">Numer domu</label>
              <input type="text" placeholder="12" {...register("house")} />
              <InputError formState={formState} errorField={"house"} />
            </div>
            <div>
              <label htmlFor="flat">Mieszkanie</label>
              <input type="text" placeholder="1a" {...register("flat")} />
              <InputError formState={formState} errorField={"flat"} />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="birthDate">Data urodzenia</label>
              <input type="date" {...register("birthDate", {})} />
              <InputError formState={formState} errorField={"birthDate"} />
            </div>
            <div>
              <label htmlFor="pesel">Pesel</label>
              <input
                type="text"
                placeholder="12345678901"
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
                type="tel"
                placeholder="+48 123 456 789"
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
                type="email"
                id="email"
                name="email"
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
          <img src={selectedIcon || selectedImg || grey} alt="" />
        </div>
        <form
          encType="multipart/form-data"
          className={styles.formImg}
          onSubmit={handleSubmitForm}
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
                required: false,
                onChange: handleImgChange,
              })}
              id="fileUpload"
            />
            <InputError formState={imgFormState} errorField={"photo"} />
          </div>

          <div>
            <BlueBtn>Zapisz</BlueBtn>{" "}
          </div>
        </form>
        <button
          onClick={handleIconClick}
          className={styles.iconBtn}
          type="button"
        >
          Wybierz ikonę
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="content">
      <Tabs
        fullWidth
        buttons="Dane podstawowe,Dane dodatkowe,Czas pracy"
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      {activeTab === "Dane podstawowe" && settingData}

      {activeTab === "Dane dodatkowe" && (
        <AdditionalData description={user?.description} />
      )}
      {activeTab === "Czas pracy" && workTime}
      {/* {activeTab === "Wnioski" && <Conclusions />} */}
    </div>
  );
}

export default Settings;
