import React, { useState ,useEffect } from 'react'
import styles from './style/ZhaidzLekarzaVersion2.module.css'
import DoctorCard from './ZnaidzLekarza/DoctorCard';
import { useSelector } from 'react-redux';



const arraySelectOptions = {
    select1: ['ortoped', 'logoped', 'surgeon',],
    select2: ['Poznań', 'Tokyo', 'NYC',],
    select3: ['Options 1', 'Options 2', 'Options 3',],

}


function ZhaidzLekarzaVersion2(props) {
    const doctorCard = useSelector((state) => state.some.clinicCard);

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const [selectedOption3, setSelectedOption3] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [state, setState] = useState(doctorCard)

    const [zapisState, setZapisState] = useState({
        idDoctor: undefined,
        date: undefined,
        time: undefined,
        allData: {}
    });

    useEffect(() => {
        const savedState = localStorage.getItem('zapisState');
        if (savedState) {
            setZapisState(JSON.parse(savedState));
        }
    }, []);

    const addZapis = (id, time, date, info) => {
        const newState = {
            idDoctor: id,
            date: date,
            time: time,
            allData: info
        };

        setZapisState(newState);
        localStorage.setItem('zapisState', JSON.stringify(newState));
    };

    const handleOptionClick = (option, setSelectedOption, setIsOpen) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleDropdown = (isOpen, setIsOpen) => {
        setIsOpen(!isOpen);
    };
    const clickFilterBtn = () => {
        const filteredDoctors = doctorCard.filter(doctor => {
            const matchesType = selectedOption1 ? doctor.type === selectedOption1 : true;
            const matchesCity = selectedOption2 ? doctor.address.city === selectedOption2 : true;

            const matchesDate = selectedDate ? doctor.dates.some(dateObj => dateObj.date === selectedDate.toLocaleDateString('pl-PL')) : true;
            // Добавьте условия для фильтрации по остальным селекторам
            return matchesCity && matchesType && matchesDate;
        });
        setState(filteredDoctors)
    }
    return (
        <div className={styles.zhaidzLekarza}>
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

                    <div className={styles.filterBtnBlock}>
                        <button onClick={clickFilterBtn}>Szukaj terminu</button>
                    </div>
                </div>

            </div>

            <div className={styles.doctorsCards}>
                {state.map(item => (
                    <DoctorCard data={item} key={item.id} selectedDate={selectedDate} addZapis={addZapis} />
                ))}
                {
                    state.length == 0 && <div className={styles.nonDoctorCardBlock}><h1>Brak dostępnych lekarzy</h1></div>
                }
            </div>
        </div>
    );
}

export default ZhaidzLekarzaVersion2;