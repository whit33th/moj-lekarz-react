import React from 'react';
import styles from './style/MobileAppPage.module.css';
import img1 from '../assets/image1.svg'
import img2 from '../assets/image2.svg'
import phone from '../assets/foto.webp'
import img3 from '../assets/Frame1.svg'
import img4 from '../assets/Frame2.svg'
import img5 from '../assets/Frame3.svg'



function MobileAppPage() {
  return (
    <div className={styles.moblie}>
        <div className={styles.firstBlock}>
            <div className={styles.firstBlockLeft}>
                <h1>Zadbaj o swoje zdrowie z naszą aplikacją!</h1>
                <p>Nie zapominaj o przjęciu leków i wizytach! Nasza aplikacja jest tutaj, aby Cię wspierać. Pobierz teraz!</p>
                <div className={styles.firstBlockLeftIcons}>
                    <a href="#"><img src={img2}/></a>
                    <a href="#"><img src={img1}/></a>
                </div>
                <div className={styles.qrBlock}>
                    <div className={styles.qr}></div>
                    {/* <img src="qr" alt="qe" /> */}

                    <p>Zeskanuj kod i pobierz</p>
                </div>
                
            </div>
            <div className={styles.firstBlockRight}>
                <img src={phone} alt="phone"/>
            </div>
        </div>

        <div className={styles.imageBlock}>
            <div className={styles.imagesBlockItem}>
                <div className={styles.itemImg}>
                    <img src={img3} />
                </div>
                <div className={styles.itemText}>
                    <p className={styles.itemTextTitle}>
                        Zawsze pamiętaj 
                        o wizytach 
                    </p>
                    <p>Otrzymasz powiadomienia, które przypomną Ci o terminach umówionych wizyt.</p>
                </div>
            </div>
            <div className={styles.imagesBlockItem}>
                <div className={styles.itemImg}>
                    <img src={img5} />
                </div>
                <div className={styles.itemText}>
                    <p className={styles.itemTextTitle}>
                        Łatwo przeglądaj szczegóły swojej wizyty 
                    </p>
                    <p>W dowolnym miejscu i czasie, możesz zobaczyć szczegóły swojej wizyty</p>
                </div>
            </div>
            <div className={styles.imagesBlockItem}>
                <div className={styles.itemImg}>
                    <img src={img4} />
                </div>
                <div className={styles.itemText}>
                    <p className={styles.itemTextTitle}>
                        Pamiętaj o zażywaniu leków 
                    </p>
                    <p>Otrzymasz powiadomienia, które przypomną Ci o zażywaniu leków.</p>
                </div>
            </div>

        </div>
    </div>
  )
}
export default MobileAppPage;