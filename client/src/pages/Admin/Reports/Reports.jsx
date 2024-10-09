import Table from "../../../components/Table/Table";

function Reports() {
  return (
    <>
      <Table 
        haveNames={false}  
        data="reports, button"
				buttonProps={{
					className: "download",
					// onClick: handleButtonClick, 
					label: "Pobierz", 
				}}
        showImage={false} 
      />
    </>
  );
}

export default Reports;
