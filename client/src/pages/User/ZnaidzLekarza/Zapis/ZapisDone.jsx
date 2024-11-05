import React, { useState } from 'react'
import styles from './ZapisDone.module.css'
import imgName from '../../../assets/simple-line-i.svg';
import imgType from '../../../assets/Vector14.svg';
import phoneImg from '../../../assets/ph_phone-light.svg';
import visitorImg from '../../../assets/Vector15.svg';
import downloadimg from '../../../assets/material-symbols-light_download.svg';
import commentsImg from '../../../assets/iconamoon_comment-light.svg';
import AppPromo from '../../../components/AppPromo/AppPromo'
import { NavLink, useParams } from 'react-router-dom';



function ZapisDone(props) {
    const [data, setData] = useState(props.data);
    const { id } = useParams();
    const doctorInfo = data.allData || {};
    return (
        <div className={styles.zapisDone}>
            <div className={styles.zapisDoneRow}>
                <div className={styles.zapisDoneFirstBlock}>
                    <div>
                        <h1>Zarezerwowane!</h1>
                        <div className={styles.zapisDoneFirstBtnBlock}>
                            <NavLink to={'/'}>Wróć na główną stronę</NavLink>
                            <NavLink to={'/znajdz-lekarza/'}>Przejdż do kalendarza</NavLink>

                        </div>
                    </div>
                </div>
                <div className={styles.zapisDoneInfoBlock}>
                    <div className={styles.zapisDoneInfoBlockContent}>
                        <h1>Informacje o wizycie</h1>
                        <div className={styles.zapisDoneInfoBlockCard}>
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
                            <div className={styles.fileNameBlock}>
                                <img src={downloadimg} />
                                <div>
                                    <p>Dodane dokumenty:</p>
                                    <span>{props.formDataObj.file && props.formDataObj.file.length < 3 ? 'undefined' : props.formDataObj.file}</span>
                                </div>
                            </div>
                            <div className={styles.fileNameBlock}>
                                <img src={commentsImg} />
                                <div>
                                    <p>Komentarz:</p>
                                    <span>{props.formDataObj.comments}</span>
                                </div>
                            </div>
                            <div className={styles.leftBlockBottomPrice}>
                                <p>{props.typWizyty}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <AppPromo />
        </div>
    )
}
export default ZapisDone;
