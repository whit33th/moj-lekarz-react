import { useEffect, useState } from "react";
import styles from "./style/ZhaidzLekarza.module.css";
import DoctorCard from "./DoctorCard";
import { useForm } from "react-hook-form";

import DoctorCardSkeleton from "./DoctorCardSkeleton";
import Pagination from "../../../components/UI/Pagination/Pagination";
import { useCities } from "../../../api/hooks/GeneralHooks/useCitys";
import InputDropdownStas from "../../../components/Dropdown/InputDropdownStas";
import useAvailableSlots from "../../../api/hooks/PatientHooks/useAvailableSlots";
import InputError from "../../../components/UI/InputError/InputError";
import useSpecialties from "../../../api/hooks/GeneralHooks/useSpecialties";

const arraySelectOptions = {
  select2: ["Konsultacja", "Badanie"],
};

function SearchVisits() {
  const [page, setPage] = useState(1);
  const { control, register, handleSubmit, getValues, formState } = useForm({});
  const { data: fullData, isLoading } = useAvailableSlots({
    specialty: getValues('specialty'),
    date: getValues('date'),
    // type: getValues('type'),
    city: getValues('city'),
    limit: 10,
    page: page,
  });
  useEffect(() => {
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCount = fullData?.totalCount || null;
  const data = fullData?.slots || [];
  const totalPages = fullData?.pages || null;

  const { data: cities } = useCities();
  const citiesOptions = cities?.map((c) => (
    c.city
  )) || ["Ladowanie"];

  const { data: specialties } = useSpecialties();


  
  function onSubmit() {
   // just for correct work
   console.log(getValues('specialty'), getValues('date'), getValues('city'), getValues('type'));
  }

  return (
    <div className={styles.zhaidzLekarza}>
      <div className={styles.filterBlock}>
        <div className={styles.filterBlockContent}>
          <h1>Umów się na wizytę</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.filterBlockContentSelects}
          >
            <div className={styles.mainFormIntupsBlock}>
              <div className={styles.dropdownContainer}>
                <InputDropdownStas
                  control={control}
                  options={specialties?.map((s) => (s.name)) || ["Ladowanie"]}
                  placeholder={"Wybierz specjalizacje"}
                  searchParamsName={"specialty"}
                  seeOptions
                  object={false}
                  {...register("specialty"/* , { required: "Specjalizacja jest wymagana" } */)}
                />
                <InputError errorField="specialty" formState={formState} />
              </div>

              <div className={styles.dropdownContainer}>
                <InputDropdownStas
                  control={control}
                  options={citiesOptions}
                  placeholder={"Wybierz miasto"}
                  searchParamsName={"city"}
                  object={false}
                  seeOptions
                  {...register("city"/* , { required: "Miasto jest wymagane" } */)}
                />
                <InputError errorField="city" formState={formState} />
              </div>

              <div className={styles.formCalendarContainer}>
                <div className={styles.formCalendar}>
                  <input
                    type="date"
                    placeholder="Data wizyty"
                    className={styles.calendar}
                    {...register("date"/* , { required: "Data jest wymagana" } */)}
                    defaultValue={getValues("date")}
                  />
                </div>
                <InputError errorField="date" formState={formState} />
              </div>

              <div className={`${styles.dropdownContainer} ${styles.litle}`}>
                <InputDropdownStas
                  control={control}
                  options={arraySelectOptions.select2}
                  placeholder={"Typ wizyty"}
                  searchParamsName={"type"}
                  seeOptions
                  object={false}
                  {...register("type", { required: false })}
                />
                <InputError errorField="type" formState={formState} />
              </div>
            </div>
            <div className={styles.filterBtnBlock}>
              <button>Szukaj terminu</button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.zhaidzLekarzaContentBlock}>
        <div className={styles.zhaidzLekarzaContentTitle}>
          <h2>Wybierz spośród {totalCount} dostępnych specjalistów</h2>
          <button>Zobacz na mapę</button>
        </div>
      </div>
      <div className={styles.doctorsCards}>
        {isLoading ? (
          <DoctorCardSkeleton count={3} />
        ) : (
          data?.map((item) => (
            <DoctorCard
              data={item}
              key={item.doctor_id}
              // selectedDate={selectedDate}
              // addZapis={props.addZapis}
              loading={isLoading}
            />
          ))
        )}
        {data.length == 0 && (
          <div className={styles.nonDoctorCardBlock}>
            <h1>Brak dostępnych terminów</h1>
          </div>
        )}
        <Pagination
          total={totalPages}
          value={page}
          onChange={setPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default SearchVisits;
