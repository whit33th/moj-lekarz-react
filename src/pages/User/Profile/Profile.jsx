import { useState } from "react";
import styles from "./Profile.module.css";
import ProfileInfoBlock from "./ProfileInfoBlock";

import grey from "@assets/img/grey.png";
import usePostUpdateImg from "@hooks/UserHooks/usePostUpdateImg";
import { useForm } from "react-hook-form";
import useChangePassword from "../../../api/hooks/UserHooks/useChangePassword";
import useDeleteAccount from "../../../api/hooks/UserHooks/useDeleteAccount";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import DeleteAccountModal from "../../../components/Modals/DeleteAccountModal/DeleteAccountModal";
import InputError from "../../../components/UI/InputError/InputError";
import useStore from "../../../data/store";

function Profile() {
  const { profileState } = useStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [fileForUpload, setFileForUpload] = useState(null);
  const [modalWindowStatus, setModalWindowStatus] = useState(false);
  const { register, handleSubmit, formState, watch } = useForm({
    mode: "onChange",
  });

  const { mutate: deleteAccount } = useDeleteAccount();

  const { mutate } = useChangePassword();
  const { mutate: uploadImage } = usePostUpdateImg();

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    setFileForUpload(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedImg(objectUrl);

      const formData = new FormData();
      formData.set("image", file);
      uploadImage(formData);
    }
  };

  const handleDeleteAccount = () => {
    setModalWindowStatus(true);
  };

  const deleteFc = () => {
    deleteAccount();
    console.log("Account deleted");
    setModalWindowStatus(false);
  };

  const onSubmit = (data) => {
    if (data.newPassword === data.repeatNewPassword) {
      mutate(data);
    }
  };

  return (
    <div className={styles.profilePage}>
      <DeleteAccountModal
        modalWindowStatus={modalWindowStatus}
        setModalWindowStatus={setModalWindowStatus}
        deleteFc={deleteFc}
      />
      <ProfileInfoBlock
        data={profileState}
        selectedImg={selectedImg || profileState?.photo || grey}
        onImageChange={handleImgChange}
      />
      <form className={styles.passwordBlock} onSubmit={handleSubmit(onSubmit)}>
        <h1>Zmiana hasła</h1>
        <div className={styles.passwordBlockContent}>
          <div>
            <p>Stare hasło</p>
            <input
              type="password"
              placeholder="Wpisz stare hasło"
              {...register("oldPassword", {
                required: "To pole jest wymagane",
                pattern: {
                  value:
                    /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                  message: "Nieprawidłowy format hasła",
                },
              })}
            />
            <InputError formState={formState} errorField={"oldPassword"} />
          </div>
          <div>
            <p>Nowe hasło</p>
            <input
              type="password"
              placeholder="Wpisz nowe hasło"
              {...register("newPassword", {
                required: "To pole jest wymagane",
                minLength: {
                  value: 9,
                  message: "Hasło musi mieć co najmniej 9 znaków",
                },
                pattern: {
                  value:
                    /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                  message: "Nieprawidłowy format hasła",
                },
              })}
            />

            <InputError formState={formState} errorField={"newPassword"} />
          </div>
          <div>
            <p>Powtórz nowe hasło</p>
            <input
              type="password"
              placeholder="Powtórz nowe hasło"
              {...register("repeatNewPassword", {
                required: "To pole jest wymagane",
                validate: (value) =>
                  value === watch("newPassword") || "Hasła nie są takie same",
                pattern: {
                  value:
                    /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                  message: "Nieprawidłowy format hasła",
                },
              })}
            />
            <InputError
              formState={formState}
              errorField={"repeatNewPassword"}
            />
          </div>
          <button type="submit"> Zmień hasło</button>
        </div>
      </form>
      <div className={styles.deleteAccountBlock}>
        <BlueBtn cb={handleDeleteAccount}>Usuń konto</BlueBtn>
      </div>

      {/* <div className={styles.visitsBlock}>
        <h1>Najbliższe wizyty</h1>
        <div className={styles.visitsList}>
          {dataVisitsList.map((item) => (
            <div className={styles.visitsListItem} key={item.id}>
              <div className={styles.visitsListItemName}>
                <div>
                  <img src={item.doctorImg} />
                </div>
                <div>
                  <h3>{item.doctorName} </h3>
                  <p>{item.doctorType}</p>
                </div>
              </div>
              <div className={styles.visitsListItemAddress}>
                <p>{item.address}</p>
              </div>
              <div className={styles.visitsListItemDate}>
                <p>{item.date}</p>
              </div>
              <div className={styles.visitsListItemId}>
                <span>{item.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
export default Profile;
