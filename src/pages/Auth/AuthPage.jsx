import { useLocation, useNavigate } from "react-router-dom"
import styles from "./AuthPage.module.css"
import logo from "../../assets/img/logo.svg"
import SignInComponent from "./SignInComponent"
import SignUpComponent from "./SignUpComponent"
import { pageConfig } from "../../config/config"

function AuthPage() {

  const location = useLocation()

  const navigate = useNavigate()
  return (
    <div className={styles.authPage}>
      <div className={styles.authPageContent}>
        <img onClick={() => navigate("/")} src={logo} alt="Logo" className={styles.authLogo} />
        {location.pathname === pageConfig.login && <SignInComponent />}
        {location.pathname === pageConfig.registration && <SignUpComponent />}
      </div>
    </div>
  )
}

export default AuthPage
