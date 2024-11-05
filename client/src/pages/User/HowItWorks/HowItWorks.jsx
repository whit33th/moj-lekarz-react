import React, { useState } from 'react'
import styles from './HowItWorks.module.css';
import img1 from '../../assets/Frame1.svg'
import img2 from '../../assets/Frame2.svg'
import img3 from '../../assets/Frame3.svg'
import arrow from '../../assets/arrowmain.svg'
import SwiperSlider from '../../components/SwiperSlider';



 function HowItWorks() {
    
    const [nameInputValue, setNameInputValue] = useState();
    const [emailInputValue, setEmailInputValue] = useState();
    const [phoneInputValue, setPhoneInputValue] = useState();
    const [textareaInputValue, setTextareaInputValue] = useState();
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
    return (
    <div className={styles.howItWorks}>
        <div className={styles.descriptions}>
            <h1>Jak to działą?</h1>
            <div className={styles.descriptionsText}>
                <p>Serwis łączący w sobie wyszukiwarkę lekarzy z pełnym dostępem do Twoich danych medycznych. Internetowe konto pacjenta, dzięki któremu masz dostęp do wszystkich swoich danych medycznych.Umów wizytę, otrzymaj e-receptę lub e-zwolnienie bez wychodzenia z domu.</p>
            </div>
            <button><a href="#">Załóż konto</a> </button>
        </div>

        <div className={styles.howItWorksImageBlock}>
            <div className={styles.imagesBlockItem}>
                <div className={styles.itemImg}>
                    <img src={img1} />
                </div>
                <div className={styles.itemText}>
                    <p className={styles.itemTextTitle}>
                        Załóż konto 
                    </p>
                    <p>Utworzenie konta zapewnia dostęp do wszystkich funkcji i usług serwisu.</p>
                </div>
            </div>
            <div className={styles.arrow}>
                <img src={arrow}  />
            </div>
            <div className={styles.imagesBlockItem}>
                <div className={styles.itemImg}>
                    <img src={img2} />
                </div>
                <div className={styles.itemText}>
                    <p className={styles.itemTextTitle}>
                        Zarejestruj swoją wizytę 
                    </p>
                    <p>Wybierz dowolnego lekarza, termin i zarejestruj wizytę.</p>
                </div>
            </div>
            <div className={styles.arrow}>
                <img src={arrow}  />
            </div>
            <div className={styles.imagesBlockItem}>
                <div className={styles.itemImg}>
                    <img src={img3} />
                </div>
                <div className={styles.itemText}>
                    <p className={styles.itemTextTitle}>
                        Konsultacja 
                    </p>
                    <p>Gotowe!  Lekarz  już na Ciebie czeka.</p>
                </div>
            </div>

        </div>

        <div className={styles.slideblock}>
            <div className={styles.slideTitle}> Dlaczego MyLekarz?</div>
            <SwiperSlider />
        </div>
        <div className={styles.formBlockConteiner}>
            <div className={styles.formBlock}>
                <h1>Jesteś firmą?</h1>
                <p>Wypełnij formularz kontaktowy i zostań naszym partnerem!</p>
                <div className={styles.form}>
                    <input type="text" placeholder='Wpisz imię i nazwisko' value={nameInputValue} onChange={(e)=>setNameInputValue(e.target.value)}/>
                    <div className={styles.dropdownContainer}>
                        <div className={styles.dropdown} onClick={toggleDropdown}>
                            {selectedOption || "Kim jesteś"}
                            <span className={styles.arrow}></span>
                        </div>
                        {isOpen && (
                            <ul className={styles.dropdownMenu}>
                            <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 1")}>Option 1</li>
                            <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 2")}>Option 2</li>
                            <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 3")}>Option 3</li>
                            </ul>
                        )}
                    </div>
                    <input type="text" placeholder='Wpisz emailu' value={emailInputValue} onChange={(e)=>setEmailInputValue(e.target.value)}/>
                    <input type="text" placeholder='Wpisz numer telefonu' value={phoneInputValue} onChange={(e)=>setPhoneInputValue(e.target.value)}/>
                    <textarea name="text" placeholder='Wiadomość' value={textareaInputValue} onChange={(e)=>setTextareaInputValue(e.target.value)}></textarea>
                </div>
                <div className={styles.formBtn}>
                    <button>Wyślij</button>
                </div>
            </div>

        </div>
    </div>

    )
}
export default HowItWorks;
