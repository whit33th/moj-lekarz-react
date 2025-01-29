import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import logo from "@assets/img/logo.svg";
import ResetPasswordComponent from "./Components/ResetPasswordComponent";
import useStore from "../../data/store";
import { useEffect } from "react";

function ResetPassword() {
  const { isAuth } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  return (
    <div className={styles.authPage}>
      <div className={styles.authPageContent}>
        <img onClick={() => navigate("/")} src={logo} alt="Logo" className={styles.authLogo} />
        <ResetPasswordComponent />
      </div>
    </div>
  );
}

export default ResetPassword;
