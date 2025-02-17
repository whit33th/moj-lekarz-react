import { useState } from "react";
import { motion } from "framer-motion"; // Add this import
import styles from "./HowItWorks.module.css";
import img1 from "@assets/img/Frame1.svg";
import img2 from "@assets/img/Frame2.svg";
import img3 from "@assets/img/Frame3.svg";
import arrow from "@assets/img/arrowmain.svg";
import SwiperSlider from "../../../components/SwiperSlider";
import InputDropdownStas from "../../../components/Dropdown/InputDropdownStas";
import { useForm } from "react-hook-form";
import { pageConfig } from "../../../config/config";
import useStore from "../../../data/store";

function HowItWorks() {
  const { isAuth } = useStore();

  const options = ["Ortoped", "Logoped", "Surgeon"];
  const [nameInputValue, setNameInputValue] = useState();
  const [emailInputValue, setEmailInputValue] = useState();
  const [phoneInputValue, setPhoneInputValue] = useState();
  const [textareaInputValue, setTextareaInputValue] = useState();
  const { control, handleSubmit, watch } = useForm({});
  return (
    <div className={styles.howItWorks}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className={styles.descriptions}
      >
        <h1>Jak to działą?</h1>
        <div className={styles.descriptionsText}>
          <p>
            Serwis łączący w sobie wyszukiwarkę lekarzy z pełnym dostępem do
            Twoich danych medycznych. Internetowe konto pacjenta, dzięki któremu
            masz dostęp do wszystkich swoich danych medycznych.Umów wizytę,
            otrzymaj e-receptę lub e-zwolnienie bez wychodzenia z domu.
          </p>
        </div>
        {!isAuth && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <a href={pageConfig.registration}>Załóż konto</a>
          </motion.button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className={styles.howItWorksImageBlock}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.imagesBlockItem}
        >
          <div className={styles.itemImg}>
            <img src={img1} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>Załóż konto</p>
            <p>
              Utworzenie konta zapewnia dostęp do wszystkich funkcji i usług
              serwisu.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.arrow}
        >
          <img src={arrow} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.imagesBlockItem}
        >
          <div className={styles.itemImg}>
            <img src={img2} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>Zarejestruj swoją wizytę</p>
            <p>Wybierz dowolnego lekarza, termin i zarejestruj wizytę.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.arrow}
        >
          <img src={arrow} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.imagesBlockItem}
        >
          <div className={styles.itemImg}>
            <img src={img3} />
          </div>
          <div className={styles.itemText}>
            <p className={styles.itemTextTitle}>Konsultacja</p>
            <p>Gotowe! Lekarz już na Ciebie czeka.</p>
          </div>
        </motion.div>
      </motion.div>

      <div className={styles.slideblock}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.slideTitle}
        >
          Dlaczego MójLekarz?
        </motion.div>
        <SwiperSlider />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className={styles.formBlockConteiner}
      >
        <div className={styles.formBlock}>
          <h1>Jesteś firmą?</h1>
          <p>Wypełnij formularz kontaktowy i zostań naszym partnerem!</p>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Wpisz imię i nazwisko"
              value={nameInputValue}
              onChange={(e) => setNameInputValue(e.target.value)}
            />
            <div className={styles.dropdownContainer}>
              <InputDropdownStas
                control={control}
                name={"."}
                seeOptions
                options={options}
                placeholder={"Kim jestes?"}
              />
            </div>
            <input
              type="text"
              placeholder="Wpisz emailu"
              value={emailInputValue}
              onChange={(e) => setEmailInputValue(e.target.value)}
            />
            <input
              type="text"
              placeholder="Wpisz numer telefonu"
              value={phoneInputValue}
              onChange={(e) => setPhoneInputValue(e.target.value)}
            />
            <textarea
              name="text"
              placeholder="Wiadomość"
              value={textareaInputValue}
              onChange={(e) => setTextareaInputValue(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.formBtn}>
            <button>Wyślij</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default HowItWorks;
