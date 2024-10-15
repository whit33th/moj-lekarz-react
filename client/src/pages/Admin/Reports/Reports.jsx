import Table from "../../../components/Table/Table";
import { userItems } from "../../../helpers/userItemList";
import styles from "./Reports.module.css";
import download from "../../../assets/img/pobierz.svg";
import React from "react";
import { toast } from "sonner";
function Reports() {
  const tableData = userItems.map((item) => ({
    name: item.reports,
  }));

  function handleDownload(){
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000))
    toast.promise(promise, {
    loading: "Pobranie pliku...",
    success: `Plik  został pomyślnie pobrany.`,
    error: "Wystąpił błąd podczas pobrania pliku."})
  }

  const columns = [
    {render: (item) => (<div style={{textAlign: 'left'}}>{item.name}</div>)},

    { render: () => <i onClick={handleDownload}  className="bx bxs-download hover"></i> },
  ];
  return (
    <>
      <Table columns={columns} data={tableData} />
    </>
  );
}

export default Reports;
