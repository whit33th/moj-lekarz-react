import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './style/Home.module.css'
import mainImg from "@assets/img/Frame364.svg"
import DatePicker from 'react-datepicker'
import img1 from '@assets/img/Frame1.svg'
import img2 from "@assets/img/Frame2.svg"
import img3 from "@assets/img/Frame3.svg"
import arrow from "@assets/img/arrowmain.svg"



import SwiperSlider from './../../components/SwiperSlider'
import Map from './../../components/MapComponent/Map'
import AppPromo from './../../components/AppPromo/AppPromo'

import InputDropdownStas from './../../components/Dropdown/InputDropdownStas'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)
  const { control, handleSubmit, getValues, register } = useForm({


  })

  const specializations = [
    { label: "Ortopeda", value: "Ortopeda" },
    { label: "Logopeda", value: "Logopeda" },
    { label: "Chirurg", value: "Chirurg" },
    { label: "Kardiolog", value: "Kardiolog" },
    { label: "Ginekolog", value: "Ginekolog" },
  ]
  const cities = [
    { label: "Poznan", value: "Poznan" },
    { label: "Warszawa", value: "Warszawa" },
    { label: "Wroclaw", value: "Wroclaw" },
  ]
  const types = [
    { label: "Konsultacja", value: "Konsultacja" },
    { label: "Badanie", value: "Badanie" },
  ]


  const [mapsData, setMapsData] = useState({
    id: 'path2',
    doctors: 10231,
    specializations: 123,
    locations: 25

  })

  const handlePathClick = (newData) => {
    setMapsData(newData)
  }

  const handleSearch = () => {
    const formValues = getValues() 
    const queryParams = {}

    for (const key in formValues) {
      if (formValues[key]?.value) {
        queryParams[key] = formValues[key].value
      } else if (formValues[key]) {
        queryParams[key] = formValues[key]
      }
    }

    // Преобразуем в query строку
    const searchParams = new URLSearchParams(queryParams)
    navigate(`/search?${searchParams.toString()}`)
  }


  return (
    <div className={styles.home}>
      <div className={styles.homeFirstBlock}>
        <div className={styles.homeFirstBlockLeft}>
          <img src={mainImg} alt="Main image" />
        </div>
        <div className={styles.homeFirstBlockRight}>
          <form onSubmit={handleSubmit(handleSearch)} className={styles.mainFormBlock}>
            <h2>Umów się na wizytę</h2>
            <div className={styles.mainFormIntupsBlock}>
              <div className={styles.dropdownContainer}>
                <InputDropdownStas
                  control={control} name={"specialty"}
                  options={specializations}
                  placeholder={'Wybierz specjalizacje'}
                  seeOptions
                />

              </div>

              <div className={styles.dropdownContainer}>
                <InputDropdownStas
                  control={control} name={"city"}
                  options={cities}
                  placeholder={'Wybierz miasto'}
                  seeOptions={true}
                />
              </div>

              <div className={styles.formCalendar}>
                <input type="date" placeholder="Data wizyty" className={styles.calendar} {...register("date")} />
              </div>

              <div className={`${styles.dropdownContainer} ${styles.litle}`}>
                <InputDropdownStas
                  control={control} name={"type"}
                  options={types}
                  placeholder={'Rodzaj wizyty'}
                  seeOptions={true}
                />
              </div>
            </div>
            <div className={styles.mainFormBtn}><button type="submit" >Szukaj terminu</button></div>

          </form>
        </div>
      </div>

      <div className={styles.descriptions}>
        <h1>Jak to działą?</h1>
        <div className={styles.descriptionsText}>
          <p>Serwis łączący w sobie wyszukiwarkę lekarzy z pełnym dostępem do Twoich danych medycznych. Internetowe konto pacjenta, dzięki któremu masz dostęp do wszystkich swoich danych medycznych.Umów wizytę, otrzymaj e-receptę lub e-zwolnienie bez wychodzenia z domu.</p>
        </div>
      </div>

      <div className={styles.howItWorksImageBlock}>
        <div className={styles.imagesBlockItem}>
          <div className={styles.itemImg}>
            <img src={img1} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>
              Załóż konto
            </p>
            <p>Utworzenie konta zapewnia dostęp do wszystkich funkcji i usług serwisu.</p>
          </div>
        </div>
        <div className={styles.arrow}>
          <img src={arrow} />
        </div>
        <div className={styles.imagesBlockItem}>
          <div className={styles.itemImg}>
            <img src={img2} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>
              Zarejestruj swoją wizytę
            </p>
            <p>Wybierz dowolnego lekarza, termin i zarejestruj wizytę.</p>
          </div>
        </div>
        <div className={styles.arrow}>
          <img src={arrow} />
        </div>
        <div className={styles.imagesBlockItem}>
          <div className={styles.itemImg}>
            <img src={img3} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>
              Konsultacja
            </p>
            <p>Gotowe!  Lekarz  już na Ciebie czeka.</p>
          </div>
        </div>
      </div>
      <div className={styles.slideblock}>
        <div className={styles.slideTitle}> Dlaczego MyLekarz?</div>
        <SwiperSlider />
      </div>

      <div className={styles.mapBlock}>
        <Map data={mapsData} onPathClick={handlePathClick} />
      </div>

      <AppPromo />
    </div>
  )
}

export default Home