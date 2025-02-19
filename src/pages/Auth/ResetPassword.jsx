import logo from "@assets/img/logo.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../data/store";
import useLogout from "./../../api/hooks/AuthHooks/useLogout";
import styles from "./AuthPage.module.css";
import ResetPasswordComponent from "./Components/ResetPasswordComponent";

function ResetPassword() {
  const { isAuth } = useStore();
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      logout();
    }
  }, [isAuth, logout]);

  return (
    <div className={styles.authPage}>
      <div className={styles.authPageContent}>
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Logo"
          className={styles.authLogo}
        />
        <ResetPasswordComponent />
      </div>
    </div>
  );
}

export default ResetPassword;
