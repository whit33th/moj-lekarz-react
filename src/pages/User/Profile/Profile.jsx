import { useState } from "react";
import styles from "./Profile.module.css";
import ProfileInfoBlock from "./ProfileInfoBlock";
import doctorImg from "@assets/img/foto (1).png";
import useStore from "../../../data/store";
import { useForm } from "react-hook-form";
import InputError from "../../../components/UI/InputError/InputError";
import useChangePassword from "../../../api/hooks/UserHooks/useChangePassword";


function Profile() {
  const { profileState } = useStore();
  const { register, handleSubmit, formState, watch } = useForm({
    mode: "onChange",
  });

  const { mutate } = useChangePassword();

  const onSubmit = (data) => {
    if (data.newPassword === data.repeatNewPassword) {
      mutate(data);
    }
  };

  return (
    <div className={styles.profilePage}>
      <ProfileInfoBlock data={profileState} />
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
                  value: /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                  message: "Nieprawidłowy format hasła"
                }
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
                  value: 8,
                  message: "Hasło musi mieć co najmniej 8 znaków",
                },
                pattern: {
                  value: /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                  message: "Nieprawidłowy format hasła"
                }
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
                  value: /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                  message: "Nieprawidłowy format hasła"
                }
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
