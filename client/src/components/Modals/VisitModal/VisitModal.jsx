
import styles from 
'./VisitModal.module.css'
import profil from "../../../assets/img/profil.webp";
import BlueBorderBtn from '../../Buttons/BlueBorderBtn/BlueBorderBtn'

import BlueBtn from '../../Buttons/BlueBtn/BlueBtn'
import useStore from '../../../data/store'

function VisitModal() {
	const { setModalActive } = useStore();
	function closeMainModal() {
    setModalActive(false);
  }
	return (
		<div className={styles.row}>
      <div className={styles.generalInfo}>
        <div>
          <h2>Ogólna informacja</h2>

          <div className={styles.infoTag}>
            <span>Godziny pracy:</span> <span> 08:30 - 16:45</span>
          </div>

          <div className={styles.infoTag}>
            <span>Rodzaj pracy:</span> <span>Konsultacja</span>
          </div>

          <div className={styles.infoTag}>
            <span>Sala:</span> <span>203</span>
          </div>
        </div>
        <BlueBorderBtn cb={closeMainModal}>Anuluj</BlueBorderBtn>
      </div>

      <div className={styles.employeeInfo}>
        <h2>Informacje pracownika</h2>

        <div className={styles.employeeDetails}>
          <div className={styles.topInfo}>
            <img src={profil} className={styles.employeeImage} alt="Employee" />
            <div>
              <p style={{ color: "#3E36B0" }}>
                {" "}
                <strong>Brat Solitko</strong>{" "}
              </p>
              <div>
                <p className={styles.phone}>
                  <span style={{ color: "#3E36B0" }}>Tel:</span>
                  <span>48 444 444 444</span>
                </p>
                <p className={styles.email}>
                  <span style={{ color: "#3E36B0" }}>Email:</span>
                  <span>deasdasd@dgs.ccc</span>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.botInfo}>
            <div>
              <span>Miasto:</span>
              <span>City</span>
            </div>
            <div>
              <span>Adres:</span>
              <span>Sdasda 2</span>
            </div>
            <div>
              <span>Data urodzenia:</span>
              <span>2932.33.23</span>
            </div>
            <div>
              <span>Plec:</span> <span>M</span>
            </div>
            <div>
              <span>Wzrost:</span> <span>17 cm</span>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <BlueBtn>Edytuj</BlueBtn>
          <BlueBorderBtn >Usuń</BlueBorderBtn>
        </div>
      </div>
    </div>
	)
}

export default VisitModal