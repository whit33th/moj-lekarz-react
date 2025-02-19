import { useForm } from "react-hook-form";
import InputError from "../../../components/UI/InputError/InputError";
import styles from "../AuthPage.module.css";
import useLogin from "@hooks/AuthHooks/useLogin";
import LoadingPage from "./../../../components/UI/Loading/LoadingPage";
import logoGoogle from "@assets/img/logos_google-icon.svg";
import { Link } from "react-router-dom";

function SignInForm({ setIsForgotPassword }) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { mutate, isError, isPending } = useLogin();

  function onSubmit(data) {
    mutate(data);
  }

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signIninputBlock}>
          <div>
            <div className={styles.registServiceSignIn}>
              <Link
                to={"https://doc-web-rose.vercel.app/auth/google"}
                className={styles.registerServiceItem}
              >
                <p>Kontynuuj z Google</p>
                <img src={logoGoogle} alt="google" />
              </Link>
              {/* <a className={styles.registerServiceItem}>
                          <p>Kontynuuj z Apple</p>
                          <img src={logoApple} alt="Apple" />
                  </a> */}
            </div>

            <input
              placeholder="Email..."
              autoComplete="email"
              {...register("email", {
                required: "Email jest wymagany",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Błędny email",
                },
              })}
            />
            <InputError errorField={"email"} formState={formState} />
          </div>
          <div>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Hasło..."
              {...register("password", {
                required: "Hasło jest wymagane",
                minLength: {
                  value: 9,
                  message: "Hasło musi mieć co najmniej 9 znaków",
                },
              })}
            />
            <InputError errorField={"password"} formState={formState} />
          </div>
        </div>
        {isError && (
          <p className={styles.error}>
            Nie udało się zalogować. Spróbuj ponownie.
          </p>
        )}
        <div className={styles.signInbtnBlock}>
          <a
            className={styles.forgotPassword}
            onClick={() => setIsForgotPassword(true)}
          >
            Nie pamiętam hasła
          </a>
          <button type="submit">Zaloguj się</button>
        </div>
      </form>
    </>
  );
}

export default SignInForm;
