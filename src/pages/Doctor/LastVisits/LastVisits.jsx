import useGetDoctorAppointment from "@hooks/DoctorHooks/useGetDoctorAppointment";
import { useState } from "react";
import Table from "../../../components/Table/Table";
import tablecss from "../../../components/Table/Table.module.css";
import useStore from "../../../data/store";
import Pagination from "./../../../components/UI/Pagination/Pagination";
import styles from "./LastVisits.module.css";

function LastVisits() {
  const { userId } = useStore();
  const [page, setPage] = useState(1);

  const [startFilter, setStartFilter] = useState("2024-01-01");
  const [endFilter, setEndFilter] = useState();
  const { data, isLoading } = useGetDoctorAppointment({
    id: userId,
    status: "completed",
    dateFrom: startFilter,
    dateTo: endFilter,
  });
  const totalPages = data?.pages;

  const appointments = data?.appointments || [];

  console.log(startFilter, endFilter);

  const tableData =
    appointments?.map((appointment) => ({
      img: appointment?.patient.photo,
      name:
        appointment?.patient?.first_name +
          " " +
          appointment?.patient?.last_name || "",
      id: appointment?.patient?.patientId || "",
      date: appointment?.date || "",
      time: appointment?.start_time || "",
    })) || [];

  console.log(appointments);
  const columns = [
    {
      header: "Search",
      render: (appointment) => (
        <div className={tablecss.nameTd}>
          {appointment.img && (
            <img
              src={appointment.img}
              alt="Avatar"
              className={tablecss.round}
            />
          )}
          <div className={styles.userInfo}>
            <p>{appointment.name || "-"}</p>
          </div>
        </div>
      ),
    },
    { header: "Numer ID", dataKey: "id" },
    { header: "Data", render: (appointment) => appointment.date },
    {
      header: "Czas",
      render: (appointment) => (
        <div>
          <div>
            <span className={tablecss.receptId}>
              {appointment.time.slice(0, 5)}
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="content">
      <div className={styles.calendarNavbar}>
        <span className={styles.calendarNavbarDate}>
          <span>Ostatnie wizyty</span>
        </span>

        <div className={styles.dateFilterContainer}>
          <div className={styles.dateFilter}>
            <input
              type="date"
              onChange={(e) => setStartFilter(e.target.value)}
            />

            <input type="date" onChange={(e) => setEndFilter(e.target.value)} />
          </div>
        </div>
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
        <Pagination
          value={page}
          onChange={setPage}
          total={totalPages}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default LastVisits;
