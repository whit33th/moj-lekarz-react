import React, { useState } from "react";
import { userItems } from "../../helpers/userItemList";
import styles from "./Table.module.css";
import searchIco from "../../assets/img/search.png";

function Table({
  columns,
  data,
  buttonProps,
  together = true,
  haveNames = true,
  showImage = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  
  const headersArray =
    typeof columns === "string"
      ? columns.split(",").map((name) => name.trim())
      : columns || []; // Пустой массив по умолчанию

  const dataKeysArray =
    typeof data === "string"
      ? data.split(",").map((key) => key.trim())
      : data || [];

  
  const filteredItems = userItems.filter((item) =>
    item[dataKeysArray[0]]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.tableContainer}>
      <table className={styles.shadow}>
        <thead>
          {haveNames && (
            <tr>
              {headersArray.map((header, index) => (
                <th key={index}>
                  {header === "Search" ? (
                    <div className={styles.search}>
                      <img src={searchIco} alt="search" />
                      <input
                        className={styles.searchInput}
                        placeholder="Szukaj pacjenta..."
                        type="text"
                        name="search"
                        id="client-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  ) : (
                    header
                  )}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {together ? (
                  // Объединенные ячейки
                  <td colSpan="2" className={styles.nameTd}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {showImage && item.img && (
                        <img
                          className={styles.round}
                          src={item.img}
                          alt="Avatar"
                        />
                      )}
                      
                      <span>{item[dataKeysArray[0]] || "-"}</span>
                    </div>
                  </td>
                ) : (
                  
                  <>
                    {showImage && item.img && (
                      <td className={styles.nameTd}>
                        <img
                          className={styles.round}
                          src={item.img}
                          alt="Avatar"
                        />
                      </td>
                    )}
                    <td className={styles.nameTd}>
                      <span>{item[dataKeysArray[0]] || "-"}</span>
                    </td>
                  </>
                )}
                {dataKeysArray.slice(1).map((key, colIndex) => (
                  <td key={colIndex + 1} className={styles.tCenter}>
                    {key === "button" ? (
                      <button
                        className={buttonProps.className}
                        onClick={() => buttonProps.onClick(item.id)}
                      >
                        {buttonProps.label || "Action"}
                      </button>
                    ) : (
                      item[key] || "—"
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headersArray.length} className={styles.tCenter}>
                Brak dostępnych danych
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
