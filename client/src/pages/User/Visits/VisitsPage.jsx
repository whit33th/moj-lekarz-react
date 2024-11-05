import React, { useState , useEffect} from 'react'
import styles from './VisitsPage.module.css';
import VisitsCard from './VisitsCard';
import img1 from '../../assets/image1.svg'
import img2 from '../../assets/image2.svg'
import { useSelector, useDispatch } from 'react-redux';
import { deleteVisitById } from '../../redux/someSlice';
import { NavLink } from 'react-router-dom';
import VisitsCardCompleted from './VisitsCardCompleted';
import { useNavigate } from 'react-router-dom';

function VisitsPage({isLoggedIn}) {
    
    const visitsState = useSelector((state) => state.some.visitsState);
    const [modalWindowStatus , setModalWindowStatus] = useState(false);
    const [deleteItemId , setDeleteItemId] = useState(undefined);
    const dispatch = useDispatch();
    const clickDeleteBtn = (id)=>{
        setModalWindowStatus(true);
        setDeleteItemId(id)
    }
    const deleteFc = () => {
        dispatch(deleteVisitById(deleteItemId));
        setModalWindowStatus(false)
    }
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isLoggedIn){
            
            navigate('/auth/');
          }
    }, [])

    return (
        <div className={styles.visitsPage}>
            <div className={styles.modalWindow} style={{display: modalWindowStatus ? 'flex' : 'none'}}>
                <div className={styles.modalWindowRow}>
                    <h1>Czy na pewno chcesz anulować wizytę?</h1>
                    <div className={styles.modalWindowBtn}>
                        <button className={styles.modalWindowBtnBack} onClick={()=> setModalWindowStatus(false)}>Nie</button>
                        <button className={styles.modalWindowBtnYes} onClick={()=> deleteFc()}>Tak</button>

                    </div>
                </div>
            </div>
            
            <div className={styles.visitsPageLeft}>
                <h1>Zaplanowane wizyty</h1>
                {
                    visitsState.plannedVisits.map(item => <VisitsCard data={item} deleteFc={clickDeleteBtn} key={item.id} />)
                }
                <div className={styles.newVisitsBtn}>
                    <NavLink to={'/znajdz-lekarza'}>Dodaj wizytę <span> &#43;</span> </NavLink>
                </div>

                <h1>Zrealizowane wizyty</h1>
                {
                    visitsState.completedVisits.map(item => <VisitsCardCompleted data={item} key={item.id} />)
                }
            </div>
            <div className={styles.visitsPageRight}>
                <p>Bądź zawsze na bieżąco!</p>
                <p>Pobierz aplikację mobilną z planem wizyt od MyLekarz!</p>
                <div className={styles.visitsPageRightIcons}>
                    <a href="#"><img src={img2} /></a>
                    <a href="#"><img src={img1} /></a>
                </div>
                <div className={styles.qrBlock}>
                    <div className={styles.qr}></div>
                    {/* <img src="qr" alt="qe" /> */}

                    <p>Zeskanuj kod i pobierz</p>
                </div>

            </div>

        </div>
    )
}
export default VisitsPage;