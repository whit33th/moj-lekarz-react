import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import useGetWorkersList from "../../../api/hooks/ClinicHooks/useGetWorkersList";
import useGetUserInfo from "../../../api/hooks/UserHooks/useGetUserInfo";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import InputDropdownStas from "../../../components/Dropdown/InputDropdownStas";
import Search from "../../../components/UI/Search/Search";
import styles from "./GraphManagement.module.css";

import useGetClinicSpecialties from "../../../api/hooks/GeneralHooks/SpecialtyHooks/useGetClinicSpecialties";

function GraphManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { data: clinic } = useGetUserInfo();
  const { control, register, watch } = useForm({
    mode: "onChange",
  });

  const selectedSpecialty = watch("specialty");
  const specialtyId = selectedSpecialty?.value;

  const { data: workersData, isLoading: isWorkersLoading } = useGetWorkersList({
    clinicId: clinic?.id,
    specialtyId: specialtyId,
  });
  const { data: specialties } = useGetClinicSpecialties({
    clinicId: clinic?.id,
  });

  const handleUserSelect = (doctor) => {
    const userInfo = {
      id: doctor.id,
      name: `${doctor.user.first_name} ${doctor.user.last_name}`,
      phone: doctor.specialty.name,
    };

    setSelectedUsers((prevSelected) =>
      prevSelected.find((u) => u.id === doctor.id)
        ? prevSelected.filter((u) => u.id !== doctor.id)
        : [...prevSelected, userInfo]
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
        doctor.user.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doctor.user.last_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
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

  const LoadingSkeleton = () => (
    <div className={styles.column}>
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={index % 2 === 0 ? styles.row : styles.rowAlt}
        >
          <div className={styles.checkboxContainer}>
            <Skeleton width={20} height={20} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <Skeleton width={200} />
            </div>
            <div className={styles.phone}>
              <Skeleton width={150} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

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
            {...register("specialty", {})}
          />
        </div>

        <BlueBtn cb={handleNextClick}>Wybierz i przejdź dalej</BlueBtn>
      </div>

      <div
        style={{ columns: hasData ? 2 : 1 }}
        className={styles.tableContainer}
      >
        {isWorkersLoading ? (
          <LoadingSkeleton />
        ) : hasData ? (
          <div className={styles.column}>
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={styles.noDataMessage}
          >
            Brak danych
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default GraphManagement;
