import React, { useState, useEffect } from "react"
import styles from "./VisitsPageTwo.module.css"
import VisitsCardTwo from "./VisitsCardTwo"
import { NavLink } from "react-router-dom"
import img1 from "@assets/img/image1.svg"
import img2 from "@assets/img/image2.svg"
import { useNavigate } from "react-router-dom"
import { pageConfig } from '../../../config/config'
import QRCode from 'react-qr-code'

const dataVisits = [
  {
    id: 0,
    date: "19.07.2023",
    time: "19:00 - 19:15",
    doctorName: "Ania Kaczmarska",
    doctorType: "Ortoped",
    clinicalName: "NZOZ Poznańskie Centrum Zdrowia",
    clinicalAddress: "Osiedle Zwycięstwa 108",
    phone: "234 000 211",
    serviceName: "Konsultacja ginekologiczna",
    servicePrice: "290,00 zł",
    rodzajWizyty: "Prywatna",
  },
  {
    id: 1,
    date: "19.07.2023",
    time: "19:00 - 19:15",
    doctorName: "Ania Kaczmarska",
    doctorType: "Ortoped",
    clinicalName: "NZOZ Poznańskie Centrum Zdrowia",
    clinicalAddress: "Osiedle Zwycięstwa 108",
    phone: "234 000 211",
    serviceName: "Konsultacja ginekologiczna",
    servicePrice: "290,00 zł",
    rodzajWizyty: "Prywatna",
  },
]

function VisitsPageTwo({ isLoggedIn }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/auth/")
    }
  }, [])
  return (
    <div className={styles.visitsPageTwo}>
      <h1>Zaplanowane wizyty</h1>
      <div className={styles.visitsListBlock}>
        {dataVisits.map((item) => (
          <VisitsCardTwo data={item} key={item.id} />
        ))}
        <div className={styles.visitsBtnBlock}>
          <NavLink to={pageConfig.patient.searchDoctor} className={styles.visitsAddBtn}>
            Dodaj wizytę <span></span>
          </NavLink>
        </div>
      </div>
      <div className={styles.visitsMobileQrBlock}>
        <div className={styles.visitsPageRight}>
          <p>Bądź zawsze na bieżąco!</p>
          <p>Pobierz aplikację mobilną z planem wizyt od MyLekarz!</p>
          <div className={styles.visitsPageRightIcons}>
            <a href="#">
              <img src={img2} />
            </a>
            <a href="#">
              <img src={img1} />
            </a>
          </div>
          <div className={styles.qrBlock}>
            <div className={styles.qr}>
              <QRCode value='https://mojlekarz.netlify.app' style={{ height: "100%", width: "100%" }}></QRCode>
            </div>

            <p>Zeskanuj kod i pobierz</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VisitsPageTwo
