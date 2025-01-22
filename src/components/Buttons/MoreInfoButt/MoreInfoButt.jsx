import { useRef, useEffect } from "react"
import moreInfo from "@assets/img/more-info.png"
import { NavLink } from "react-router-dom"
import styles from "./MoreInfoButt.module.css"
import useStore from "../../../data/store"

import cross from "@assets/img/cross.png"
import back from "@assets/img/back.png"
import download from "@assets/img/material-symbols-light_download.svg"
import { pageConfig } from '../../../config/config'
const MoreInfoButtPatient = ({ id }) => {
  const {
    activeMoreInfoButtId,
    setActiveMoreInfoButtId,
    resetActiveMoreInfoButtId,
    setModalActive,
    setModalContent,
  } = useStore()

  const fileInputRef = useRef(null)
  const modalRef = useRef(null)

  const isModalOpen = activeMoreInfoButtId === id

  const openModal = () => setActiveMoreInfoButtId(id)
  const closeModal = () => resetActiveMoreInfoButtId()

  const patientId = id || "unknown"
  // const openDocumentModal = () => {
  //   setModalActive(true)
  //   setModalContent(modalContent)
  // }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.moreInfoButt}`)
      ) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  const handleFileChange = async (e) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000))
    const file = e.target.files[0]
    const { toast } = await import("sonner")
    if (file && file.type === "application/pdf") {
      toast.promise(promise, {
        loading: "Wysyłanie pliku...",
        success: `Plik ${file.name} został pomyślnie przesłany.`,
        error: "Wystąpił błąd podczas przesyłania pliku.",
      })
    } else {
      toast.error("Proszę przesłać plik PDF.")
    }
  }

  const handleFileClick = () => {
    fileInputRef.current.click()
  }

  const fileUrl = "/path/to/file.pdf"
  const handleDownloadPDF = () => {
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = "Download.pdf"
    link.click()
    link.remove()
  }

  // const files = [
  //   { name: "Dokument 1.pdf", date: "12.08.2023" },
  //   { name: "Dokument 2.pdf", date: "12.08.2023" },
  //   { name: "Dokument 3.pdf", date: "12.08.2023" },
  //   { name: "Dokument 4.pdf", date: "12.08.2023" },
  //   { name: "Dokument 5.pdf", date: "12.08.2023" },
  // ]

  const uploadFile = (
    <div className={styles.fileContainer}>
      <img
        onClick={() => setModalActive(false)}
        className={styles.cross}
        src={cross}
        alt="close"
      />
      <img
        onClick={() => setModalContent(modalContent)}
        className={styles.back}
        src={back}
        alt="back"
      />
      <div className={styles.header}>
        <h2 style={{ margin: "0", textAlign: "center", width: "100%" }}>
          Dodaj plik
        </h2>
      </div>
      <div className={styles.dropFile} onClick={handleFileClick}>
        <i className="bx bx-cloud-upload"></i>
        <p>Kliknij albo upuść plik tutaj</p>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  )

  // const modalContent = (
  //   <div className={styles.fileContainer}>
  //     <img
  //       onClick={() => setModalActive(false)}
  //       className={styles.cross}
  //       src={cross}
  //       alt="back"
  //     />
  //     <div className={styles.header}>
  //       <h2>Wszystkie pliki</h2>
  //       <button
  //         onClick={() => setModalContent(uploadFile)}
  //         className={styles.addFileButton}
  //       >
  //         Dodaj nowy plik
  //       </button>
  //     </div>
  //     <ul className={styles.fileList}>
  //       {files.map((file, index) => (
  //         <li key={index} className={styles.fileItem}>
  //           <div className={styles.fileIcon}></div>
  //           <div className={styles.fileInfo}>
  //             <p className={styles.fileName}>{file.name}</p>
  //             <p className={styles.fileDate}>{file.date}</p>
  //           </div>
  //           <div className={styles.downloadIcon}>
  //             <img
  //               src={download}
  //               onClick={() => handleDownloadPDF(file.name)}
  //               width={15}
  //             />
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // )

  return (
    <div
      className={styles.moreInfoButt}
      onClick={() => (isModalOpen ? closeModal() : openModal())}
      style={{ cursor: "pointer" }}
    >
      <img src={moreInfo} alt="More Info" />
      {isModalOpen && (
        <div ref={modalRef} className={styles.moreInfoModal}>
          <NavLink
            to={pageConfig.doctor.patientInfo.replace(":id", patientId)}
            className={styles.hoverOpacity}
          >
            <p style={{ fontWeight: "500" }}>Informacja</p>
          </NavLink>

          
        </div>
      )}
    </div>
  )
}

export default MoreInfoButtPatient
