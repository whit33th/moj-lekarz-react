import { useState, useRef } from "react";
import moreInfo from "../../../assets/img/more-info.png";
import { NavLink } from "react-router-dom";
import styles from "./MoreInfoButt.module.css";
import useStore from "../../../data/store";
import BlueBorderBtn from "../BlueBorderBtn/BlueBorderBtn";
import { toast } from "sonner";

const MoreInfoButtPatient = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setModalActive, setModalContent } = useStore();
  const fileInputRef = useRef(null);

  // Toggle the modal for More Info dropdown
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Function to handle file upload
  const handleFileChange = (e) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a file upload process
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      toast.promise(promise, {
        loading: "Wysyłanie pliku...",
        success: `Plik ${file.name} został pomyślnie przesłany.`,
        error: "Wystąpił błąd podczas przesyłania pliku.",
      });
    } else {
      toast.error("Proszę przesłać plik PDF.");
    }
  };

  // Function to trigger the hidden file input when drop area is clicked
  const handleFileClick = () => {
    fileInputRef.current.click(); // Open file picker dialog
  };

  // Function to download PDF (replace with actual logic)
  const handleDownloadPDF = (fileName) => {
    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => (Math.random() < 0.7 ? resolve() : reject()), 1000); // Simulating a download action
      });

    toast.promise(promise, {
      loading: "Pobieranie pliku...",
      success: `Plik ${fileName} został pobrany.`,
      error: "Plik jest uszkodzony.",
    });
  };

  // Files for the document modal
  const files = [
    { name: "Dokument 1.pdf", date: "12.08.2023" },
    { name: "Dokument 2.pdf", date: "12.08.2023" },
    { name: "Dokument 3.pdf", date: "12.08.2023" },
    { name: "Dokument 4.pdf", date: "12.08.2023" },
    { name: "Dokument 5.pdf", date: "12.08.2023" },
  ];

  // Modal content for displaying files
  const uploadFile = (
    <div className={styles.fileContainer}>
      <div className={styles.header}>
        <h2 style={{ textAlign: "center", width: "100%" }}>Dodaj plik</h2>
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
  );

  const modalContent = (
    <div className={styles.fileContainer}>
      <div className={styles.header}>
        <h2>Wszystkie pliki</h2>
        <button
          onClick={() => setModalContent(uploadFile)}
          className={styles.addFileButton}
        >
          Dodaj nowy plik
        </button>
      </div>
      <ul className={styles.fileList}>
        {files.map((file, index) => (
          <li key={index} className={styles.fileItem}>
            <div className={styles.fileIcon}></div>
            <div className={styles.fileInfo}>
              <p className={styles.fileName}>{file.name}</p>
              <p className={styles.fileDate}>{file.date}</p>
            </div>
            <div className={styles.downloadIcon}>
              <i
                onClick={() => handleDownloadPDF(file.name)}
                className="bx bxs-download hover"
              ></i>
            </div>
          </li>
        ))}
      </ul>

      <BlueBorderBtn cb={() => setModalActive(false)}>Back</BlueBorderBtn>
    </div>
  );

  const openDocumentModal = () => {
    setModalActive(true);
    setModalContent(modalContent);
  };

  const patientId = id || "unknown"; // Handle undefined id here
  console.log("Patient ID in MoreInfoButt:", patientId); // Add this log for debugging

  return (
    <div
      className={styles.moreInfoButt}
      onClick={toggleModal}
      style={{ cursor: "pointer" }}
    >
      <img src={moreInfo} alt="More Info" />
      {isModalOpen && (
        <div className={styles.moreInfoModal}>
          <NavLink
            to={`/patient-info/${patientId}`}
            className={styles.hoverOpacity}
          >
            <p style={{ fontWeight: "500" }}>Informacja</p>
          </NavLink>

          <button onClick={openDocumentModal} className={styles.hoverOpacity}>
            <p style={{ fontWeight: "500" }}>Dokumenty</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreInfoButtPatient;
