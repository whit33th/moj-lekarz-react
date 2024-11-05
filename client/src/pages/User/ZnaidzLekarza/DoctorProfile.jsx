import React, { useState , useEffect} from 'react'
import styles from './style/DoctorProfile.module.css';
import ReviewCard from '../ReviewCard';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const reviewData = [
    {},
    {},
    {},
    {},

]
function DoctorProfile() {
    const [doctorInfo , setDoctorInfo] = useState({})
    const { id } = useParams();
    const doctorCard = useSelector((state) => state.some.doctorCard);

    useEffect(() => {
        const doctor = doctorCard.find((item) => item.id == id);
        setDoctorInfo(doctor || null); 
      }, [id, doctorCard]);
    console.log(doctorInfo)
    return (
        <div className={styles.doctorProfile}>
            <div className={styles.doctorProfileRow}>
                <div className={styles.profileNameBlock}>
                    <div>
                        <img src={doctorInfo.imglink} alt="profileImage" />
                    </div>
                    <div>
                        <p className={styles.profileName}>{doctorInfo.name}</p>
                    </div>
                    <div>
                        <p className={styles.profileType}>{doctorInfo.type}</p>
                    </div>
                    <div className={styles.profileNameBtn}>
                        <NavLink to={`/znajdz-lekarza/zapis/${id}`}>Umów wizytę</NavLink>
                    </div>
                </div>
                <div className={styles.profileDescription}>
                    <p>{doctorInfo.description}</p>
                </div>

            </div>
            <div className={styles.mapBlock}>
                {/* <MapComponent address={"Tokyo"} /> */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155738.88831080226!2d16.79320059739124!3d52.41718485762118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470444d2ece10ab7%3A0xa4ea31980334bfd1!2zUG96bmHFhCwgUG9sYW5k!5e0!3m2!1sen!2skz!4v1723792122706!5m2!1sen!2skz"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className={styles.titleBLock}>
                <h2>Opinia o lekarze</h2>
                <button> <NavLink to={`/reviews/user/${0}`}>Zobacz wszyatkie</NavLink> </button>
            </div>
            <div className={styles.review}>
                {
                    reviewData.map(item => <ReviewCard />)
                }
            </div>
        </div>
    )
}
export default DoctorProfile;