import { useState } from "react";
import styles from "./AuthPage.module.css";
import img1 from "../../assets/img/Vector13.svg";
import { NavLink } from "react-router-dom";
import { pageConfig } from "../../config/config";
import { useForm } from "react-hook-form";
import InputError from "../../components/UI/InputError/InputError";

function SignInComponent(props) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    console.log(data["email"]);
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <h1>Zaloguj się, aby rozpocząć</h1>
        {!isForgotPassword ? (
          <div className={styles.inputsBtnBlock}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.signIninputBlock}>
                <div>
                  <input
                    name="login"
                    placeholder="Login..."
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Wrong email",
                      },
                    })}
                  />
                  <InputError errorField={"email"} formState={formState} />
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Hasło..."
                    {...register("password", {
                      required: "This field is required.",
                      minLength: {
                        value: 8,
                        message: "Password too short.",
                      },
                    })}
                  />
                  <InputError errorField={"password"} formState={formState} />
                </div>
              </div>
              <div className={styles.signInbtnBlock}>
                <a onClick={() => setIsForgotPassword(true)}>
                  <img src={img1} alt="Forgot Password" />
                  Nie pamiętam hasła
                </a>
                <button onClick={() => {}}>Zaloguj się</button>
              </div>
            </form>
          </div>
        ) : (
          <div className={styles.forgotPassword}>
            <p>Wpisz email, aby resetować hasło</p>
            <input
              type="email"
              name="email"
              placeholder="Email..."
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <div className={styles.forgotPasswordBtnBlock}>
              <button
                className={styles.forgotPasswordBtnBlockBackbtn}
                onClick={() => setIsForgotPassword(false)}
              >
                Anuluj
              </button>
              <button>Resetuj</button>
            </div>
          </div>
        )}
      </div>
      {!isForgotPassword && (
        <div className={styles.bottomLinkBlock}>
          <p>
            Nie masz konta?{" "}
            <NavLink to={pageConfig.registration}>Zarejestruj się</NavLink>
          </p>
        </div>
      )}
    </div>
  );
}

export default SignInComponent;
