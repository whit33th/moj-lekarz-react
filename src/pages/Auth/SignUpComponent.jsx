import logoGoogle from "@assets/img/logos_google-icon.svg"
import logoApple from "@assets/img/Group.svg"
import InputError from "../../components/UI/InputError/InputError"
import { useForm } from "react-hook-form"
import styles from "./AuthPage.module.css"
import { NavLink } from "react-router-dom"

import useRegistration from "@hooks/AuthHooks/useRegistration"
import { pageConfig } from '../../config/config'

function SignUpComponent() {
  const { register, handleSubmit, formState, watch } = useForm({
    mode: "onChange",
  })
  const password = watch("password")
  const checkbox = watch("checkbox")

  const { mutate, isLoading, isError, isSuccess, error } = useRegistration()

  const onSubmit = (data) => {

    mutate(data)
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Załóż konto</h1>
          <div className={styles.registService}>
            <a className={styles.registerServiceItem}>
              <p>Kontynuuj z Google</p>
              <img src={logoGoogle} alt="google" />
            </a>
            {/* <a className={styles.registerServiceItem}>
              <p>Kontynuuj z Apple</p>
              <img src={logoApple} alt="Apple" />
            </a> */}
          </div>
          <div className={styles.lub}>
            <p>lub</p>
          </div>
          <div className={styles.signIninputBlock}>
            <div>
              <input
                name="email"
                autoComplete="email"
                placeholder="Wpisz swój email..."
                {...register("email", {
                  required: "Email jest wymagany",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Błędny email",
                  },
                })}
              />
              <InputError formState={formState} errorField={"email"} />
            </div>
            <div>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Hasło..."
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Hasło musi mieć co najmniej 8 znaków",
                  },
                })}
              />
              <InputError formState={formState} errorField={"password"} />
            </div>
            <div>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Powtórz swoje hasło"
                {...register("confirmPassword", {
                  minLength: {
                    value: 8,
                    message: "Hasła muszą być identyczne",
                  },
                  validate: (value) =>
                    value === password || "Hasła muszą być identyczne",
                })}
              />
              <InputError
                formState={formState}
                errorField={"confirmPassword"}
              />
            </div>
          </div>
          <div className={styles.checkboxBlock}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                {...register("checkbox", {
                  required: "Pole wyboru jest wymagane",
                })}
              />
              <span
                className={`${styles.checkmark} ${checkbox ? styles.checked : ""
                  } ${formState.errors["checkbox"]?.message ? styles.required : ""
                  }`}
              ></span>
              <p>
                Zgadzam się na przetwarzanie moich danych medycznych w celu
                korzystania z usług przez MyLekarz.
                <br />
                <NavLink to={pageConfig.patient.policy.privacy}>
                  Dowiedz się więcej &#8594;
                </NavLink>
              </p>
            </label>
          </div>

          <div className={styles.registBtnBlock}>
            <button onClick={() => { }}>Zarejestruj się</button>
          </div>
          {/* {isError && <p className={styles.error}>Błąd: {error.message}</p>}
          {isSuccess && <p className={styles.success}>Rejestracja udana!</p>} */}
        </form>
      </div>
    </div>
  )
}

export default SignUpComponent
