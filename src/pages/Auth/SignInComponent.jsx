import React, { useState } from "react";
import styles from "./AuthPage.module.css";
import img1 from "../../assets/img/Vector13.svg";
import { NavLink } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function SignInComponent(props) {
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  console.log(props);

  const btnClick = () => {
    const formData = {
      login: inputLogin,
      password: inputPassword,
    };
    props.authSignFc(inputLogin, inputPassword);
  };

  const auth = useAuthUser();

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <h1>Zaloguj się, aby rozpocząć</h1>
        {!isForgotPassword ? (
          <div className={styles.inputsBtnBlock}>
            <div className={styles.signIninputBlock}>
              <input
                type="text"
                name="login"
                placeholder="Login..."
                value={inputLogin}
                onChange={(e) => setInputLogin(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Hasło..."
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
            </div>
            <div className={styles.signInbtnBlock}>
              <a onClick={() => setIsForgotPassword(true)}>
                <img src={img1} alt="Forgot Password" />
                Nie pamiętam hasła
              </a>
              <button onClick={btnClick}>Zaloguj się</button>
            </div>
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
            Nie masz konta? <NavLink to="/Auth/Signup">Zarejestruj się</NavLink>{" "}
          </p>
        </div>
      )}
    </div>
  );
}

export default SignInComponent;
