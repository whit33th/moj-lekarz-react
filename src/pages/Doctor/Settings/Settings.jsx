import { useEffect, useState } from "react"
import styles from "./styles.module.css" // Импортируем CSS-модуль

import Calendar from "../../../components/DoctorPage/Home/Calendar/CalendarBlock"

import DropdownStas from "../../../components/Dropdown/DropdownStas"
import Choice from "../../../components/Modal/Choice"
import { useForm } from 'react-hook-form'
import useGetUserInfo from '../../../hooks/UserHooks/useGetUserInfo'
import grey from "../../../assets/img/grey.png"
import InputError from '../../../components/UI/InputError/InputError'
function Settings() {
  const [activeTab, setActiveTab] = useState("Dane podstawowe")

  const { register, formState, handleSubmit, reset } = useForm({
    mode: 'onChange'

  })
  const option1 = [
    "Dariusz Adamek",
    "Option",
  ]
  const reasons = ["Wolny", "Siła wyższa", "Wakacje", "Zwolnienie lekarskie"]
  const Buttons = [
    "Dane podstawowe",
    "Dane dodatkowe",
    "Czas pracy",
    "Wnioski",
  ]

  function handleTabClick(name) {
    setActiveTab(name)
  }


  const { data: user, isLoading } = useGetUserInfo() || []


  useEffect(() => {
    reset({
      firstName: isLoading ? 'Ładowanie...' : user?.first_name || 'Brak',
      lastName: isLoading ? 'Ładowanie...' : user?.last_name || 'Brak',
      city: isLoading ? 'Ładowanie...' : user?.city || 'Brak',
      street: isLoading ? 'Ładowanie...' : user?.street || 'Brak',
      house: isLoading ? 'Ładowanie...' : user?.house || 'Brak',
      flat: isLoading ? 'Ładowanie...' : user?.flat || 'Brak',
      postCode: isLoading ? 'Ładowanie...' : user?.post_code || 'Brak',
      birthDate: isLoading ? '0000-00-00' : user?.birthday.slice(0, 10),
      pesel: isLoading ? 'Ładowanie...' : user?.pesel || 'Brak',
      tel: isLoading ? 'Ładowanie...' : user?.phone || 'Brak',
      email: isLoading ? 'Ładowanie...' : user?.email || 'Brak',
      additional: isLoading ? 'Ładowanie...' : user?.additional || 'Brak',
    })
  }, [user, reset, isLoading])


  function onSubmit(data) {
    console.log(data)
  }

  const conclusions = (
    <div className={styles.workTime}>
      <div className={styles.shadow}>
        <Calendar />
      </div>
      
      <div className={styles.conclusions}>
        <DropdownStas
          placeholder={option1[0]}
          label="Imię i nazwisko"
          options={option1}
        />
        <DropdownStas
          placeholder={reasons[0]}
          label="Powód nieobecności"
          options={reasons}
        />
      </div>
    </div>
  )


  const workTime = (
    <div className={styles.workTime}>
      <div className={styles.shadow}>
        <Calendar />
      </div>

      <div className={styles.workSchedule}>
        <p>
          Grafik pracy:
          <span className={styles.blueBack}>18:00 - 20:00</span>{" "}
        </p>
        <p>
          Sala:
          <span className={styles.blueBack}>203</span>{" "}
        </p>
        <p>
          Godziny pracy:
          <span className={styles.blueBack}>132</span>{" "}
        </p>
      </div>
    </div>
  )

  const settingData = (
    <div className={styles.settingData}>

      <div className={styles.settingInfo}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.halfRow}>
            <div>
              <label htmlFor="firstName">Imię</label>
              <input
                type="text"

                placeholder="Dariusz"

                {...register('firstName', {
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Tylko litery",
                  }
                })}
              />
              <InputError formState={formState} errorField={"firstName"} />

            </div>
            <div>
              <label htmlFor="lastName">Nazwisko</label>
              <input

                placeholder="Adamek"
                {...register('lastName', {
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Tylko litery",
                  }
                })}
              />
              <InputError formState={formState} errorField={"lastName"} />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="city">Miasto</label>
              <input type="text" placeholder="Warszawa"
                {...register('city', {
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Tylko litery",
                  }
                })}
              />
              <InputError formState={formState} errorField={"city"} />
            </div>
            <div>
              <label htmlFor="postCode">Kod posztowy</label>
              <input type="text" placeholder="61-232"
                {...register('postCode', {
                  pattern: {
                    value: /^\d{2}-\d{3}$/, // Разрешает формат с тире
                    message: "Nieprawidłowy format kodu pocztowego (np. 61-232)",
                  },
                  maxLength: {
                    value: 6,
                    message: "Maksymalnie 6 cyfr",
                  },

                })} />
              <InputError formState={formState} errorField={"postCode"} />
            </div>
          </div>
          <div className={styles.fullRow}>
            <div>
              <label htmlFor="street">Ulica</label>
              <input
                type="text"

                placeholder="Ul.Kutrzeby"
                {
                ...register('street', {
                  pattern: {
                    value: /^[a-zA-Z/.]+$/,
                    message: "Tylko litery",
                  }
                })
                }
              />
              <InputError formState={formState} errorField={"street"} />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="house">Numer domu</label>
              <input
                type="text"

                placeholder="12"
                {...register('house')}
              />
              <InputError formState={formState} errorField={"house"} />
            </div>
            <div>
              <label htmlFor="flat">Mieszkanie</label>
              <input
                type="text"

                placeholder="1a"
                {...register('flat')}
              />
              <InputError formState={formState} errorField={"flat"} />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="birthDate">Data urodzenia</label>
              <input
                type='date'

                placeholder='01.01.2000'
                {
                ...register('birthDate', {
                  valueAsDate: true
                })}

              />
              <InputError formState={formState} errorField={"birthDate"} />
            </div>
            <div>
              <label htmlFor="pesel">Pesel</label>
              <input
                type="text"

                placeholder="12345678901"
                {...register('pesel', {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Tylko cyfry",
                  },
                  minLength: {
                    value: 11,
                    message: "Minimum 11 cyfr"
                  },
                  maxLength: {
                    value: 11,
                    message: "Maksymalnie 11 cyfr"
                  },
                })}
              />
              <InputError formState={formState} errorField={"pesel"} />
            </div>
          </div>
          <div className={styles.halfRow}>
            <div>
              <label htmlFor="tel">Telefon</label>
              <input type="tel" placeholder="+48 123 456 789"

                {...register('tel',
                  {
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Tylko cyfry",
                    },
                    minLength: {
                      value: 9,
                      message: "Minimum 9 cyfr"
                    },

                  }
                )}
              />
              <InputError formState={formState} errorField={"tel"} />

            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="pavel@gmail.com"
                {
                ...register('email', {
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Błędny email",
                  },
                })
                }
              />
              <InputError formState={formState} errorField={"email"} />
            </div>
          </div>

          <button>Zapisz zmiany</button>
        </form>
      </div>
      <div className={`${styles.settingImg}`}>
        <div className={styles.photo}>
          <img src={isLoading ? grey : user?.photo} alt="" />
        </div>

        <Choice choice1={"Zobacz"} choice2={"Zmień"} />
      </div>
    </div>
  )

  const additionalData = (
    <>
      <textarea
        className={styles.textarea}
        placeholder="Wpisz tekst"

      ></textarea>
      <button
        style={{ width: "200px", marginLeft: "calc(100% - 200px)" }}
        className={styles.blueButt}
      >
        Zapisz zmiany
      </button>
    </>
  )

  return (
    <div className="content">
      <div className={styles.settingNavbarButt}>
        {Buttons.map((name) => (
          <button
            onClick={() => handleTabClick(name)}
            className={activeTab === name ? styles.active : ""}
            key={name}
          >
            {name}
          </button>
        ))}
      </div>

      {activeTab === "Dane podstawowe" && settingData}

      {activeTab === "Dane dodatkowe" && additionalData}
      {activeTab === "Czas pracy" && workTime}
      {activeTab === "Wnioski" && conclusions}
    </div>
  )
}

export default Settings
