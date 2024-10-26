import React, { useState } from "react";
import styles from "./Table.module.css";
import searchIco from "../../assets/img/search.png";

function Table({
  columns, // Expecting an array of column objects
  data,
  buttonProps,
  together = true,
  showImage = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Find the search field based on the `searchId` property
  const searchColumn = columns.find((column) => column.header === "Search");
  const searchField = searchColumn?.searchId || "name";

  // Filter items based on the specified search field
  const filteredItems = data.filter((item) =>
    item[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                      placeholder={`Szukaj ${column.header.toLowerCase()}...`}
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
                      column.render(item) // Custom render function if provided
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
