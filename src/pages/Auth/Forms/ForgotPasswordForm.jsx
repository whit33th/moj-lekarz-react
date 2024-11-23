import { useForm } from "react-hook-form";
import InputError from "../../../components/UI/InputError/InputError";
import styles from "../AuthPage.module.css";
function ForgotPasswordForm({ setIsForgotPassword }) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    console.log("Password Reset Data: ", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Wpisz email, aby resetować hasło</p>
      <div className={styles.forgotPassword}>
        <input
          type="email"
          placeholder="Email..."
          {...register("email-reset", {
            required: "Email jest wymagany",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Błędny email",
            },
          })}
        />
        <InputError formState={formState} errorField={"email-reset"} />
      </div>

      <div className={styles.forgotPasswordBtnBlock}>
        <button
          type="button"
          className={styles.forgotPasswordBtnBlockBackbtn}
          onClick={() => setIsForgotPassword(false)}
        >
          Anuluj
        </button>
        <button type="submit">Resetuj</button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
