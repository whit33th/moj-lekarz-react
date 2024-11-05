import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ZapisPage.module.css';
import imgName from '../../../assets/simple-line-i.svg';
import imgType from '../../../assets/Vector14.svg';
import phoneImg from '../../../assets/ph_phone-light.svg';

const arraySelectOptions = {
  select1: ['Konsultacja ginekologiczna • 290,00 zł', 'Konsultacja ginekologiczna • 2090,00 zł', 'Konsultacja ginekologiczna • 2900,00 zł'],
  select2: ['Prywatna', 'Tokyo', 'NYC'],
};

function ZapisPage(props) {
  
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [data, setData] = useState(props.data);

  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1); // Переход на предыдущую страницу в истории
  };
  const doctorInfo = data.allData || {};

  

  const handleOptionClick = (option, setSelectedOption, setIsOpen) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = (isOpen, setIsOpen) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.zapisPage}>
      <div className={styles.zapisPageLeft}>
        <div className={styles.zapisPageLeftTimeBlock}>
          <p>{data.date}</p>
          <p className={styles.zapisPageLeftTimeText}>{data.time} - {props.endTime}</p>
        </div>
        <div className={styles.zapisPageLeftNameBlock}>
          <img src={imgType} alt="Doctor" />
          <div>
            <p>{doctorInfo.name}</p>
            <p className={styles.zapisPageLeftType}>{doctorInfo.type}</p>
          </div>
        </div>
        <div className={styles.zapisPageLeftAddressBlock}>
          <img src={imgName} alt="Location" />
          <div>
            <p>{doctorInfo.medCenterInfo.name}</p>
            <p className={styles.zapisPageLeftCity}>{doctorInfo.medCenterInfo.address}</p>
          </div>
          <div className={styles.zapisPageLeftAddressBlockBtnPhone}>
            <a href={`tel:+${doctorInfo.medCenterInfo.phone}`}><img src={phoneImg} alt="Phone" />{doctorInfo.medCenterInfo.phone}</a>
          </div>
        </div>
      </div>
      <div className={styles.zapisPageRight}>
        <h1>Wybierz opcje wizyty</h1>
        <div className={styles.zapisPagePriceBlock}>
          <p>Typ wizyty</p>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen1, setIsOpen1)}>
              {props.typWizyty || "Konsultacja ginekologiczna • 290,00 zł "}
              <span className={styles.arrow}></span>
            </div>
            {isOpen1 && (
              <ul className={styles.dropdownMenu}>
                {arraySelectOptions.select1.map(elem => (
                  <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick(elem, props.setTypWizyty, setIsOpen1)} key={elem}>
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
              {props.rodzajWizyty || "Prywatna"}
              <span className={styles.arrow}></span>
            </div>
            {isOpen2 && (
              <ul className={styles.dropdownMenu}>
                {arraySelectOptions.select2.map(elem => (
                  <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick(elem, props.setRodzajWizyty, setIsOpen2)} key={elem}>
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
            <label><input type="radio" name="choice" checked={props.selectedRadio === 'Tak'} onChange={() => props.setSelectedRadio('Tak')} />Tak</label>
            <label><input type="radio" name="choice" checked={props.selectedRadio === 'Nie'} onChange={() => props.setSelectedRadio('Nie')} />Nie</label>
          </div>
        </div>
        <div className={styles.btnBlock}>
          <button className={styles.btnBlockBack} onClick={handleGoBack}>Anuluj</button>
          <button onClick={()=>props.changeActivePage('ZapisFormPage')}>Kontynuj</button>
        </div>
      </div>
    </div>
  );
}

export default ZapisPage;