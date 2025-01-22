import { useState, useEffect } from "react";
import ZhaidzLekarza from "./SearchVisits";
import styles from "./style/ZnaidzLekarzaConteiner.module.css";

import { Routes, Route } from "react-router-dom";
import ZapisConteiner from "./Zapis/ZapisConteiner";

import useStore from "../../../data/store";

function SearchVisitsContainer({ isLoggedIn }) {
  const [zapisState, setZapisState] = useState({
    idDoctor: undefined,
    date: undefined,
    time: undefined,
    allData: {},
  });
  useEffect(() => {
    const savedState = localStorage.getItem("zapisState");
    if (savedState) {
      setZapisState(JSON.parse(savedState));
    }
  }, []);

  const addZapis = (id, time, date, info) => {
    const newState = {
      idDoctor: id,
      date: date,
      time: time,
      allData: info,
    };

    setZapisState(newState);
    localStorage.setItem("zapisState", JSON.stringify(newState));
  };

  const { doctorCard } = useStore();

  return (
    <div className={styles.ZnaidzLekarzaConteiner}>
      <Routes>
        <Route
          path="/"
          element={
            <ZhaidzLekarza doctorCard={doctorCard} addZapis={addZapis} />
          }
        />
        <Route
          path="zapis/:id"
          element={
            <ZapisConteiner zapisState={zapisState} isLoggedIn={isLoggedIn} />
          }
        />
      </Routes>
    </div>
  );
}

export default SearchVisitsContainer;
