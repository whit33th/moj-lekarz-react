import styles from './style/AppointmentCard.module.css';
import { useLocation } from 'react-router-dom';

export default function AppointmentCard() {
  const { state } = useLocation();
  
  if (!state) {
    return <div>Loading...</div>;
  }

  const { doctor, clinic, appointment } = state;

  if (!doctor || !clinic || !appointment) {
    return <div>Brak danych</div>;
  }
  console.log(clinic.phone)

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.date}>{appointment.date}</div>
      
      <div className={styles.time}>{appointment.startTime} - {appointment.endTime} </div>
      
      <div className={styles.infoRow}>
        <img className={styles.icon} src={doctor.photo} alt={doctor.name} />
        <div>
          <div className={styles.title}>{doctor.name}</div>
          <div className={styles.subtitle}>{doctor.specialty}</div>
        </div>
      </div>
      
      <div className={styles.infoRow}>
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div>
          <div className={styles.title}>{clinic.name}</div>
          <div className={styles.subtitle}>{clinic.address}</div>
        </div>
      </div>
      
      <a href={`tel:${doctor.phone}`} className={styles.phoneButton}>
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {doctor.phone}
      </a>
    </div>
  )
}
