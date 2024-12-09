import tablecss from "../../../components/Table/Table.module.css"
import calendar from "../../../assets/img/calendar.png"
import styles from "./LastVisits.module.css"

import Dropdown from "../../../components/Dropdown/Dropdown"
import Table from '../../../components/Table/Table'
import useGetDoctorAppointment from '../../../hooks/DoctorHooks/useGetDoctorAppointment'
import useStore from '../../../data/store'
import { is } from './../../../../node_modules/preact/compat/src/util'
import Pagination from './../../../components/UI/Pagination/Pagination';



function LastVisits() {
  const { userId, todayDate } = useStore()
  const { data: appointments, isLoading } = useGetDoctorAppointment({
    id: userId,
    dateFrom: '2023-11-05',
    dateTo: '2025-11-10',
  })

  const tableData = appointments?.map((appointment) => ({
    img: appointment?.patient.photo,
    name: appointment?.patient?.first_name + " " + appointment?.patient?.last_name || '',
    id: appointment?.id || '',
    date: appointment?.date || '',
    time: appointment?.start_time || '',
  })) || []

  console.log(appointments)
  const columns = [

    {
      header: "Search",
      render: (appointment) => (
        <div className={tablecss.nameTd}>
          {appointment.img && (
            <img src={appointment.img} alt="Avatar" className={tablecss.round} />
          )}
          <div className={styles.userInfo}>
            <p>{appointment.name || "-"}</p>

          </div>
        </div>
      ),
    },
    { header: 'Numer ID', dataKey: 'id' },
    { header: 'Data', render: (appointment) => (appointment.date) },
    {
      header: 'Czas', render: (appointment) => (
        <div>
          <div>
            <span className={tablecss.receptId}>{appointment.time.slice(0, 5)}</span>
          </div>
        </div>
      ),
    }

  ]

  
  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <Dropdown
          defaultOption="Sortuj"
          selectedOptionChanging={false}
          color={"#A6DEF7"}
          options={[
            "Od A do Z",
            "Od Z do A",
            "Najpierw mężczyźni",
            "Najpierw kobiety",
            "Najpierw starsi",
            "Najpierw młodsi",
          ]}
          listStyle="elipse"
        >
          <i className="bx bx-chevron-down"></i>
        </Dropdown>
        <span className={styles.calendarNavbarDate}>
          <span>Ostatnie wizyty</span>
        </span>
        <Dropdown
          color={"#A6DEF7"}
          options={["08.05.2024 - 14.05.2024", "08.06.2024 - 14.06.2024"]}
          childrenLeft={<img src={calendar} alt="Sort" />}
        >
          <i className="bx bx-chevron-down"></i>
        </Dropdown>
      </div>

      <div className={styles.tableContainer}>
        <Table
          loading={isLoading}
          inputPlaceholder={"Szukaj pacjenta..."}
          columns={columns}
          data={tableData}
          showImage={true}
          together={true}
        />
        <Pagination />
      </div>
    </div>
  )
}

export default LastVisits
