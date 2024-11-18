
import styles from './ResearchResultsPage.module.css';
import { useState } from 'react';
import img from '../../../assets/img/Vector-21.svg'

import useStore from '../../../data/store'


function ResearchResultsPage() {
    const [btnState, setBtnState] = useState('Winiki badań');
    const {stateResearchResult} = useStore(); 

    const handleDownload = (fileUrl) => {
        // Создаем ссылку для скачивания файла
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = "ResearchResults"; // Имя файла, под которым будет загружен
        document.body.appendChild(link);
        link.click();

        // Удаляем временную ссылку из DOM
        document.body.removeChild(link);
    };

    return (
      <div className={styles.researchResultsPage}>
        <div className={styles.resultsMainBtnBlock}>
          <div className={styles.resultsBtnConteiner}>
            <span
              style={{ left: btnState == "Winiki badań" ? "0%" : "50%" }}
            ></span>
            <div
              onClick={() => setBtnState("Winiki badań")}
              style={{ color: btnState == "Winiki badań" ? "#000" : "#fff" }}
            >
              Winiki badań
            </div>
            <div
              onClick={() => setBtnState("Inne dokumenty")}
              style={{ color: btnState == "Inne dokumenty" ? "#000" : "#fff" }}
            >
              Inne dokumenty
            </div>
          </div>
        </div>
        <div className={styles.resultContentBlock}>
          {btnState == "Winiki badań" ? (
            stateResearchResult.researchResults.length == 0 ? (
              <div className={styles.errorText}>Brak dokumentów</div>
            ) : (
              stateResearchResult.researchResults.map((item) => (
                <div className={styles.listItem} key={item.id}>
                  <div className={styles.listItemName}> {item.name}</div>
                  <div className={styles.listItemDate}> {item.date}</div>
                  <div
                    onClick={() => handleDownload(item.fileUrl)}
                    className={styles.listItemImg}
                  >
                    <img src={img} />
                  </div>
                </div>
              ))
            )
          ) : stateResearchResult.otherDocs.length == 0 ? (
            <div className={styles.errorText}>Brak dokumentów</div>
          ) : (
            stateResearchResult.otherDocs.map((item) => (
              <div className={styles.listItem} key={item.id}>
                <div className={styles.listItemName}> {item.name}</div>
                <div className={styles.listItemDate}> {item.date}</div>
                <div
                  onClick={() => handleDownload(item.fileUrl)}
                  className={styles.listItemImg}
                >
                  <img src={img} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
}

export default ResearchResultsPage;