import { useState } from "react"
import styles from "./PatientInfo.module.css"

import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn"
import { useNavigate, useParams } from "react-router-dom"
import useStore from "./../../../data/store"
import PatientMoreInfoModal from "../../../components/Modals/PatientMoreInfoModal/PatientMoreInfoModal"
import useGetPatientInfo from '../../../hooks/DoctorHooks/useGetPatientInfo'
import Tabs from './../../../components/Buttons/Tabs/Tabs'
import Skeleton from 'react-loading-skeleton'
import grey from "./../../../assets/img/grey.png"

function PatientInfo() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("Uwagi")
  const Buttons = ["Uwagi", "Historia wizyt"]

  const navigate = useNavigate()

  const { setModalActive, setModalContent } = useStore()

  const { data: patient, isError, isLoading } = useGetPatientInfo(id)


  if (isError || typeof id !== "string") {
    navigate("/*")
  }


  const patientInfo = {
    name: isLoading ? "Ładowanie..." : patient?.user?.first_name || "Brak",
    surname: isLoading ? "Ładowanie..." : patient?.user?.last_name || "Brak",
    photo: isLoading ? "Ładowanie..." : patient?.user?.photo || "zdrowie.png",
    gender: isLoading ? "Ładowanie..." : patient?.user?.gender || "Brak",
    pesel: isLoading ? "Ładowanie..." : patient?.user?.pesel || "Brak",
    birthday: isLoading ? "Ładowanie..." : patient?.user?.birthday.slice(0, 10) || "Brak",
    postCode: isLoading ? "Ładowanie..." : patient?.user?.post_code || "Brak",
    house: isLoading ? "Ładowanie..." : patient?.user?.address?.house || "Brak",
    flat: isLoading ? "Ładowanie..." : patient?.user?.address?.flat || "Brak",
    street: isLoading ? "Ładowanie..." : patient?.user?.address?.street || "Brak",
    city: isLoading ? "Ładowanie..." : patient?.user?.address?.city || "Brak",
    height: isLoading ? "Ładowanie..." : patient?.user?.height || "Brak",
    weight: isLoading ? "Ładowanie..." : patient?.user?.weight || "Brak",
    tel: isLoading ? "Ładowanie..." : patient?.user?.phone || "Brak",
    comments: patient?.user?.comments || null,
    history: patient?.user?.history || null,
    email: isLoading ? "Ładowanie..." : patient?.user?.email || "Brak",
  }


  const comments = patientInfo?.comments ? (
    patientInfo.comments.map((comment, index) => (
      <div key={index}>
        <span>{comment.name}</span>
        <div className={styles.commentsType}>{comment.type}</div>
      </div>
    ))
  ) : (
    <div>Brak uwag</div>
  )

  const history = patientInfo?.history ? (
    patientInfo.history.map((visit, index) => (
      <div key={index}>
        <span>{visit.doctor}</span>
        <span className={styles.grey}>{visit.name}</span>
        <span>{visit.date}</span>
      </div>
    ))
  ) : (
    <div>Brak historii wizyt</div>
  )

  function handleTabClick(name) {
    setActiveTab(name)
  }

  function handleModal() {
    setModalActive(true)
    setModalContent(<PatientMoreInfoModal patientInfo={patientInfo} />)
  }

  return (
    <div className={styles.profilDiv}>
      <div className={styles.topPhoto}>
        <img src={isLoading ? grey : patientInfo?.photo} alt="Profile" />
        <h1 style={{ margin: "0" }}>{isLoading ? <Skeleton width={300} /> : patientInfo?.name + " " + patientInfo?.surname}</h1>
        <p className={styles.grey}>{isLoading ? <Skeleton width={250} /> : patientInfo?.tel}</p>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.profilInfo}>
        <div className={styles.mainInfo}>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="name">Imię</label>
              <input
                type="text"
                id="name"
                name="name"
                value={patientInfo?.name}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="surname">Nazwisko</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={patientInfo?.surname}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="pesel">PESEL</label>
              <input
                type="text"
                id="pesel"
                name="pesel"
                value={patientInfo?.pesel}
                readOnly
              />
            </div>
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="date">Data urodzenia</label>
              <input
                type="text"
                id="date"
                name="date"
                value={patientInfo?.birthday}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="city">Miasto</label>
              <input
                type="text"
                id="city"
                name="city"
                value={patientInfo?.city}
                readOnly
              />
            </div>
            <div className={styles.row}>
              <div>
                <label htmlFor="house-nr">Nr. Domu</label>
                <input
                  type="text"
                  id="house-nr"
                  name="house-nr"
                  value={patientInfo?.house}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="flat-nr">Nr. Lokalu</label>
                <input
                  type="text"
                  id="flat-nr"
                  name="flat-nr"
                  value={patientInfo?.flat}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="address">Adres</label>
              <input
                type="text"
                id="address"
                name="address"
                value={patientInfo?.street}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="postcode">Kod posztowy</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={patientInfo?.postCode}
                readOnly
              />
            </div>

            <div className={styles.row}>
              <div>
                <label htmlFor="height">Wzrost</label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={patientInfo?.height}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="weight">Waga</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={patientInfo?.weight}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className={styles.oneThird}>
            <div></div>
            <div></div>
            <div>
              <BlueBtn cb={handleModal}>Więcej informacji</BlueBtn>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.rules}>
        <div className={styles.center}>

          <Tabs buttons="Uwagi, Historia wizyt" activeTab={activeTab} onTabClick={handleTabClick} />

        </div>
        {activeTab === "Uwagi" && comments}
        {activeTab === "Historia wizyt" && history}
      </div>
    </div>
  )
}

export default PatientInfo
