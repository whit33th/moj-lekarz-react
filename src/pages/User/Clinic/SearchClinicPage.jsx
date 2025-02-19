import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGetClinics from "../../../api/hooks/ClinicHooks/useGetClinics";
import { useCities } from "../../../api/hooks/GeneralHooks/useCitys";
import useSpecialties from "../../../api/hooks/GeneralHooks/useSpecialties";
import InputDropdownStas from "../../../components/Dropdown/InputDropdownStas";
import ClinicCard from "./ClinicCard";
import ClinicCardSkeleton from "./ClinicCardSkeleton";
import styles from "./style/SearchClinicPage.module.css";

const arraySelectOptions = {
  select1: ["name1", "name2", "name3"],
  select4: ["NFZ", "Prywatne"],
};

function SearchClinicPage() {
  const { control, handleSubmit, watch, register } = useForm({
    mode: "onChange",
  });
  const { data, refetch, isLoading } = useGetClinics({
    name: watch("name"),
    specialty: watch("specialty"),
    city: watch("city"),
  });

  const { data: cities } = useCities();
  const [cityOptions, setCityOptions] = useState(["Ladowanie"]);

  const { data: specialties } = useSpecialties();
  const [specialtyOptions, setSpecialtyOptions] = useState(["Ladowanie"]);

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
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        Wybierz spośród dostępnych centrów medycznych
      </motion.h1>
      <div className={styles.filterBlockContentSelects}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.mainFormIntupsBlock}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className={styles.dropdownContainer}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className={styles.dropdownContainer}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`${styles.dropdownContainer} ${styles.litle}`}
            >
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
            </motion.div>

            {/* <div className={styles.filterBtnBlock}>
              <button type="submit">Szukaj terminu</button>
            </div> */}
          </div>
        </form>
      </div>
      <div className={styles.clinicCardsBlock}>
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => <ClinicCardSkeleton key={index} />)
          : data?.clinics?.map((c, index) => (
              <ClinicCard key={index} data={c} />
            ))}
      </div>
      {!isLoading && data?.clinics?.length === 0 && (
        <div className={styles.nonCinicCardBlock}>
          <h1>Brak dostępnych placówek medycznych</h1>
        </div>
      )}
    </div>
  );
}

export default SearchClinicPage;
