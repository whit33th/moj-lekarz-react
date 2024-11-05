import  { useState } from "react";
import styles from "./AuthPage.module.css";
import img1 from "../../assets/img/Vector13.svg";
import { NavLink } from "react-router-dom";
// import { sendAuthData } from '../../services/apiService';

function SignInComponent() {
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const btnClick = () => {
    const formData = {
      login: inputLogin,
      password: inputPassword,
    };
    // sendAuthData(formData) // запрос к серверу
  };

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
                {" "}
                <img src={img1} /> Nie pamiętam hasła
              </a>
              <button>Zaloguj się</button>
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
          <NavLink to="signup">
            <p>Nie masz konta?</p>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default SignInComponent;
