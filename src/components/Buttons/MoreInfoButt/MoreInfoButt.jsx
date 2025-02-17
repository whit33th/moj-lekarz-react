import { useRef, useEffect, useState } from "react";
import moreInfo from "@assets/img/more-info.png";
import { NavLink } from "react-router-dom";
import styles from "./MoreInfoButt.module.css";
import useStore from "../../../data/store";

import cross from "@assets/img/cross.png";
import back from "@assets/img/back.png";
import download from "@assets/img/material-symbols-light_download.svg";
import { pageConfig } from "../../../config/config";
import BlueBtn from "@components/Buttons/BlueBtn/BlueBtn";
import { useGetDocumentsById } from "../../../api/hooks/GeneralHooks/Documents/useGetDocumentsById";
import { usePostDocument } from "../../../api/hooks/GeneralHooks/Documents/usePostDocument";

const MoreInfoButtPatient = ({ id }) => {
  const {
    activeMoreInfoButtId,
    setActiveMoreInfoButtId,
    resetActiveMoreInfoButtId,
    setModalActive,
    setModalContent,
  } = useStore();

  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const { data: documents, isLoading } = useGetDocumentsById(id, isDocumentModalOpen);
  const { mutate: uploadDocument } = usePostDocument();

  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  const isModalOpen = activeMoreInfoButtId === id;

  const openModal = () => setActiveMoreInfoButtId(id);
  const closeModal = () => resetActiveMoreInfoButtId();

  const patientId = id || "unknown";
  const openDocumentModal = () => {
    setIsDocumentModalOpen(true);
    setModalActive(true);
    setModalContent(modalContent);
  };

  const closeDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setModalActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.moreInfoButt}`)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      uploadDocument({ id, file });
    } else {
      toast.error("Proszę przesłać plik PDF lub DOCX.");
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const fileUrl = "/path/to/file.pdf";
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Download.pdf";
    link.click();
    link.remove();
  };

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
  );

  const modalContent = (
    <div className={styles.fileContainer}>
      <img
        onClick={closeDocumentModal}
        className={styles.cross}
        src={cross}
        alt="back"
      />
      <div className={styles.header}>
        <h2>Wszystkie pliki</h2>
        <BlueBtn
          cb={() => setModalContent(uploadFile)}
          className={styles.addFileButton}
        >
          Dodaj nowy plik
        </BlueBtn>
      </div>
      <ul className={styles.fileList}>
        {isLoading ? (
          <p>Ładowanie...</p>
        ) : (
          documents?.map((doc, index) => (
            <li key={doc.id || index} className={styles.fileItem}>
              <div className={styles.fileIcon}></div>
              <div className={styles.fileInfo}>
                <p className={styles.fileName}>{doc.name}</p>
                <p className={styles.fileDate}>{new Date(doc.createdAt).toLocaleDateString()}</p>
              </div>
              <div className={styles.downloadIcon}>
                <img
                  src={download}
                  onClick={() => handleDownloadPDF(doc.url)}
                  width={15}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );

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
          <button style={{ textAlign: "center" }} onClick={openDocumentModal}>
            <p>Dokumenty</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreInfoButtPatient;
