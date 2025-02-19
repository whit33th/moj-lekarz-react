import { useState } from "react";
import { NavLink } from "react-router-dom";
import { pageConfig } from "../../config/config";
import styles from "./AuthPage.module.css";
import ForgotPasswordForm from "./Forms/ForgotPasswordForm";
import SignInForm from "./Forms/SignInForm";

function SignInComponent() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <h1>Zaloguj się, aby rozpocząć</h1>
        {!isForgotPassword ? (
          <SignInForm setIsForgotPassword={setIsForgotPassword} />
        ) : (
          <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />
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
