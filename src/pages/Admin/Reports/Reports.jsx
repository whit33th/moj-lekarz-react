import Table from "../../../components/Table/Table"
import styles from "./Reports.module.css"
import download from "@assets/img/material-symbols-light_download.svg"
import calendar from "@assets/img/calendar.png"
import { userItems } from "../../../helpers/userItemList"
import Dropdown from "./../../../components/Dropdown/Dropdown"
function Reports() {
  const tableData = userItems.map((item) => ({
    name: item.reports,
  }))

  const fileUrl = "/path/to/file.pdf"
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = "Download.pdf"
    link.click()
    link.remove()
  }

  const columns = [
    { render: (item) => <div style={{ textAlign: "left" }}>{item.name}</div> },

    {
      render: () => <img onClick={handleDownload} src={download} width={15} />,
    },
  ]
  return (
    <>
      {/* <div className={styles.navbar}>
        <Dropdown
          options={["May 2024", "01.06.2024 - 1.07.2024"]}
          color={"#A6DEF7"}
          childrenLeft={<img src={calendar} />}
        />
      </div> */}
      <Table columns={columns} data={tableData} />
    </>
  )
}

export default Reports
