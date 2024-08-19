import React from 'react'
import styles from './Recipes.module.css'
import searchIco from '../../../assets/img/search.png'
import { userItems } from '../../../helpers/userItemList'
import RecipeItem from '../../../components/DoctorPage/RecipesList/RecipeItem'
import BlueBtn from '../../../components/Buttons/BlueBtn/BlueBtn'
import BlueBorderBtn from '../../../components/Buttons/BlueBorderBtn/BlueBorderBtn'
import useStore from '../../../data/store'

function PatientList() {
  const { setModalActive, setModalContent } = useStore()
  
  
  // Функция для закрытия модального окна
  function handleActiveStatus() {
    setModalActive(false); 
  }
  const modalContentInfo = (
    <div>
      <h1>Dodaj recepturę</h1>
      <div className={styles.modalInputBox}>
        <input className={styles.search} type="text" placeholder="Wybierz pacjenta" />
        <input className={styles.search} type="text" placeholder="Wybierz lek" />
        <button className={styles.buttDef}>Dodaj nową recepturę</button>
      </div>
      <div className={styles.choice}>
        <BlueBorderBtn cb={()=> setModalActive(false)}  >Anuluj</BlueBorderBtn>
        <BlueBtn   >Dodaj </BlueBtn>
      </div>
    </div>
    
  )

  // Функция для открытия модального окна
  function handleOpenModal() {
    setModalContent(modalContentInfo)
    setModalActive(true)
  }

  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <span className={styles.calendarNavbarDate}>
          <span>Lista receptów</span>
        </span>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.shadow}>
          <thead>
            <tr>
              <th>
                <div className={styles.top}>
                  <div className={styles.clientSearch}>
                    <form className={styles.search} action="" method="post">
                      <img src={searchIco} alt="search" />
                      <input
                        className={styles.searchInput}
                        placeholder="Szukaj pacjenta..."
                        type="text"
                        name="search"
                        id="client-search"
                      />
                    </form>
                  </div>
                </div>
              </th>
              <th>Info</th>
              <th className={styles.buttonAddTh}>
                <button onClick={handleOpenModal} className={`${styles.buttDefold} ${styles.fillBlue}`} id="add-prescriptions">
                  Dodaj
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {userItems.map((userItem, index) => (
              <RecipeItem
                key={index}
                img={userItem.img}
                name={userItem.name}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientList
