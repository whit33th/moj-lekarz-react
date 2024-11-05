import React, { useState } from 'react'
import styles from './style/SearchClinicPage.module.css'
import ClinicCard from './ClinicCard'
import { useSelector } from 'react-redux';



const arraySelectOptions = {
    select1: ['name ', 'name ', 'name',],
    select2: ['ortoped 1', 'logoped', 'Kardiolog', 'Ginekolog'],
    select3: ['Poznań', 'Tokyo', 'Ala',],
    select4: ['Tokyo', 'USA', 'Ala',],
}

function SearchClinicPage() {
  const clinicCard = useSelector((state) => state.some.clinicCard);


    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const [selectedOption3, setSelectedOption3] = useState("");
    const [selectedOption4, setSelectedOption4] = useState("");

    const [selectedDate, setSelectedDate] = useState(null);
    const [state, setState] = useState(clinicCard)

    const handleOptionClick = (option, setSelectedOption, setIsOpen) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleDropdown = (isOpen, setIsOpen) => {
        setIsOpen(!isOpen);
    };


    const clickFilterBtn = () => {
        const filteredDoctors = clinicCard.filter(doctor => {
            const matchesName = selectedOption1 ? doctor.name === selectedOption1 : true;
            const matchesTypes = selectedOption2 ? doctor.types.some(type => selectedOption2.includes(type)) : true;
            const matchesCity = selectedOption3 ? doctor.address.city === selectedOption3 : true;
            console.log(doctor.types.includes(selectedOption1))
            // const matchesDate = selectedDate ? doctor.dates.some(dateObj => dateObj.date === selectedDate.toLocaleDateString('pl-PL')) : true;
            // Добавьте условия для фильтрации по остальным селекторам
            return matchesCity && matchesName && matchesTypes;
        });
        setState(filteredDoctors)
    }
    return (
        <div className={styles.clinickPage}>
            <h1>Wybierz spośród 5 324 dostępnych centrów medycznych</h1>
            <div className={styles.filterBlockContentSelects}>
                <div className={styles.mainFormIntupsBlock}>
                    <div className={styles.dropdownContainer}>
                        <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen1, setIsOpen1)}>
                            {selectedOption1 || "Wybierz  centrum medyczny "}
                            <span className={styles.arrow}></span>
                        </div>
                        {isOpen1 && (
                            <ul className={styles.dropdownMenu}>
                                {arraySelectOptions.select1.map(elem => (
                                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick(elem, setSelectedOption1, setIsOpen1)}>
                                        {elem}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className={styles.dropdownContainer}>
                        <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen2, setIsOpen2)}>
                            {selectedOption2 || "Wybierz specjalizacje "}
                            <span className={styles.arrow}></span>
                        </div>
                        {isOpen2 && (
                            <ul className={styles.dropdownMenu}>
                                {arraySelectOptions.select2.map(elem => (
                                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick(elem, setSelectedOption2, setIsOpen2)}>
                                        {elem}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>



                    <div className={`${styles.dropdownContainer} ${styles.litle}`}>
                        <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen3, setIsOpen3)}>
                            {selectedOption3 || "Wybierz miasto"}
                            <span className={styles.arrow}></span>
                        </div>
                        {isOpen3 && (
                            <ul className={styles.dropdownMenu}>
                                {arraySelectOptions.select3.map(elem => (
                                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick(elem, setSelectedOption3, setIsOpen3)}>
                                        {elem}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className={`${styles.dropdownContainer} ${styles.litle}`}>
                        <div className={styles.dropdown} onClick={() => toggleDropdown(isOpen4, setIsOpen4)}>
                            {selectedOption4 || "Rodzaj wizyty"}
                            <span className={styles.arrow}></span>
                        </div>
                        {isOpen4 && (
                            <ul className={styles.dropdownMenu}>
                                {arraySelectOptions.select4.map(elem => (
                                    <li className={styles.dropdownMenuItem} onClick={() => handleOptionClick(elem, setSelectedOption4, setIsOpen4)}>
                                        {elem}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className={styles.filterBtnBlock}>
                        <button onClick={clickFilterBtn}>Szukaj terminu</button>
                    </div>
                </div>

            </div>
            <div className={styles.clinicCardsBlock}>
                {
                    state.map(item => <ClinicCard state={item}/>)
                }
                
            </div>
            {
                    state.length == 0 && <div className={styles.nonCinicCardBlock}><h1>Brak dostępnych placówek medycznych</h1></div> 
                }
        </div>
    )
}

export default SearchClinicPage;