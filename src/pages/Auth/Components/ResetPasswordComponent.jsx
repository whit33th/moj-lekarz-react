import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useResetPassword from "../../../api/hooks/AuthHooks/useResetPassword";
import InputError from "../../../components/UI/InputError/InputError";
import LoadingPage from "../../../components/UI/Loading/LoadingPage";
import styles from "../AuthPage.module.css";

function ResetPasswordComponent() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { register, handleSubmit, formState, watch } = useForm({
    mode: "onChange",
  });

  const { mutate, isError, isPending } = useResetPassword();

  function onSubmit(data) {
    const formData = {
      newPassword: data.newPassword,
      token: token,
    };
    mutate(formData);
  }

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <h1>Zresetuj hasło</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.signIninputBlock}>
            <div>
              <input
                type="password"
                placeholder="Nowe hasło..."
                autoComplete="new-password"
                {...register("newPassword", {
                  required: "Hasło jest wymagane",
                  minLength: {
                    value: 9,
                    message: "Hasło musi mieć co najmniej 9 znaków",
                  },
                })}
              />
              <InputError errorField={"newPassword"} formState={formState} />
            </div>
            <div>
              <input
                type="password"
                placeholder="Potwierdź hasło..."
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Potwierdzenie hasła jest wymagane",
                  validate: (val) => {
                    if (watch("newPassword") !== val) {
                      return "Hasła nie są takie same";
                    }
                  },
                })}
              />
              <InputError
                errorField={"confirmPassword"}
                formState={formState}
              />
            </div>
          </div>
          {isError && (
            <p className={styles.error}>
              Nie udało się zresetować hasła. Spróbuj ponownie.
            </p>
          )}
          <div className={styles.signInbtnBlock}>
            <button type="submit">Zresetuj hasło</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;
