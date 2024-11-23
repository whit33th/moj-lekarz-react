import { useForm } from "react-hook-form";
import InputError from "../../../components/UI/InputError/InputError";
import styles from "../AuthPage.module.css";

import useLogin from "../../../hooks/AuthHooks/useLogin";

import useStore from "../../../data/store";
function SignInForm({ setIsForgotPassword }) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { mutate, role, error, isError, isSuccess, isPending } = useLogin();

  
  function onSubmit(data) {
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.signIninputBlock}>
        <div>
          <input
            placeholder="Email..."
            autoComplete="email"
            {...register("email", {
              required: "Email jest wymagany",
              // pattern: {
              //   value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              //   message: "Błędny email",
              // },
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
              // minLength: {
              //   value: 8,
              //   message: "Hasło musi mieć co najmniej 8 znaków",
              // },
            })}
          />
          <InputError errorField={"password"} formState={formState} />
        </div>
      </div>
      <div className={styles.signInbtnBlock}>
        <a onClick={() => setIsForgotPassword(true)}>Nie pamiętam hasła</a>
        <button type="submit">Zaloguj się</button>
      </div>
    </form>
  );
}

export default SignInForm;
