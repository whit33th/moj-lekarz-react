import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style/SearchClinicPage.module.css";
import ClinicCard from "./ClinicCard";

import useGetClinics from "../../../api/hooks/ClinicHooks/useGetClinics";
import useSpecialties from "../../../api/hooks/GeneralHooks/useSpecialties";
import { useCities } from "../../../api/hooks/GeneralHooks/useCitys";
import InputDropdownStas from "../../../components/Dropdown/InputDropdownStas";
import useGetClinicSpecialties from "../../../api/hooks/GeneralHooks/SpecialtyHooks/useGetClinicSpecialties";

const arraySelectOptions = {
  select1: ["name1", "name2", "name3"],

  select4: ["NFZ", "Prywatne"],
};

function SearchClinicPage() {
  const { control, handleSubmit, watch, register } = useForm({
    mode: "onChange",
  });
  const { data, refetch } = useGetClinics({
    name: watch("name"),
    specialty: watch("specialty"),
    city: watch("city"),
  });

  const { data: cities } = useCities();
  const [cityOptions, setCityOptions] = useState(["Ladowanie"]);

  const { data: specialties } = useSpecialties();
  const [specialtyOptions, setSpecialtyOptions] = useState(["Ladowanie"]);

  const { data: clinicSpecialties } = useGetClinicSpecialties({});

  useEffect(() => {
    if (specialties) {
      setSpecialtyOptions([...new Set(specialties.map((s) => s.name))]);
    }
  }, [specialties]);
  useEffect(() => {
    if (cities) {
      setCityOptions([...new Set(cities.map((c) => c.city))]);
    }
  }, [cities]);

  const onSubmit = () => {
    refetch();
  };

  return (
    <div className={styles.clinickPage}>
      <h1>Wybierz spośród dostępnych centrów medycznych</h1>
      <div className={styles.filterBlockContentSelects}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.mainFormIntupsBlock}>
            <div className={styles.dropdownContainer}>
              <InputDropdownStas
                name="name"
                control={control}
                // options={arraySelectOptions.select1}
                // seeOptions
                object={false}
                placeholder={"Wybierz centrum medyczny"}
                {...register("name")}
              />
              {/* <InputError errorField="name" formState={formState} /> */}
            </div>

            <div className={styles.dropdownContainer}>
              <InputDropdownStas
                name="specialty"
                control={control}
                options={specialtyOptions}
                seeOptions
                object={false}
                placeholder={"Wybierz specjalizacje"}
                {...register("specialty")}
              />
              {/* <InputError errorField="specialty" formState={formState} /> */}
            </div>

            <div className={`${styles.dropdownContainer} ${styles.litle}`}>
              <InputDropdownStas
                name="city"
                control={control}
                options={cityOptions}
                seeOptions
                object={false}
                placeholder={"Wybierz miasto"}
                {...register("city")}
              />
              {/* <InputError errorField="city" formState={formState} /> */}
            </div>

            <div className={styles.filterBtnBlock}>
              <button type="submit">Szukaj terminu</button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.clinicCardsBlock}>
        {data?.clinics?.map((c, index) => (
          <ClinicCard key={index} data={c} />
        ))}
      </div>
      {data?.clinics?.length === 0 && (
        <div className={styles.nonCinicCardBlock}>
          <h1>Brak dostępnych placówek medycznych</h1>
        </div>
      )}
    </div>
  );
}

export default SearchClinicPage;
