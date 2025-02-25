import Table from "@components/Table/Table";
import tablecss from "@components/Table/Table.module.css";
import Pagination from "@components/UI/Pagination/Pagination";
import useStore from "@data/store";
import useGetDoctorAppointment from "@hooks/DoctorHooks/useGetDoctorAppointment";
import { useState } from "react";
import styles from "./TodaysVisits.module.css";

function TodaysVisits() {
  const { userId, selectedDate, todayDate, selectedDateInWords } = useStore();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetDoctorAppointment({
    id: userId,
    dateFrom: selectedDate,
    dateTo: selectedDate,
    page: page,
  });

  const appointments = data?.appointments || [];
  const totalPages = data?.pages;

  const tableData =
    appointments?.map((appointment) => ({
      img: appointment?.patient.photo,
      name:
        appointment?.patient?.first_name +
          " " +
          appointment?.patient?.last_name || "",
      id: appointment?.id || "",
      date: appointment?.date || "",
      time: appointment?.start_time || "",
    })) || [];

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
          <div className={tablecss.userInfo}>
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
          {selectedDate !== todayDate ? (
            "Wizyty " + selectedDateInWords
          ) : (
            <span>Dzisiejsze wizyty </span>
          )}
        </span>
      </div>

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
  );
}

export default TodaysVisits;
