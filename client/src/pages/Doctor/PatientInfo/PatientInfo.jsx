import React from 'react';
import styles from './PatientInfo.module.css'

function PatientInfo() {
  return (
    <div className={styles.profilDiv}>
      <div className={styles.topPhoto}>
        <img src="/assets/profil.webp" alt="Profile" />
        
          <h1>Tomasz Jankowski</h1>
          <p className={styles.pacjentTel}>+ 48 556 667 776</p>
      
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.profilInfo}>
        <div className={styles.mainInfo}>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="name">Imię</label>
              <input type="text" id="name" name="name" placeholder="Pawel" />
            </div>
            <div>
              <label htmlFor="surname">Nazwisko</label>
              <input type="text" id="surname" name="surname" placeholder="Nowik" />
            </div>
            <div>
              <label htmlFor="pesel">PESEL</label>
              <input type="number" id="pesel" name="pesel" placeholder="08058615499" />
            </div>
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="data">Data urodzenia</label>
              <input type="date" id="data" name="data" placeholder="28.08.1993" />
            </div>
            <div>
              <label htmlFor="postcode">Kod posztowy</label>
              <input type="text" id="postcode" name="postcode" placeholder="71-232" />
            </div>
            <div className={styles.row} >
              <div >
                <label htmlFor="house-nr">Nr. Domu</label>
                <input type="text" id="house-nr" name="house-nr" placeholder="32A" />
              </div>
              <div >
                <label htmlFor="flat-nr">Nr. Lokalu</label>
                <input type="text" id="flat-nr" name="flat-nr" placeholder="122" />
              </div>
            </div>
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="address">Adres</label>
              <input type="text" id="address" name="address" placeholder="ul. Szamarzewskiego" />
            </div>
            <div className={styles.row} >
              <div >
                <label htmlFor="height">Wzrost</label>
                <input type="number" id="height" name="height" placeholder="122" />
              </div>
              <div >
                <label htmlFor="weight">Waga</label>
                <input type="number" id="weight" name="weight" placeholder="50" />
              </div>
            </div>
            <div >
              <button className={styles.buttDef}>Więcej informacji</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.rules}>
        <div >
          <div className={styles.infoNavbarButt}>
            <span className={styles.active}>Uwagi</span>
            <span>Historia wizyt</span>
          </div>
        </div>
        <div >
          <span>Tadalafil Inventum</span>
          <div className={styles.commentsType}>Uczulenie</div>
        </div>
        <div >
          <span>CLOTRIMAZOLUM</span>
          <div className={styles.commentsType}>Alergia</div>
        </div>
        <div >
          <span>IBS Control Forte</span>
          <div className={styles.commentsType}>Uczulenie</div>
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
