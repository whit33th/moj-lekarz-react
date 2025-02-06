import { useState, useMemo } from "react";
import styles from "./GraphManagement.module.css";
import DropdownStas from "../../../components/Dropdown/DropdownStas";
import Search from "../../../components/UI/Search/Search";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputDropdownStas from "../../../components/Dropdown/InputDropdownStas";
import useGetWorkersList from "../../../api/hooks/ClinicHooks/useGetWorkersList";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import useGetClinicServices from "../../../api/hooks/ServicesHooks/useGetClinicServices";

function GraphManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { data: clinic } = useGetUserInfo();
  const { data: workersData } = useGetWorkersList({ clinicId: clinic?.id });
  const { data: specialties } = useGetClinicServices({ clinicId: clinic?.id });

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.find((u) => u.id === user.id)
        ? prevSelected.filter((u) => u.id !== user.id)
        : [...prevSelected, user]
    );
  };

  const specialtyOptions = useMemo(() => {
    if (!specialties?.length) return [];
    return specialties.map((spec) => ({
      label: spec.name || "",
      value: spec.id,
    }));
  }, [specialties]);

  const filteredDoctors =
    workersData?.doctors?.filter(
      (doctor) =>
        doctor.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const navigate = useNavigate();

  async function handleNextClick() {
    if (selectedUsers.length) {
      navigate("/graph/manage", { state: { selectedUsers } });
    } else {
      const { toast } = await import("sonner");
      toast.error("Proszę wybrać pracownika.");
    }
  }

  const hasData = filteredDoctors.length > 0;

  const { control, handleSubmit, register } = useForm({
    mode: "onChange",
  });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Search
          placeholder={"Szukaj pracownika..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.specializationField}>
          <InputDropdownStas
            seeOptions
            object={true}
            control={control}
            options={specialtyOptions}
            placeholder="Wybierz specjalizacje"
            {...register("zxc", {})}
          />
        </div>

        <BlueBtn cb={handleNextClick}>Wybierz i przejdź dalej</BlueBtn>
      </div>

      {}
      <div
        style={{ columns: hasData ? 2 : 1 }}
        className={styles.tableContainer}
      >
        {hasData ? (
          <div className={styles.column}>
            {filteredDoctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className={index % 2 === 0 ? styles.row : styles.rowAlt}
              >
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.some((u) => u.id === doctor.id)}
                    onChange={() => handleUserSelect(doctor)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
                <div className={styles.info}>
                  <div className={styles.name}>
                    {`${doctor.user.first_name} ${doctor.user.last_name}`}
                  </div>
                  <div className={styles.phone}>{doctor.specialty.name}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noDataMessage}>Brak danych</div>
        )}
      </div>
    </div>
  );
}

export default GraphManagement;
