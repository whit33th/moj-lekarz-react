import { useRef, useState } from "react";
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
import Pagination from "../../UI/Pagination/Pagination";
import { toast } from "sonner";

const MoreInfoButtPatient = ({ id }) => {
  const {
    activeMoreInfoButtId,
    setActiveMoreInfoButtId,
    resetActiveMoreInfoButtId,
    setModalActive,
    setModalContent,
  } = useStore();

  const { data: documents, isLoading } = useGetDocumentsById(id);
  const { mutate: uploadDocument } = usePostDocument();
  const [currentPage, setCurrentPage] = useState(1);

  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  const isModalOpen = activeMoreInfoButtId === id;

  const openModal = () => setActiveMoreInfoButtId(id);
  const closeModal = () => resetActiveMoreInfoButtId();

  const patientId = id || "unknown";
  const openDocumentModal = () => {
    setModalActive(true);
    setModalContent(modalContent);
  };

  const closeDocumentModal = () => {
    setModalActive(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      uploadDocument({ id, file });
    } else {
      toast.error("Proszę przesłać plik PDF, DOC lub DOCX.");
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleDownloadFile = (link, filename) => {
    fetch(link)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  };

  const truncateFileName = (name) => {
    if (name.length <= 20) return name;
    const extension = name.split(".").pop();
    const baseName = name.slice(0, 20);
    return `${baseName}...${extension}`;
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
        <p className={styles.formats}>Dostępne w formatach PDF, DOC i DOCX.</p>
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
        {documents?.documents.length === 0 ? (
          <p>Brak documentow</p>
        ) : (
          documents?.documents?.map((doc, index) => (
            <li key={doc.name || index} className={styles.fileItem}>
              <div className={styles.fileIcon}></div>
              <div className={styles.fileInfo}>
                <p className={styles.fileName}>{truncateFileName(doc.name)}</p>
                <p className={styles.fileDate}>
                  {doc.createdAt
                    ? new Date(doc.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
              <div className={styles.downloadIcon}>
                <img
                  src={download}
                  onClick={() => handleDownloadFile(doc.link, doc.name)}
                  width={15}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </li>
          ))
        )}
      </ul>
      {documents?.pages > 1 && (
        <Pagination
          total={documents.pages}
          isLoading={isLoading}
          value={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
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
