import React, { useState, useEffect } from 'react';

import styles from './ZapisFormPage.module.css';
import imgName from '../../../assets/simple-line-i.svg';
import imgType from '../../../assets/Vector14.svg';
import phoneImg from '../../../assets/ph_phone-light.svg';
import visitorImg from '../../../assets/Vector15.svg';
import fileInputImg from '../../../assets/Vector16.svg';
import fileInputv2 from '../../../assets/tabler_file-filled.svg';
import visitorImg2 from '../../../assets/pobierz.svg';

import { NavLink } from 'react-router-dom';


function ZapisFormPage(props) {
    const [nameInput , setNameInput] = useState('');
    const [surNameInput , setSurNameInput] = useState('');
    const [phoneInput , setPhoneInput] = useState('');
    const [peselInput , setPeselInput] = useState('');
    const [textareaValue , setTextareaValue] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [data, setData] = useState(props.data);
    const [uploadedFile, setUploadedFile] = useState(null);


    const handleFileUpload = (event) => {
        
        const file = event.target.files[0];
        if (file) {
            props.handleFileUpload(event)
            setUploadedFile(file.name);
        }
    };


    const doctorInfo = data.allData || {};
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const clikcBtnAddOrder = ()=>{
        props.addZapisFc(nameInput , surNameInput , phoneInput , peselInput , uploadedFile , textareaValue)


        // props.changeActivePage('ZapisDone')
    }
    return (
        <div className={styles.zapisFormPage}>
            <h1>Informacje o wizycie</h1>
            <div className={styles.zapisPageLeft}>
                <div className={styles.zapisPageLeftTimeBlock}>
                    <p>{data.date}</p>
                    <p className={styles.zapisPageLeftTimeText}>{data.time} - {props.endTime}</p>
                </div>
                <div className={styles.infoblock}>
                    <div className={styles.infoblockNameBlock}>
                        <div className={styles.zapisPageLeftNameBlock}>
                            <img src={imgType} alt="Doctor" />
                            <div>
                                <p>{doctorInfo.name}</p>
                                <p className={styles.zapisPageLeftType}>{doctorInfo.type}</p>
                            </div>
                        </div>
                        <div className={styles.zapisPageLeftNameBlock}>
                            <img src={visitorImg} alt="Doctor" />
                            <div>
                                <p>Typ wizyty:</p>
                                <p className={styles.zapisPageLeftType}>{props.rodzajWizyty}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoblockPhoneBlock}>
                        <div className={styles.zapisPageLeftAddressBlock}>
                            <img src={imgName} alt="Location" />
                            <div>
                                <p>{doctorInfo.medCenterInfo.name}</p>
                                <p className={styles.zapisPageLeftCity}>{doctorInfo.medCenterInfo.address}</p>
                            </div>

                        </div>
                        <div className={styles.zapisPageLeftAddressBlockBtnPhone}>
                            <a href={`tel:+${doctorInfo.medCenterInfo.phone}`}><img src={phoneImg} alt="Phone" />{doctorInfo.medCenterInfo.phone}</a>
                        </div>
                    </div>

                </div>
                <div className={styles.leftBlockBottomPrice}>
                    <p>{props.typWizyty}</p>
                </div>
            </div>


            <div className={styles.formBlock}>
                <h1>Rejstracja wizytu</h1>
                <div className={styles.inputsBlock}>
                    <div className={styles.inputsBlockLeft}>
                        <div>
                            <p>Imię</p>
                            <input type="text" placeholder='Podaj swoje imię' value={nameInput} onChange={(e)=>setNameInput(e.target.value)}/>
                        </div>
                        <div>
                            <p>Nazwisko</p>
                            <input type="text" placeholder='Podaj swoje nazwisko' value={surNameInput} onChange={(e)=>setSurNameInput(e.target.value)}/>
                        </div>
                        <div>
                            <p>Telefon</p>
                            <input type="text" placeholder='Podaj numer telefonu' value={phoneInput} onChange={(e)=>setPhoneInput(e.target.value)}/>
                        </div>
                        <div>
                            <p>Pesel</p>
                            <input type="text" placeholder='Podaj numer pesel' value={peselInput} onChange={(e)=>setPeselInput(e.target.value)}/>
                        </div>

                    </div>
                    <div className={styles.inputsBlockRight}>
                        <p>Dodaj potrzebne dokumenty (opcjonalnie)</p>
                        <div className={styles.fileBlockContainer}>
                        {!uploadedFile ? (
                                <>
                                    <label htmlFor="file-upload" className={styles.uploadLabel}>
                                        <div className={styles.iconContainer}>
                                            <img src={fileInputImg} alt="Upload icon" />
                                        </div>
                                    </label>
                                    <input 
                                        id="file-upload" 
                                        type="file" 
                                        className={styles.fileInput} 
                                        onChange={handleFileUpload} 
                                    />
                                </>
                            ) : (
                                <div className={styles.uploadedFileContainer}>
                                    <div className={styles.uploadedFileIcon}>
                                        <img src={fileInputv2} alt="Uploaded file icon" />
                                    </div>
                                    <p className={styles.uploadedFileName}>{uploadedFile}</p>
                                    <div className={styles.uploadedFileActions}>
                                        <img src={visitorImg2} alt="Delete icon" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.textareaBlock}>
                <h1>Komentarz</h1>
                <textarea name="comments" placeholder='Wpisz komentarz' value={textareaValue} onChange={ (e) => setTextareaValue(e.target.value)}></textarea>
            </div>
            <div className={styles.checkboxBlock}>
                <label className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span className={`${styles.checkmark} ${isChecked ? styles.checked : ''}`}></span>
                    <p> <span>*</span> Zgadzam się, żeby MyLekarz przetwarzał moje dane medyczne w celu korzystania z usług.

                        <NavLink to="/policy/privacy">Dowiedz się więcej &#8594;</NavLink>
                    </p>
                </label>
                <label className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        checked={isChecked2}
                        onChange={() => setIsChecked2(!isChecked2)}
                    />
                    <span className={`${styles.checkmark} ${isChecked2 ? styles.checked : ''}`}></span>
                    <p>Chcę otrzymywać komunikację marketingową od ZnanyLekarz.
                        <NavLink to="/policy/privacy">Dowiedz się więcej &#8594;</NavLink>
                    </p>
                </label>
                <p>Umawiając wizytę, akceptujesz nasz <NavLink to="/policy/regulamin">regulamin i</NavLink> potwierdzasz, że rozumiesz naszą<NavLink to="/policy/regulamin"> politykę przetwarzania danych osobowych.</NavLink></p>
            </div>
            <div className={styles.btnBlock}>
                <button className={styles.btnBlockBack} onClick={() => props.changeActivePage('ZapisPage')}>Anuluj</button>
                <button onClick={clikcBtnAddOrder}>Kontynuj</button>
            </div>
        </div>
    )
}
export default ZapisFormPage;