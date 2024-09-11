import { Routes, Route } from 'react-router-dom';
import styles from './AuthPage.module.css'
import logo from '../../assets/img/logo.svg';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';



function AuthPage() {
    return (
        <div className={styles.authPage}>
            <div className={styles.authPageContent}>
                <img src={logo} alt="Logo" className={styles.authLogo} />
                <Routes>
                    <Route path="/" element={<SignInComponent />} /> 
                    <Route path="/signin" element={<SignInComponent />} /> 
                    <Route path="/signup" element={<SignUpComponent />} /> 
                </Routes>
            </div>
        </div>
    )
}

export default AuthPage;
