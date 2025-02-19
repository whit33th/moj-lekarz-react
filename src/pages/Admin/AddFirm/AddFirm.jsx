import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import usePostClinic from "../../../api/hooks/ClinicHooks/usePostClinic";
import BlueBorderBtn from "../../../components/Buttons/BlueBorderBtn/BlueBorderBtn";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import RedBorderBtn from "../../../components/Buttons/RedBorderBtn/RedBorderBtn";
import Choice from "../../../components/Modal/Choice";
import useStore from "../../../data/store";
import DropdownStas from "./../../../components/Dropdown/DropdownStas";
import styles from "./AddFirm.module.css";

export default function AddFirm() {
  const { setModalActive, setModalContent } = useStore();
  const { mutate, isPending } = usePostClinic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      province: "",
      city: "",
      post_index: "",
      street: "",
      home: "",
      nip: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  function deleteAccountStatus() {
    toast.success("Profil został usunięty");
    setModalActive(false);
  }
  const modalContentDeleteAccount = (
    <>
      <h1>Usuwanie konta</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <DropdownStas
          control={control}
          name={"."}
          placeholder={"Jakub Witold Jagoda"}
        />
        <DropdownStas
          control={control}
          name={".."}
          placeholder={"Wpisz tekst"}
          options={["NFZ", " Prywatna"]}
        />
        <Choice
          choice1={"Anuluj"}
          choice2={"Usuń"}
          cb1={() => setModalActive(false)}
          cb2={() => setModalContent(acceptDeleting)}
        ></Choice>
      </div>
    </>
  );
  const acceptDeleting = (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Czy na pewno chcesz <br /> Usunąć konto?
      </h1>
      <div className={styles.actions}>
        <BlueBorderBtn cb={() => setModalContent(modalContentDeleteAccount)}>
          Nie
        </BlueBorderBtn>
        <RedBorderBtn cb={deleteAccountStatus}>Tak</RedBorderBtn>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <div className={styles.background}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.container}>
            <div className={styles.infoGridTwo}>
              <div className={styles.infoGroup}>
                <label>Nazwa firmy</label>
                <input
                  {...register("name", {
                    required: "Nazwa firmy jest wymagana",
                  })}
                  placeholder="Wpisz nazwę"
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name.message}</span>
                )}
              </div>

              <div className={styles.infoGroup}>
                <label>Województwo</label>
                <input
                  {...register("province", {
                    required: "Województwo jest wymagane",
                  })}
                  placeholder="Wielkopolskie"
                />
                {errors.province && (
                  <span className={styles.error}>
                    {errors.province.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoGroup}>
                <label>Miasto</label>
                <input
                  {...register("city", { required: "Miasto jest wymagane" })}
                  placeholder="Poznań"
                />
                {errors.city && (
                  <span className={styles.error}>{errors.city.message}</span>
                )}
              </div>

              <div className={styles.infoGroup}>
                <label>Kod pocztowy</label>
                <input
                  {...register("post_index", {
                    required: "Kod pocztowy jest wymagany",
                    pattern: {
                      value: /^\d{5}$/,
                      message: "Nieprawidłowy format kodu pocztowego: XXXXX",
                    },
                  })}
                  placeholder="61-714"
                />
                {errors.post_index && (
                  <span className={styles.error}>
                    {errors.post_index.message}
                  </span>
                )}
              </div>

              <div className={styles.infoGroup}>
                <label>Ulica</label>
                <input
                  {...register("street", { required: "Ulica jest wymagana" })}
                  placeholder="Wpisz nazwę ulicy"
                />
                {errors.street && (
                  <span className={styles.error}>{errors.street.message}</span>
                )}
              </div>

              <div className={styles.infoGroup}>
                <label>Numer budynku</label>
                <input
                  {...register("home", {
                    required: "Numer budynku jest wymagany",
                  })}
                  placeholder="Wpisz numer budynku"
                />
                {errors.home && (
                  <span className={styles.error}>{errors.home.message}</span>
                )}
              </div>

              <div className={styles.infoGroup}>
                <label>Numer NIP</label>
                <input
                  {...register("nip", {
                    required: "NIP jest wymagany",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "NIP musi składać się z 10 cyfr",
                    },
                  })}
                  placeholder="Wpisz numer NIP"
                />
                {errors.nip && (
                  <span className={styles.error}>{errors.nip.message}</span>
                )}
              </div>
              <div className={styles.infoGroup}>
                <label>Numer licencji</label>
                <input
                  {...register("nr_license", {
                    required: "Numer licencji jest wymagany",
                    pattern: {
                      value: /^NR-\d{6}$/,
                      message:
                        "Format numeru licencji: NR-XXXXXX (gdzie X to cyfra)",
                    },
                  })}
                  placeholder="NR-123456"
                />
                {errors.nr_license && (
                  <span className={styles.error}>
                    {errors.nr_license.message}
                  </span>
                )}
              </div>

              <div className={styles.infoGroup}>
                <label>Telefon</label>
                <input
                  {...register("phone", {
                    required: "Telefon jest wymagany",
                    pattern: {
                      value: /^\d{9}$/,
                      message: "Nieprawidłowy format numeru telefonu",
                    },
                  })}
                  placeholder="555666777"
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone.message}</span>
                )}
              </div>

              <div className={styles.infoGroup}>
                <label>Email</label>
                <input
                  {...register("email", {
                    required: "Email jest wymagany",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Nieprawidłowy format email",
                    },
                  })}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>

              <div className={styles.infoGroup}>
                <label>Hasło</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Hasło jest wymagane",
                    minLength: {
                      value: 8,
                      message: "Hasło musi mieć minimum 8 znaków",
                    },
                  })}
                  placeholder="Wprowadź hasło"
                />
                {errors.password && (
                  <span className={styles.error}>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <BlueBtn disabled={isPending}>
              {isPending ? "Zapisywanie..." : "Dodaj firmę"}
            </BlueBtn>
          </div>

          {/* <div className={styles.infoGridTwo}>
            <div className={styles.infoGroup}>
              <label>Typy wizyt</label>
              <DropdownStas
                options={visitTypeOptions}
                control={control}
                name="visit_type"
                placeholder={getDropdownPlaceholder()}
                disabled={selectedTypes.length >= 2}
              />
            </div>
          </div>

          {selectedTypes.length > 0 && (
            <div className={styles.selectedTypesContainer}>
              <label>Wybrane typy:</label>
              <div className={styles.selectedTypes}>
                {selectedTypes.map((type) => (
                  <div key={type} className={styles.typeChip}>
                    <span>{type}</span>
                    <button
                      type="button"
                      onClick={() => removeVisitType(type)}
                      className={styles.removeTypeBtn}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </form>
      </div>
    </motion.div>
  );
}
