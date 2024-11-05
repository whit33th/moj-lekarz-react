import React, { useState } from 'react'
import styles from './style/ClinicZapisPage.module.css'
import BookingComponent from '../components/BookingComponent';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const arraySelectOptions = {
    select1: ['Konsultacja ginekologiczna • 290,00 zł', 'Konsultacja ginekologiczna • 2090,00 zł', 'Konsultacja ginekologiczna • 2900,00 zł'],
    select2: ['Prywatna', 'Tokyo', 'NYC'],
  };
function ClinicZapisPage() {
  const { id } = useParams();

    
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [timeValue , setTimeValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const [typWizyty , setTypWizyty] = useState('')
  const [rodzajWizyty , setRodzajWizyty] = useState('')
  const [selectedRadio , setSelectedRadio] = useState('')

  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1); // Переход на предыдущую страницу в истории
  };


  const handleOptionClick = (option, setSelectedOption, setIsOpen) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = (isOpen, setIsOpen) => {
    setIsOpen(!isOpen);
  };
  const zapisClickBtn = ()=>{
    if(timeValue.length > 2){
      const newState = {
        id: id,
        date:dateValue,
        time:timeValue,
        typWizyty :typWizyty,
        rodzajWizyty: rodzajWizyty
      };
      localStorage.setItem('zapisStateClinic', JSON.stringify(newState));
    }
    navigate(`/znajdz-lekarza/zapis/${id}`);
  }
  return (
    <div className={styles.clinicZapisPage}>
      <div className={styles.leftBlock}>
        <h1>Wybierz termin</h1>
        <BookingComponent setTimeValue={setTimeValue} setDateValue={setDateValue}/>
      </div>
      <div className={styles.zapisPageRight}>
        <h1>Wybierz opcje wizyty</h1>
        <div className={styles.zapisPagePriceBlock}>
          <p>Typ wizyty</p>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen1, setIsOpen1)}>
              {typWizyty || "Konsultacja ginekologiczna • 290,00 zł "}
              <span className={styles.arrow}></span>
            </div>
            {isOpen1 && (
              <ul className={styles.dropdownMenu}>
                {arraySelectOptions.select1.map(elem => (
                  <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick(elem, setTypWizyty, setIsOpen1)} key={elem}>
                    {elem}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.zapisPagePriceBlock}>
          <p>Rodzaj wizyty</p>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen2, setIsOpen2)}>
              {rodzajWizyty || "Prywatna"}
              <span className={styles.arrow}></span>
            </div>
            {isOpen2 && (
              <ul className={styles.dropdownMenu}>
                {arraySelectOptions.select2.map(elem => (
                  <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick(elem, setRodzajWizyty, setIsOpen2)} key={elem}>
                    {elem}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.choiceBlock}>
          <p>Czy to Twoja pierwsza wizyta u tego specjalisty?</p>
          <div>
            <label><input type="radio" name="choice" checked={selectedRadio === 'Tak'} onChange={() => setSelectedRadio('Tak')} />Tak</label>
            <label><input type="radio" name="choice" checked={selectedRadio === 'Nie'} onChange={() => setSelectedRadio('Nie')} />Nie</label>
          </div>
        </div>
        <div className={styles.btnBlock}>
          <button className={styles.btnBlockBack} onClick={handleGoBack}>Anuluj</button>
          <button onClick={zapisClickBtn}>Kontynuj</button>
        </div>
      </div>

    </div>
  )
}
export default  ClinicZapisPage;
