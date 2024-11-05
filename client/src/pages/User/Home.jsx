import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './style/Home.module.css';
import mainImg from '../assets/Frame364.svg';
import DatePicker from 'react-datepicker';
import img1 from '../assets/Frame1.svg'
import img2 from '../assets/Frame2.svg'
import img3 from '../assets/Frame3.svg'
import arrow from '../assets/arrowmain.svg'
import SwiperSlider from '../components/SwiperSlider';
import Map from '../components/MapComponent/Map';
import AppPromo from '../components/AppPromo/AppPromo';

function Home() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleOptionClick = (option, setSelectedOption, setIsOpen) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = (isOpen, setIsOpen) => {
    setIsOpen(!isOpen);
  };

  const [mapsData, setMapsData] = useState({
    id:'path2',
    doctors: 10231,
    specializations: 123,
    locations: 25

  })

  const handlePathClick = (newData) => {
    setMapsData(newData);
  };

  return (
    <div className={styles.home}>
      <div className={styles.homeFirstBlock}>
        <div className={styles.homeFirstBlockLeft}>
          <img src={mainImg} alt="Main image" />
        </div>
        <div className={styles.homeFirstBlockRight}>
          <div className={styles.mainFormBlock}>
            <h2>Wybierz specjalizacje </h2>
            <div className={styles.mainFormIntupsBlock}>
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen1, setIsOpen1)}>
                  {selectedOption1 || "Kim jesteś"}
                  <span className={styles.arrow}></span>
                </div>
                {isOpen1 && (
                  <ul className={styles.dropdownMenu}>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 1", setSelectedOption1, setIsOpen1)}>Option 1</li>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 2", setSelectedOption1, setIsOpen1)}>Option 2</li>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 3", setSelectedOption1, setIsOpen1)}>Option 3</li>
                  </ul>
                )}
              </div>

              <div className={styles.dropdownContainer}>
                <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen2, setIsOpen2)}>
                  {selectedOption2 || "Wybierz miasto"}
                  <span className={styles.arrow}></span>
                </div>
                {isOpen2 && (
                  <ul className={styles.dropdownMenu}>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 1", setSelectedOption2, setIsOpen2)}>Option 1</li>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 2", setSelectedOption2, setIsOpen2)}>Option 2</li>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 3", setSelectedOption2, setIsOpen2)}>Option 3</li>
                  </ul>
                )}
              </div>
              
              <div className={styles.formCalendar}>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                  minDate={new Date()}
                  placeholderText="Wybierz dzień"
                />
              </div>

              <div className={`${styles.dropdownContainer} ${styles.litle}`}>
                <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen3, setIsOpen3)}>
                  {selectedOption3 || "Wybierz miasto"}
                  <span className={styles.arrow}></span>
                </div>
                {isOpen3 && (
                  <ul className={styles.dropdownMenu}>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 1", setSelectedOption3, setIsOpen3)}>Option 1</li>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 2", setSelectedOption3, setIsOpen3)}>Option 2</li>
                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick("Option 3", setSelectedOption3, setIsOpen3)}>Option 3</li>
                  </ul>
                )}
              </div>
            </div>
            <div className={styles.mainFormBtn}><button >Szukaj terminu</button></div>
            
            </div>
        </div>
      </div>

        <div className={styles.descriptions}>
            <h1>Jak to działą?</h1>
            <div className={styles.descriptionsText}>
                <p>Serwis łączący w sobie wyszukiwarkę lekarzy z pełnym dostępem do Twoich danych medycznych. Internetowe konto pacjenta, dzięki któremu masz dostęp do wszystkich swoich danych medycznych.Umów wizytę, otrzymaj e-receptę lub e-zwolnienie bez wychodzenia z domu.</p>
            </div>
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

        <div className={styles.mapBlock}>
            <Map data={mapsData} onPathClick={handlePathClick} />
        </div>

        <AppPromo />
    </div>
  );
}

export default Home;