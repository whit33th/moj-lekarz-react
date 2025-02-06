import { useState, useEffect } from "react";
import styles from "./AddVisitType.module.css";
import Choice from "../../Modal/Choice";
import useStore from "../../../data/store";

function AddVisitTypeModal({ onClick, allServices, existingServices }) {
  const [visitTypes, setVisitTypes] = useState([]);
  const { setModalActive } = useStore();

  useEffect(() => {
    if (allServices?.length) {
      setVisitTypes(
        allServices.map(service => ({
          id: service.id,
          name: service.name,
          price: parseFloat(service.price),
          checked: existingServices.find(es => es.id === service.id) ? true : false
        }))
      );
    }
  }, [allServices, existingServices]);

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
      <Choice
        choice1={"Anuluj"}
        choice2={"Dodaj"}
        cb1={() => setModalActive(false)}
        cb2={() => onClick(visitTypes.filter(type => type.checked))}
      />
    </div>
  );
}

export default AddVisitTypeModal;
