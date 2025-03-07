import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import useSearchPrescription from "./../../api/hooks/SearchHooks/useSearchPrescription";
import useSearchPatient from "./../../api/hooks/SearchHooks/useSearchPatient";

import SearchPatientsItem from "./SearchItems/Patients";
import SearchDoctorsItem from "./SearchItems/Doctors";
import SearchPrescriptionsItem from "./SearchItems/Prescriptions";
import Skeleton from "react-loading-skeleton";
import useStore from "../../data/store";
import useSearchDoctor from "../../api/hooks/SearchHooks/useSearchDoctor";

export default function SearchResults({ ref, inputValue, formActive }) {
  const { role } = useStore();
  const [debouncedInput, setDebouncedInput] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data: searchPatients, isLoading: loadingPatients } = useSearchPatient(
    {
      query: debouncedInput,
    }
  );
  const { data: searchPrescriptions, isLoading: loadingPrescriptions } =
    useSearchPrescription({
      query: debouncedInput,
    });
  const { data: searchDoctors, isLoading: loadingDoctors } = useSearchDoctor({
    query: debouncedInput,
  });
  const loading = loadingPatients || loadingPrescriptions || loadingDoctors;

  return (
    <>
      <div
        ref={ref}
        className={`${styles.searchResults} ${
          formActive && inputValue ? styles.show : ""
        }`}
      >
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className={`${styles.searchItem} ${styles.loading}`}
            >
              <div>
                <Skeleton width={48} height={48} borderRadius={3} />
              </div>
              <p>
                <Skeleton width={200} />
              </p>
            </div>
          ))
        ) : (
          <>
            {role !== "doctor" && <SearchDoctorsItem data={searchDoctors} />}
            <SearchPatientsItem role={role} data={searchPatients} />

            {role === "doctor" && (
              <SearchPrescriptionsItem data={searchPrescriptions} />
            )}
          </>
        )}
      </div>
    </>
  );
}
