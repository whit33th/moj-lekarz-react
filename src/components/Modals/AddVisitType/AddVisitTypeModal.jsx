import { useState, useEffect } from "react";
import styles from "./AddVisitType.module.css";
import Choice from "../../Modal/Choice";
import useStore from "../../../data/store";

function AddVisitTypeModal({ onAddVisitType, allServices, existingServices }) {
  const [visitTypes, setVisitTypes] = useState([]);
  const { setModalActive } = useStore();

  useEffect(() => {
    if (allServices?.length) {
      const existingServiceIds = existingServices.map(service => service.id);
      
      setVisitTypes(
        allServices.map(service => ({
          id: service.id,
          name: service.name,
          price: parseFloat(service.price),
          checked: existingServiceIds.includes(service.id)
        }))
      );
    }
  }, [allServices, existingServices]);

  const handleCheckboxChange = (id) => {
    setVisitTypes(prevTypes =>
      prevTypes.map(type =>
        type.id === id ? { ...type, checked: !type.checked } : type
      )
    );
  };

  const handleAdd = () => {
    const selectedTypes = visitTypes.filter(type => type.checked);
    onAddVisitType(selectedTypes);
    setModalActive(false);
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
        cb2={handleAdd}
      />
    </div>
  );
}

export default AddVisitTypeModal;
