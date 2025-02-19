import logo from "@assets/img/logo.svg";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pageConfig } from "../../config/config";
import useStore from "../../data/store";
import styles from "./AuthPage.module.css";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";

function AuthPage() {
  const { isAuth } = useStore();
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className={styles.authPage}>
      <div className={styles.authPageContent}>
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Logo"
          className={styles.authLogo}
        />
        {location.pathname === pageConfig.login && <SignInComponent />}
        {location.pathname === pageConfig.registration && <SignUpComponent />}
      </div>
    </div>
  );
}

export default AuthPage;
