import { useState } from "react";
import styles from "./AddVisitType.module.css";
import Choice from '../../Modal/Choice'
function AddVisitType() {
  // Initialize visitTypes with useState
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

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setVisitTypes((prevVisitTypes) =>
      prevVisitTypes.map((type) =>
        type.id === id ? { ...type, checked: !type.checked } : type
      )
    );
  };

  return (
    <div className={styles.Container}>
      <h1>Wybierz typ wizyty</h1>
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
			<Choice choice1={'Anuluj'} choice2={'Dodaj'}/>
    </div>
  );
}

export default AddVisitType;
