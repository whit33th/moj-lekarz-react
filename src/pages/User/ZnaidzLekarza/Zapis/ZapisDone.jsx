import { useLocation, Navigate, NavLink } from 'react-router-dom';
import styles from './ZapisDone.module.css'
import imgName from "@assets/img/simple-line-i.svg"
import imgType from '@assets/img/Vector14.svg'
import phoneImg from '@assets/img/ph_phone-light.svg'
import visitorImg from '@assets/img/Vector15.svg'
import downloadImg from '@assets/img/material-symbols-light_download.svg'
import commentsImg from '@assets/img/iconamoon_comment-light.svg'
import AppPromo from '../../../../components/AppPromo/AppPromo'



function ZapisDone() {
    const { state } = useLocation();
    
    if (!state) {
        return <Navigate to="/" />;
    }

    const { 
        formDataObj,
        doctor,
        clinic,
        visitDetails,
        date,
        time,
        endTime,
    } = state;
console.log(state)
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
                                <p>{date}</p>
                                <p className={styles.zapisPageLeftTimeText}>
                                    {time} - {endTime}
                                </p>
                            </div>
                            <div className={styles.infoblock}>
                                <div className={styles.infoblockNameBlock}>
                                    <div className={styles.zapisPageLeftNameBlock}>
                                        <img src={imgType} alt="Doctor" />
                                        <div>
                                            <p>{doctor?.name || 'Nie określono'}</p>
                                            <p className={styles.zapisPageLeftType}>
                                                {doctor?.specialty || 'Nie określono'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.zapisPageLeftNameBlock}>
                                        <img src={visitorImg} alt="Doctor" />
                                        <div>
                                            <p>Typ wizyty:</p>
                                            <p className={styles.zapisPageLeftType}>
                                                {visitDetails?.type || 'Nie określono'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.infoblockPhoneBlock}>
                                    <div className={styles.zapisPageLeftAddressBlock}>
                                        <img src={imgName} alt="Location" />
                                        <div>
                                            <p>{clinic?.name || 'Nie określono'}</p>
                                            <p className={styles.zapisPageLeftCity}>
                                                {clinic?.address || 'Adres nie określony'}
                                            </p>
                                        </div>

                                    </div>
                                    <div className={styles.zapisPageLeftAddressBlockBtnPhone}>
                                        <a href={`tel:+${doctor?.phone}`}><img src={phoneImg} alt="Phone" />{doctor?.phone}</a>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.fileNameBlock}>
                                <img src={downloadImg} alt="Download" />
                                <div>
                                    <p>Dodane dokumenty:</p>
                                    <span>{formDataObj.file ? formDataObj.file.name : 'Brak dokumentów'}</span>
                                </div>
                            </div>
                            <div className={styles.fileNameBlock}>
                                <img src={commentsImg} alt="Comments" />
                                <div>
                                    <p>Komentarz:</p>
                                    <span>{formDataObj.comment || 'Brak komentarza'}</span>
                                </div>
                            </div>
                            <div className={styles.leftBlockBottomPrice}>
                                <p>{visitDetails.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <AppPromo />
        </div>
    )
}
export default ZapisDone
