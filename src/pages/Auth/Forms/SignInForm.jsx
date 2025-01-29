import { useForm } from "react-hook-form";
import InputError from "../../../components/UI/InputError/InputError";
import styles from "../AuthPage.module.css";
import useLogin from "@hooks/AuthHooks/useLogin";
import LoadingPage from "./../../../components/UI/Loading/LoadingPage";
import logoGoogle from "@assets/img/logos_google-icon.svg";
import { Link } from "react-router-dom";
// import useGoogle from "../../../api/hooks/AuthHooks/useGoogle";

function SignInForm({ setIsForgotPassword }) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { mutate, role, error, isError, isSuccess, isPending } = useLogin();
  // const { handleGoogleLogin } = useGoogle();

  function onSubmit(data) {
    mutate(data);
  }

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <>
      {/* <button onClick={handleGoogleLogin} className={styles.googleButton}>
        Войти через Google
      </button> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signIninputBlock}>
          <div>
            <div className={styles.registService}>
              <Link to={'https://doc-web-rose.vercel.app/auth/google'} className={styles.registerServiceItem}>
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
                  value: 8,
                  message: "Hasło musi mieć co najmniej 8 znaków",
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
