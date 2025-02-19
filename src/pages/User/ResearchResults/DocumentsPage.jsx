import img from "@assets/img/Vector-21.svg";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetDocuments } from "../../../api/hooks/GeneralHooks/Documents/useGetDocuments";
import styles from "./DocumentsPage.module.css";

function DocumentsPage() {
  const { data: documents, isLoading } = useGetDocuments();

  const handleDownload = (link, filename) => {
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

  const DocumentSkeleton = () => (
    <>
      {[1, 2, 3].map((index) => (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={styles.listItem}
          key={index}
        >
          <div className={styles.listItemName}>
            <Skeleton width={150} />
          </div>

          <div className={styles.listItemImg}>
            <Skeleton width={24} height={24} />
          </div>
        </motion.div>
      ))}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.researchResultsPage}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={styles.resultsMainBtnBlock}
      >
        <h1>Twoje dokumenty</h1>
      </motion.div>
      <div className={styles.resultContentBlock}>
        {isLoading ? (
          <DocumentSkeleton />
        ) : !documents?.documents?.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={styles.errorText}
          >
            Brak dokumentów
          </motion.div>
        ) : (
          documents.documents.map((doc, index) => (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={styles.listItem}
              key={doc.name || index}
            >
              <div className={styles.listItemName}>
                {truncateFileName(doc.name)}
              </div>
              <div className={styles.listItemDate}>
                {doc.createdAt
                  ? new Date(doc.createdAt).toLocaleDateString()
                  : ""}
              </div>
              <div
                onClick={() => handleDownload(doc.link, doc.name)}
                className={styles.listItemImg}
              >
                <img src={img} alt="download" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default DocumentsPage;
