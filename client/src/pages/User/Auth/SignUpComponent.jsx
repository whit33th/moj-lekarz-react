import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import img1 from '../../assets/Vector13.svg';
import { NavLink } from 'react-router-dom';
import { sendAuthData } from '../../services/apiService';
import logoGoogle from '../../assets/logos_google-icon.svg';
import logoApple from '../../assets/Group.svg';

function SignUpComponent(props) {
    const [emailValue, setEmailValue] = useState('');
    const [repeatEmailValue, setRepeatEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const btnClick = () => {
        const formData = {
            emailValue: emailValue,
            repeatEmailValue: repeatEmailValue,
            passwordValue: passwordValue,
        };
        props.authRegistrFc(emailValue, repeatEmailValue , passwordValue , isChecked);

        // sendAuthData(formData) // запрос к серверу 
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.signIn}>
            <div className={styles.signInContent}>
                <h1>Załóż konto</h1>
                <div className={styles.registService}>
                    <a className={styles.registerServiceItem}>
                        <p>Kontynuuj z Google</p>
                        <img src={logoGoogle} alt="google" />
                    </a>
                    <a className={styles.registerServiceItem}>
                        <p>Kontynuuj z Apple</p>
                        <img src={logoApple} alt="Apple" />
                    </a>
                </div>
                <div className={styles.lub}>
                    <p>lub</p>
                </div>
                <div className={styles.signIninputBlock}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Wpisz swój email..."
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <input
                        type="email"
                        name="emailrepeat"
                        placeholder="Powtórz swój email..."
                        value={repeatEmailValue}
                        onChange={(e) => setRepeatEmailValue(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Hasło..."
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                </div>
                <div className={styles.checkboxBlock}>
                    <label className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <span className={`${styles.checkmark} ${isChecked ? styles.checked : ''}`}></span>
                        <p>Zgadzam się na przetwarzanie moich danych medycznych w celu korzystania z usług przez MyLekarz.
                            <br />
                            <NavLink to="/policy/privacy">Dowiedz się więcej &#8594;</NavLink>
                        </p>
                    </label>
                </div>
                <div className={styles.registBtnBlock}>
                    <button onClick={btnClick} >Zarejestruj się</button>
                </div>
            </div>
            
        </div>
    );
}

export default SignUpComponent;