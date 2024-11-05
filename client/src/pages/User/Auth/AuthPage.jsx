import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';
import logo from '../../assets/logo.svg';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';

function AuthPage(props) {
    const navigate = useNavigate(); 
    
    const authSignFc = (login, pass) => {
        if (login.length > 2 && pass.length > 2) {
            console.log('Authentication successful');
            props.setIsLoggedIn(true);
            navigate('/profile'); // перенаправление 
        } else {
            console.log('Authentication failed');
        }
    };
    const authRegistrFc = (email, repeatEmail,  password , isChecked)=>{
        if (email.length > 2 && password.length > 2) {
            console.log('Authentication successful');
            props.setIsLoggedIn(true);
            navigate('/profile'); // перенаправление 
        } else {
            console.log('Authentication failed');
        }
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.authPageContent}>
                <img src={logo} alt="Logo" className={styles.authLogo} />
                <Routes>
                    <Route path="/" element={<SignInComponent authSignFc={authSignFc} />} />
                    <Route path="signin" element={<SignInComponent authSignFc={authSignFc} />} /> 
                    <Route path="signup" element={<SignUpComponent authRegistrFc={authRegistrFc} />} /> 
                </Routes>
            </div>
        </div>
    );
}

export default AuthPage;