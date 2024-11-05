import React from 'react';
import styles from './style/DoctorCard.module.css';
import starimg from '../../assets/Star.svg';
import imgIcon1 from '../../assets/simple-line-i.svg';
import imgIcon2 from '../../assets/Vector14.svg';
import { NavLink } from 'react-router-dom';

function DoctorCard({ data, selectedDate, addZapis }) {
    const rating = parseInt(data.rating, 10);

    // Фильтруем даты по выбранной дате
    const filteredDates = selectedDate 
        ? data.dates.filter(dateObj => dateObj.date === selectedDate?.toLocaleDateString('pl-PL'))
        : data.dates;

    // Отображаем только первые две даты, если их больше двух
    const displayedDates = filteredDates.slice(0, 2);

    return (
        <div className={styles.doctorCard}>
            <div className={styles.doctorCardInfo}>
                <div className={styles.doctorCardInfoImgBlock}>
                    <NavLink to={`/profileDoctor/${data.id}`}><img src={data.imglink} alt={data.name} /></NavLink>
                    <div>
                        <p className={styles.doctorCardInfoImgBlockName}>{data.name}</p>
                        <p>{data.type}</p>
                        <p>
                            {[...Array(rating)].map((_, index) => (
                                <img key={index} src={starimg} alt="star" className={styles.imgNameBlockStar} />
                            ))}
                        </p>
                    </div>
                </div>
                <div className={styles.doctorCardAddressBlock}>
                    <div>
                        <img src={imgIcon1} alt="address" />
                        <div>
                            <p>{data.address.street} {data.address.city}</p>
                            <p className={styles.doctorCardAddressPlaceholder}>Centrum Medyczny</p>
                        </div>
                    </div>
                    <div>
                        <img src={imgIcon2} alt="price" />
                        <div>
                            <p>Konsultacja - {data.price}zł </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.doctorDescription}>
                <p>{data.description}</p>
                <div>
                    <NavLink to={`/profileDoctor/${data.id}`}>Zobacz więcej &#8594;</NavLink>
                </div>
            </div>
            <div className={styles.doctorCardTimeBlock}>
                <h3>Najbliższe terminy:</h3>
                <div className={styles.doctorCardTimeBlockItems}>
                    {displayedDates.length > 0 ? (
                        displayedDates.map((item, index) => (
                            <div className={styles.doctorCardTimeBlockItem} key={index}>
                                <p>{item.date}</p>
                                <div className={styles.doctorCardHoursItems}>
                                    {item.hours.map((hoursItem, index) => (
                                        <NavLink 
                                            onClick={() => addZapis(data.id, hoursItem, item.date, data)} 
                                            to={`/znajdz-lekarza/zapis/${data.id}/`}
                                            className={styles.doctorCardHoursItem} 
                                            key={index}
                                        >
                                            {hoursItem}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Brak dostępnych terminów na wybrany dzień.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorCard;