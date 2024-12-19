import styles from './AppPromo.module.css'
import img1 from '@assets/img/image1.svg'
import img2 from '@assets/img/image2.svg'
import phone from '@assets/img/foto.webp'


function AppPromo() {
  return (
    <div className={styles.appPromo}>
      <div className={styles.appPromoContent}>
        <div className={styles.appPromoContentLeft}>
          <h1>Zadbaj o swoje zdrowie z naszą aplikacją!</h1>
          <p>Nie zapominaj o przjęciu leków i wizytach! Nasza aplikacja jest tutaj, aby Cię wspierać. Pobierz teraz!</p>
          <div className={styles.appPromoIcons}>
            <a href="#"><img src={img2} /></a>
            <a href="#"><img src={img1} /></a>
          </div>
        </div>
        <div className={styles.appPromoContentRight}>
          <img src={phone} alt="phone" />

        </div>
      </div>
      <div className={styles.appPromoBottom}>
      </div>
    </div>
  )
}
export default AppPromo
