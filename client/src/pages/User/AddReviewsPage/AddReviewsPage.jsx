import React, { useState, useEffect } from 'react'
import styles from './AddReviewsPage.module.css'
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import imgName from '../../assets/simple-line-i.svg';
import imgType from '../../assets/Vector14.svg';
import phoneImg from '../../assets/ph_phone-light.svg';
import StarsReview from '../../components/StarsReview';
import { useNavigate } from 'react-router-dom';


const feedbackOptions = [
    'Profesjonalne podejście',
    'Dbałość o komfort pacjenta',
    'Punktualność',
    'Rzetelne wyjaśnienie planu leczenia',
    'Nowoczesne wyposażenie gabinetу',
    'Otwartość',
    'Empatia i zrozumienie',
    'Dokładne wyjaśnienie diagnozy',
    'Indywidualne podejście do problemu',
];
const feedbackOptionsStep3 = [
    'Niewielka dbałość o szczegóły',
    'Wysoki koszt wizyty',
    'Niewiele dostępnych terminów',
    'Słaba organizacja pracy w recepcji',
    'Słaba komunikacja z pacjentem',
    'Długie oczekiwanie na wizytę',
    'Zbyt krótka wizyta',


];


function AddReviewsPage({isLoggedIn}) {
    const [stateVisitsCard, setStateVisitsCard] = useState({});
    const [rating, setRating] = useState(0); // Текущий рейтинг (1–5)
    const [step, setStep] = useState(1);
    const [selectedFeedback, setSelectedFeedback] = useState('');
    const [selectedFeedbackStep3, setSelectedFeedbackStep3] = useState('');
    const [pageviewStatus, setPageviewStatus] = useState('reviews');
    const [textareaState, setTextareaState] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoggedIn){
            navigate('/auth/');
          }
    }, [])
    const { id } = useParams();
    const visitsState = useSelector((state) => state.some.visitsState);

    useEffect(() => {
        const data = visitsState.completedVisits.find((item) => item.id == id);
        setStateVisitsCard(data)
    }, [id, visitsState]);


    const stepNext = () => {
        if (step != 4) {
            setStep(step + 1)
        }else{
            setPageviewStatus('thanksPage');
            window.scrollTo(0, 0);
        }
    }
    const handleFeedbackClick = (feedback) => {
        setSelectedFeedback(feedback);
    };
    return (
        <div>
            {
                pageviewStatus == 'reviews' &&
                <div className={styles.addReviewsBlock}>
                    <div className={`${styles.addReviewsTopBlock} ${styles[`progress-${step}`]}`}>
                        <div>Krok 1</div>
                        <div>Krok 2</div>
                        <div>Krok 3</div>
                        <div>Krok 4</div>
                    </div>

                    <div className={styles.addReviewsContent}>
                        <div className={styles.leftBlock}>
                            <div className={styles.visitsCard}>
                                <div className={styles.visitsCardTimeBlock}>
                                    <p>{stateVisitsCard.date}</p>
                                    <p className={styles.visitsCardTimeText}>{stateVisitsCard.time}</p>
                                </div>
                                <div className={styles.visitsCardNameBlock}>
                                    <img src={imgType} alt="Doctor" />
                                    <div>
                                        <p>{stateVisitsCard.doctorName}</p>
                                        <p className={styles.visitsCardType}>{stateVisitsCard.doctorType}</p>
                                    </div>
                                </div>
                                <div className={styles.visitsCardAddressBlock}>
                                    <img src={imgName} alt="Location" />
                                    <div>
                                        <p>{stateVisitsCard.clinicalName}</p>
                                        <p className={styles.visitsCardCity}>{stateVisitsCard.clinicalAddress}</p>
                                    </div>
                                    <div className={styles.visitsCardAddressBlockBtnPhone}>
                                        <a href={`tel:+${stateVisitsCard.phone}`}><img src={phoneImg} alt="Phone" />{stateVisitsCard.phone}</a>
                                    </div>
                                </div>
                                <div className={styles.visitsCardBottomPrice}>
                                    <p>{stateVisitsCard.serviceName} - {stateVisitsCard.servicePrice}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightBlock}>
                            {
                                step == 1 &&
                                <div className={styles.starRatingBlock}>
                                    <h1>Jak oceniasz wizytę?</h1>
                                    <div className={styles.starBlock}>
                                        <StarsReview rating={rating} setRating={setRating} />

                                    </div>
                                </div>
                            }
                            {
                                step == 2 &&
                                <div className={styles.bestsBlock}>
                                    <h1>Co podobało Ci się najbardziej?</h1>
                                    <div className={styles.bestsBlockContent}>
                                        {feedbackOptions.map((feedback) => (
                                            <span
                                                key={feedback}
                                                onClick={() => handleFeedbackClick(feedback)}
                                                style={{
                                                    border: selectedFeedback === feedback ? '1px solid #3E36B0' : '1px solid #fff',
                                                }}
                                            >
                                                {feedback}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            }
                            {
                                step == 3 &&
                                <div className={styles.bestsBlock}>
                                    <h1>Co Ci się nie podobało i wymaga poprawy?</h1>
                                    <div className={styles.bestsBlockContentStep3}>
                                        {feedbackOptionsStep3.map((feedback) => (
                                            <span
                                                key={feedback}
                                                onClick={() => setSelectedFeedbackStep3(feedback)}
                                                style={{
                                                    border: selectedFeedbackStep3 === feedback ? '1px solid #3E36B0' : '1px solid #fff',
                                                }}
                                            >
                                                {feedback}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            }
                            {
                                step == 4 &&
                                <div className={styles.textareaBlock}>
                                    <h1>Napisz swoją recenzję</h1>
                                    <p>Podaj jak najwięcej szczegółów</p>
                                    <textarea name="commets" placeholder='Wpisz tekst' value={textareaState} onChange={(e)=> setTextareaState(e.target.value)}></textarea>
                                </div>
                            }

                            <div className={styles.stepBtnBlock}>
                                {
                                    step != 1 && <button className={styles.stepBtnBlockPrev} onClick={() => setStep(step - 1)}>&#8592; Wróć</button>
                                }

                                <button className={styles.stepBtnBlockNext} onClick={stepNext}>Dalej &#8594;</button>
                            </div>
                        </div>
                    </div>


                </div >
            }
            {
                pageviewStatus == 'loading' && <div className={styles.loading}>
                    <p>Loading...</p>
                </div>
            }
            {
                pageviewStatus == 'thanksPage' &&
                <div className={styles.thanksPage}>
                    <div className={styles.thanksPageContent}>
                        <h1>Dziękujemy za Twoją opinię!</h1>
                        <p>Po weryfikacji recenzja zostanie opublikowana</p>
                        <NavLink to={'/'}>Wróć na główną stronę</NavLink>
                        <NavLink to={'/visits'}>Przejdź do Moich wizyt</NavLink>

                    </div>
                </div>
            }


        </div>

    )
}
export default AddReviewsPage;