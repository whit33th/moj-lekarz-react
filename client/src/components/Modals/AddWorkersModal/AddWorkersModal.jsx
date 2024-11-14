import { useState } from 'react'
import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import DropdownStas from "../../Dropdown/DropdownStas";
import exit from "../../../assets/img/cross.png";
import styles from "./AddWorkersModal.module.css";
import useStore from '../../../data/store'

function AddWorkersModal() {
const {setModalActive}  = useStore()
  const [visitTypes, setVisitTypes] = useState([
    { id: "1", name: "Konsultacja ortopedyczna", price: 220.0, checked: true },
    { id: "2", name: "Badanie kontrolne", price: 220.0, checked: false },
    {
      id: "3",
      name: "Przepisanie i korekta leczenia",
      price: 220.0,
      checked: false,
    },
    { id: "4", name: "Kontrola po operacji", price: 0.0, checked: true },
    { id: "5", name: "Wizyta rehabilitacyjna", price: 110.0, checked: true },
  ]);


  const handleCheckboxChange = (id) => {
    setVisitTypes((prevVisitTypes) =>
      prevVisitTypes.map((type) =>
        type.id === id ? { ...type, checked: !type.checked } : type
      )
    );
  };
  const [selectedPosition, setSelectedPosition] = useState(null); 
	console.log(selectedPosition)
  return (
    <div className={styles.container}>
      <img onClick={() => setModalActive(false)} src={exit} alt="cross" />
      <div className={styles.infoGrid3}>
        <div className={styles.infoGroup}>
          <label>Imię</label>
          <input type="text" value="Tomasz" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>Nazwisko</label>
          <input type="text" value="Jankowski" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>PESEL</label>
          <input type="text" value="08058615499" readOnly />
        </div>
      </div>
      <div className={styles.infoGrid3}>
      
        <div className={styles.infoGroup}>
          <label>Telefon</label>
          <input type="text" value="555 666 777" readOnly />
        </div>
        <div className={styles.infoGroup}>
          <label>Email</label>
          <input type="text" value="jantom@gmail.com" readOnly />
        </div>
      </div>
      <div className={styles.infoGrid3}>
        <div className={styles.infoGroup}>
          <label>Płeć</label>
          <input type="text" value="Mężczyzna" readOnly />
        </div>
        <div className={styles.infoGroup}>
          <label>Data urodzenia</label>
          <input type="text" value="12.01.1991" readOnly />
        </div>
      </div>
      <div className={styles.infoGrid3}>
        <div className={styles.infoGroup}>
          <label>Miasto</label>
          <input type="text" value="Wrocław" readOnly />
        </div>

        <div className={styles.infoGroup}>
          <label>Adres</label>
          <input type="text" value="ul.Szamarzewskiego" readOnly />
        </div>

        <div className={styles.infoRowDuplex}>
          <div className={styles.infoGroup}>
            <label>Nr Domu</label>
            <input type="text" value="98" readOnly />
          </div>

          <div className={styles.infoGroup}>
            <label>Nr Lokalu</label>
            <input type="text" value="131" readOnly />
          </div>
        </div>
      </div>
      <div className={styles.infoGrid2}>
        <div className={styles.infoGroup}>
          <label>Adres korespondecji</label>
          <input type="text" value="ul.Szamarzewskiego 3/22" readOnly />
        </div>
        <div className={styles.infoRowDuplex}>
          <div className={styles.infoGroup}>
            <label>Index</label>
            <input type="text" value="60-131" readOnly />
          </div>

          <div className={styles.infoGroup}>
            <label>Nr.Domu</label>
            <input type="text" value="131" readOnly />
          </div>
        </div>
      </div>

      <div className={styles.positionSection}>
        <div className={styles.infoGroup}>
          <label>Stanowisko</label>
          <DropdownStas
            placeholder="Wybierz stanowisko"
            options={["Dentysta", "Lobista"]}
            onChange={(value) => setSelectedPosition(value)}
          />
        </div>
        {selectedPosition && (
          <>
            <p>Wybierz typ wizyty</p>
            {visitTypes.map((type) => (
              <div key={type.id} className={styles.checkbox}>
                <input
                  type="checkbox"
                  id={type.id}
                  checked={type.checked}
                  onChange={() => handleCheckboxChange(type.id)}
                  className={styles.checkIco}
                />
                <label htmlFor={type.id}>
                  {type.name} • {type.price.toFixed(2)} zł
                </label>
              </div>
            ))}
          </>
        )}
      </div>

      <div className={styles.infoGrid2}>
        <div></div>
        <BlueBtn>Dodaj</BlueBtn>
      </div>
    </div>
  );
}

export default AddWorkersModal;
