import styles from "./PatientList.module.css"
import tablecss from "../../../components/Table/Table.module.css"
import filters from "@assets/img/filters.png"
import Dropdown from "../../../components/Dropdown/Dropdown"
import Table from "../../../components/Table/Table"
import MoreInfoButtPatient from "../../../components/Buttons/MoreInfoButt/MoreInfoButt"

import useGetPatientsList from "@hooks/DoctorHooks/useGetPatientsList"
import Pagination from '../../../components/UI/Pagination/Pagination'
import { useState } from 'react'
function PatientList() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetPatientsList({
    page: page,
    select: (data) => {
      return data?.data
    }
  })

  const patients = data?.patients
  const totalPages = data?.pages


  const tableData = patients?.map((patient) => ({
    img: patient.patient.user.photo,
    name: `${patient.patient.user.first_name} ${patient.patient.user.last_name}`,
    id: patient.patient.id,
    gender: patient.patient.user.gender,
  })) || []  // Если нет данных, возвращаем пустой массив

  const columns = [
    {
      header: "Search",
      render: (item) => (
        <div className={tablecss.nameTd}>
          {item.img && <img src={item.img} alt="Avatar" className={tablecss.round} />}
          <span>{item.name || "-"}</span>
        </div>
      ),
    },
    { header: "ID", dataKey: "id" },
    { header: "Płeć", dataKey: "gender" },
    {
      header: "Akcja",
      render: (item) => (
        <MoreInfoButtPatient
          id={item.id}
          onClick={() => console.log(item.id)}
          label="More Info"
        />
      ),
    },
  ]


  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <span className={styles.calendarNavbarDate}>
          <span>Lista pacjentów</span>
        </span>
        <Dropdown
          defaultOption="Filtruj"
          selectedOptionChanging={false}
          color={"#A6DEF7"}
          options={["1", "2"]}
          type={"filter"}
        >
          <img src={filters} alt="" />
        </Dropdown>
      </div>

      <Table
        loading={isLoading}
        inputPlaceholder="Szukaj pacjenta..."
        columns={columns}
        data={tableData}
        showImage={true}
        together={true}
      />
      <Pagination total={totalPages} value={page} onChange={setPage} isLoading={isLoading} />
    </div>
  )
}

export default PatientList
