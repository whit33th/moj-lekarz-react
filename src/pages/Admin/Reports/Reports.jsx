import Table from "../../../components/Table/Table";
import styles from "./Reports.module.css";
import download from "@assets/img/material-symbols-light_download.svg";
import { useState } from "react";
import useAdminReport from "../../../api/hooks/GeneralHooks/Stats/adminReport";

function Reports() {
  const getCurrentMonthRange = () => {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    };
  };

  const { start, end } = getCurrentMonthRange();
  const [startFilter, setStartFilter] = useState(start);
  const [endFilter, setEndFilter] = useState(end);
  
  const { downloadReport, isLoading } = useAdminReport({
    startDate: startFilter,
    endDate: endFilter,
  });

  const tableData = [{
    name: "Raport systemowy"
  }];

  const columns = [
    { render: (item) => <div style={{ textAlign: "left" }}>{item.name}</div> },
    {
      render: () => (
        <img 
          onClick={downloadReport} 
          src={download} 
          width={15} 
          style={{ cursor: isLoading ? 'wait' : 'pointer' }}
          alt="Download report"
        />
      ),
    },
  ];

  return (
    <>
      <div className={styles.dateFilterContainer}>
        <div className={styles.dateFilter}>
          <input 
            type="date" 
            value={startFilter} 
            onChange={(e) => setStartFilter(e.target.value)} 
          />
          <input 
            type="date" 
            value={endFilter} 
            onChange={(e) => setEndFilter(e.target.value)} 
          />
        </div>
      </div>
      <Table columns={columns} data={tableData} />
    </>
  );
}

export default Reports;
