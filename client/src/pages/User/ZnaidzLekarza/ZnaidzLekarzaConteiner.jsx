import React, { useState, useEffect } from 'react';
import ZhaidzLekarza from './ZhaidzLekarza';
import styles from './style/ZnaidzLekarzaConteiner.module.css';
import ZapisPage from './Zapis/ZapisPage';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ZapisConteiner from './Zapis/ZapisConteiner';
import { useNavigate } from 'react-router-dom';

function ZnaidzLekarzaConteiner({isLoggedIn}) {
  const [zapisState, setZapisState] = useState({
    idDoctor: undefined,
    date: undefined,
    time: undefined,
    allData: {}
  });
  const navigate = useNavigate();
  useEffect(() => {
    
    const savedState = localStorage.getItem('zapisState');
    if (savedState) {
      setZapisState(JSON.parse(savedState));
    }
  }, []);


  const addZapis = (id, time, date, info) => {
    const newState = {
      idDoctor: id,
      date: date,
      time: time,
      allData: info
    };

    setZapisState(newState);
    localStorage.setItem('zapisState', JSON.stringify(newState));
  };

  const doctorCard = useSelector((state) => state.some.doctorCard);

  return (
    <div className={styles.ZnaidzLekarzaConteiner}>
      <Routes>
        <Route path="/" element={<ZhaidzLekarza doctorCard={doctorCard} addZapis={addZapis} />} />
        <Route path="zapis/:id" element={<ZapisConteiner zapisState={zapisState} isLoggedIn={isLoggedIn}/>} />
      </Routes>
    </div>
  );
}

export default ZnaidzLekarzaConteiner;