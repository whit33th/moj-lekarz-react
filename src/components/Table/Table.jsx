import React, { useState } from "react"
import styles from "./Table.module.css"
import searchIco from "@assets/img/search.png"
import Skeleton from 'react-loading-skeleton'

function Table({
  loading = false,
  columns,
  data = [],
  buttonProps,
  together = true,
  showImage = true,
  inputPlaceholder = null,
}) {
  const [searchTerm, setSearchTerm] = useState("")

  const searchColumn = columns.find((column) => column.header === "Search")
  const searchField = searchColumn?.searchId || "name"

  const filteredItems = Array.isArray(data)
    ? data.filter((item) =>
      item[searchField]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    : []



  return (
    <>

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

            {loading ?

              Array(10).fill(0).map((_, index) => (
                <tr key={index}>
                  <td colSpan={columns.length + 1} className={styles.tCenter}>
                    <Skeleton height={57} />
                  </td>
                </tr>
              ))
              :
              filteredItems.length > 0 ? (
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
                <tr style={{ borderRadius: "0 0 20px 20px " }}>
                  <td style={{ borderRadius: "0 0 20px 20px " }} colSpan={columns.length + 1} className={styles.tCenter}>
                    Brak dostępnych danych
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
