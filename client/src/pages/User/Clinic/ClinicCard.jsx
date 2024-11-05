import React from 'react';
import styles from './style/ClinicCard.module.css';
import img1 from '../../assets/tst,small,845x845-pad,1000x1000,f8f8f8.jpg';
import starimg from '../../assets/Star.svg';
import { NavLink } from 'react-router-dom';
import imgIcon1 from '../../assets/simple-line-i.svg';
import imgIcon2 from '../../assets/Vector14.svg';

function ClinicCard(props) {
    const data = props.state;

    if (!data) {
        return <div>Данные не найдены</div>;
    }

    const rating = parseInt(data.rating, 10);
    console.log(data.uslugiAndPrice[0].list[0])
    return (
        <div className={styles.clinicCard}>
            <div className={styles.nameBlock}>
                <img src={data.imglink || img1} alt="clinic" />
                <div className={styles.nameBlockText}>
                    <p>{data.name}</p>
                    <span>{data.types && data.types.map(item => item).join(', ')}</span>
                    <p className={styles.starsBlock}>
                        {[...Array(rating)].map((_, index) => (
                            <img key={index} src={starimg} alt="star" className={styles.imgNameBlockStar} />
                        ))}
                    </p>
                </div>
                <div className={styles.namelinkBlock}>
                    <NavLink to={`/profile -clinic/${data.id}`}>Więcej&#8594;</NavLink>
                </div>
            </div>
            <div className={styles.clinicInfo}>
                <div>
                    <img src={imgIcon1} alt="address" />
                    <div>
                        <p>{data.address?.street} {data.address?.city}</p>
                        <p className={styles.clinicplaceholder}>Centrum Medyczny</p>
                    </div>
                </div>
                <div>
                    <img src={imgIcon2} alt="price" />
                    <div>
                        <p>{data.uslugiAndPrice[0]?.list[0].name} {data.uslugiAndPrice[0].list[0].price}zł </p>
                    </div>
                </div>
            </div>
            <div className={styles.link}>
                <NavLink to={`/profile-clinic/${data.id}`}>Zobacz więcej &#8594;</NavLink>
            </div>
        </div>
    );
}

export default ClinicCard;