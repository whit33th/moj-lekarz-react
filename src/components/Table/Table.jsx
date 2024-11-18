import React, { useState } from "react";
import styles from "./Table.module.css";
import searchIco from "../../assets/img/search.png";

function Table({
  columns,
  data,
  buttonProps,
  together = true,
  showImage = true,
  inputPlaceholder = null,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchColumn = columns.find((column) => column.header === "Search");
  const searchField = searchColumn?.searchId || "name";

  const filteredItems = data.filter((item) =>
    item[searchField]
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.tableContainer}>
      <table className={styles.shadow}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                {column.header === "Search" ? (
                  <div className={styles.search}>
                    <img src={searchIco} alt="search" />
                    <input
                      className={styles.searchInput}
                      placeholder={inputPlaceholder}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                ) : typeof column.header === "function" ? (
                  column.header()
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={styles.tCenter}>
                    {column.render ? (
                      column.render(item)
                    ) : column.dataKey === "img" && showImage ? (
                      item.img ? (
                        <img
                          className={styles.round}
                          src={item.img}
                          alt="Avatar"
                        />
                      ) : null
                    ) : (
                      item[column.dataKey] || "—"
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className={styles.tCenter}>
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
