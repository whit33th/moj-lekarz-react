import img13 from "@assets/img/Group (2).svg";
import img21 from "@assets/img/Group (3).svg";
import imgfirstBlock1 from "@assets/img/Group 5.svg";
import imgfirstBlock2 from "@assets/img/Group 6.svg";
import img7 from "@assets/img/Vector (25).svg";
import img8 from "@assets/img/Vector (26).svg";
import img9 from "@assets/img/Vector (27).svg";
import img10 from "@assets/img/Vector (28).svg";
import img11 from "@assets/img/Vector (29).svg";
import img12 from "@assets/img/Vector (30).svg";
import img5 from "@assets/img/Vector311.svg";
import img16 from "@assets/img/Vector77.svg";
import img17 from "@assets/img/Vector78.svg";
import img18 from "@assets/img/Vector79.svg";
import img19 from "@assets/img/Vector80.svg";
import img20 from "@assets/img/Vector81.svg";
import vector from "@assets/img/Vector9.svg";
import img14 from "@assets/img/Vectorprice.svg";
import cloud from "@assets/img/cloud.png";
import img15 from "@assets/img/ri_user-settings-line.svg";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import InputDropdownStas from "../../components/Dropdown/InputDropdownStas";
import { sendFormData } from "../../helpers/apiService";
import PartnersSlider from "./../../components/PartnersSlider";
import styles from "./style/Firm.module.css";

function Firm() {
  const [nameInputValue, setNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [textareaInputValue, setTextareaInputValue] = useState("");

  const [priceSliderState, setPriceSliderState] = useState("Dla specjalistów");

  const [questionOne, setQuestionOne] = useState(false);
  const [questionTwo, setQuestionTwo] = useState(false);
  const [questionThree, setQuestionThree] = useState(false);

  const { control } = useForm({});

  const options = ["Ortoped", "Logoped", "Surgeon"];

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = {
        name: nameInputValue,
        email: emailInputValue,
        phone: phoneInputValue,
        message: textareaInputValue,
      };

      try {
        const result = await sendFormData(formData);
        console.log("Form submitted successfully:", result);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [nameInputValue, emailInputValue, phoneInputValue, textareaInputValue]
  );

  return (
    <div className={styles.firm}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.firmInfo}
      >
        <h1>System dla placówki medycznej</h1>
        <div className={styles.firmInfoDescription}>
          <div className={styles.firmInfoDescriptionLeft}>
            <p>
              Korzystaj z kalendarza online, promuj swoją markę, przyciągaj
              nowych pacjentów i zatrzymuj starych, dostarczając doskonałe
              cyfrowe doświadczenia pacjenta. Automatyzacja rezerwacji wizyt
              zmniejsza czas oczekiwania i zwiększa zadowolenie pacjentów.
            </p>
            <p>
              Inwestując w nowoczesne rozwiązania cyfrowe, nie tylko podnosisz
              standard swojej praktyki, ale także pokazujesz pacjentom,
              <br /> że jesteś na bieżąco z najnowszymi trendami w medycynie
            </p>

            <a href="mailto:dhaurylkevich@edu.cdv.pl">
              Skontaktuj się z administratorem
            </a>
          </div>
          <div className={styles.firmInfoDescriptionright}>
            <img src={imgfirstBlock2} className={styles.firstBlockImgOne} />
            <img src={imgfirstBlock1} className={styles.firstBlockImgTwo} />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className={styles.aboutMe}
      >
        <h1>Dlaczego MójLekarz?</h1>
        <div className={styles.aboutMeItemConteiner}>
          <div className={styles.aboutMeItem}>
            <h2>1</h2>
            <p className={styles.aboutMeItemTitle}>Prowadzenie EDM</p>
            <p>
              System umożliwi prowadzenie Elektronicznej Dokumentacji Medycznej
              zgodnie z wymogami systemu ochrony zdrowia.
            </p>
          </div>
          <div className={styles.aboutMeItem}>
            <h2>2</h2>
            <p className={styles.aboutMeItemTitle}>Wystawianie e-recept</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              bibendum pharetra quam, nec cursus purus consectetur vel.
            </p>
          </div>
          <div className={styles.aboutMeItem}>
            <h2>3</h2>
            <p className={styles.aboutMeItemTitle}>Latwe prowadzenie wizyt</p>
            <p>
              Codzienna praca będzie łatwiejsza dzięki stałemu dostępowi do
              wszystkich danych i gotowym szablonom do rejestrowania wywiadów i
              rekomendacji.
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className={styles.priceSliderBlock}
      >
        <h1>
          {" "}
          <p>Otwórz nowe możliwości dla swojej firmy! </p>
          <p>Kup dostęp do naszego portalu i zwiększ swoją efektywność.</p>
        </h1>
        <div className={styles.priceContent}>
          <div className={styles.navPriceSlide}>
            <div
              className={
                priceSliderState == "Dla specjalistów" &&
                styles.navPriceSlideActiveArticle
              }
              onClick={() => setPriceSliderState("Dla specjalistów")}
            >
              Dla specjalistów
            </div>
            <div
              className={
                priceSliderState == "Dla płacówek" &&
                styles.navPriceSlideActiveArticle
              }
              onClick={() => setPriceSliderState("Dla płacówek")}
            >
              Dla płacówek{" "}
            </div>
          </div>
          <div className={styles.sliderContent}>
            <div
              className={`${styles.sliderContentOneBlock} ${
                priceSliderState !== "Dla specjalistów"
                  ? styles.hiddenPrice
                  : ""
              }`}
            >
              <div className={styles.priceTariffCard}>
                <h1>Okres próbny przez 4 dni</h1>
                <p>
                  Zapewnij pacjentom wygodę – udostępnij rejestrację online i
                  przypominaj im o wizytach.
                </p>
                <div className={styles.priceTariffCardPrice}>
                  0<span>zł</span>
                </div>
                <a href="#" className={styles.priceTariffCardBtn}>
                  Rozpocznij
                </a>
                <div className={styles.priceTariffCardSmallText}>
                  {" "}
                  Co zawiera?
                </div>
                <ul>
                  <li>
                    <img src={img5} />
                    Kalendarz wizyt
                  </li>
                  <li>
                    <img src={img7} />
                    Umówienie wizyty online
                  </li>
                  <li>
                    <img src={img8} />
                    Zarządzanie receptami
                  </li>
                  <li>
                    <img src={img9} />
                    Bezpieczeństwo danych
                  </li>
                  <li>
                    <img src={img10} />
                    Wsparcie klienta
                  </li>
                  <li>
                    <img src={img11} />
                    Analityka i raporty
                  </li>
                  <li>
                    <img src={img12} />
                    Dziennik pacjenta
                  </li>
                  <li>
                    <img src={img13} />
                    Przypomnienia o profilaktyce
                  </li>
                </ul>
              </div>
              <div className={styles.priceTariffCard}>
                <h1>Plan &quot;Standart&quot;</h1>
                <p>
                  Zapewnij pacjentom wygodę – udostępnij rejestrację online i
                  przypominaj im o wizytach.
                </p>
                <div className={styles.priceTariffCardPrice}>
                  399<span>zł</span>
                </div>
                <a href="#" className={styles.priceTariffCardBtn}>
                  Wybierz plan
                </a>
                <div className={styles.priceTariffCardSmallText}>
                  {" "}
                  Co zawiera?
                </div>
                <ul>
                  <li>
                    <img src={img5} />
                    Kalendarz wizyt
                  </li>
                  <li>
                    <img src={img7} />
                    Umówienie wizyty online
                  </li>
                  <li>
                    <img src={img8} />
                    Zarządzanie receptami
                  </li>
                  <li>
                    <img src={img9} />
                    Bezpieczeństwo danych
                  </li>
                  <li>
                    <img src={img10} />
                    Wsparcie klienta
                  </li>
                  <li>
                    <img src={img11} />
                    Analityka i raporty
                  </li>
                  <li>
                    <img src={img12} />
                    Dziennik pacjenta
                  </li>
                  <li>
                    <img src={img13} />
                    Przypomnienia o profilaktyce
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={`${styles.sliderContentTwoBlock} ${
                priceSliderState !== "Dla płacówek" ? styles.hiddenPrice : ""
              }`}
            >
              <div className={styles.priceTariffCard}>
                <h1>Okres próbny przez 4 dni</h1>
                <p>
                  Zapewnij pacjentom wygodę – udostępnij rejestrację online i
                  przypominaj im o wizytach.
                </p>
                <div className={styles.priceTariffCardPrice}>
                  0<span>zł</span>
                </div>
                <a href="#" className={styles.priceTariffCardBtn}>
                  Rozpocznij
                </a>
                <div className={styles.priceTariffCardSmallText}>
                  {" "}
                  Co zawiera?
                </div>
                <ul>
                  <li>
                    <img src={img14} />
                    Pozycjonowany profil{" "}
                  </li>
                  <li>
                    <img src={img15} />
                    Zarządzanie umówionymi wizytami
                  </li>
                  <li>
                    <img src={img21} />
                    Analizy i statystyki
                  </li>
                  <li>
                    <img src={img16} />
                    Rejestracja online dla pacjentów{" "}
                  </li>
                  <li>
                    <img src={img17} />
                    System oceny pacjentów
                  </li>
                  <li>
                    <img src={img20} />
                    Bezpieczne przechowywanie danych
                  </li>
                  <li>
                    <img src={img18} />
                    Zarządzanie dokumentacją pacjentów
                  </li>
                  <li>
                    <img src={img19} />
                    Kontakt z pracownikami
                  </li>
                </ul>
              </div>
              <div className={styles.priceTariffCard}>
                <h1>Plan &quot;Premium&quot;</h1>
                <p>
                  Zapewnij pacjentom wygodę – udostępnij rejestrację online i
                  przypominaj im o wizytach.
                </p>
                <div className={styles.priceTariffCardPriceTxt}>
                  Cena kalkulowana indywidualnie w zależności od liczby
                  stanowisk
                </div>
                <a href="#" className={styles.priceTariffCardBtn}>
                  Skontaktuj się z nami{" "}
                </a>
                <div className={styles.priceTariffCardSmallText}>
                  {" "}
                  Co zawiera?
                </div>
                <ul>
                  <li>
                    <img src={img14} />
                    Pozycjonowany profil{" "}
                  </li>
                  <li>
                    <img src={img15} />
                    Zarządzanie umówionymi wizytami
                  </li>
                  <li>
                    <img src={img21} />
                    Analizy i statystyki
                  </li>
                  <li>
                    <img src={img16} />
                    Rejestracja online dla pacjentów{" "}
                  </li>
                  <li>
                    <img src={img17} />
                    System oceny pacjentów
                  </li>
                  <li>
                    <img src={img20} />
                    Bezpieczne przechowywanie danych
                  </li>
                  <li>
                    <img src={img18} />
                    Zarządzanie dokumentacją pacjentów
                  </li>
                  <li>
                    <img src={img19} />
                    Kontakt z pracownikami
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className={styles.block3D}
      >
        <div className={styles.block3DLeft}>
          <img src={cloud} alt="cloud" />
        </div>
        <div className={styles.block3DRight}>
          <h2>Dostępny w chmurze</h2>
          <p>
            Dostępność w chmurze oznacza, że możesz korzystać z programu z
            dowolnego miejsca, o dowolnej porze – wystarczy komputer i
            połączenie z internetem. Zapewniamy najwyższe standardy
            bezpieczeństwa i zgodność z wytycznymi RODO.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className={styles.partners}
      >
        <h1 id="Partnerzy">Partnerzy</h1>
        <div className={styles.partnersIcons}>
          {}
          <PartnersSlider />
        </div>
        <div className={styles.partnersBtn}>
          <a href="#">Dołącz do nas</a>
        </div>
      </motion.div>
      <motion.div
        id="Formuliarz-kontaktowy"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className={styles.formBlockConteiner}
      >
        <div className={styles.formBlock}>
          <h1>Jesteś firmą?</h1>
          <p>Wypełnij formularz kontaktowy i zostań naszym partnerem!</p>
          <form onSubmit={handleSubmit} className={styles.form}>
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
              placeholder="Wpisz email"
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
            <div className={styles.formBtn}>
              <button type="submit">Wyślij</button>
            </div>
          </form>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className={styles.questionBlock}
      >
        <h1>Odpowiedzi na najczęściej zadawane pytania</h1>
        <div className={styles.questionBlockItems}>
          <div
            className={styles.questionBlockItem}
            onClick={() => setQuestionOne(!questionOne)}
          >
            <p>Jak mogę zarejestrować swoją firmę w serwisie MyLekarz?</p>
            <div
              className={`${styles.questionBlockItemText} ${
                questionOne ? styles.show : ""
              }`}
            >
              <p>
                Zarejestruj się, wypełniając formularz dostępny na stronie
                głównej serwisu.
              </p>
            </div>
            <img
              src={vector}
              alt="Toggle"
              className={questionOne ? styles.rotate : ""}
            />
          </div>
          <div
            className={styles.questionBlockItem}
            onClick={() => setQuestionTwo(!questionTwo)}
          >
            <p>Jak działa kalendarz online?</p>
            <div
              className={`${styles.questionBlockItemText} ${
                questionTwo ? styles.show : ""
              }`}
            >
              <p>
                Pozwala na umawianie wizyt oraz zarządzanie terminami w czasie
                rzeczywistym.
              </p>
            </div>
            <img
              src={vector}
              alt="Toggle"
              className={questionTwo ? styles.rotate : ""}
            />
          </div>
          <div
            className={styles.questionBlockItem}
            onClick={() => setQuestionThree(!questionThree)}
          >
            <p>Czy Elektroniczna Dokumentacja Medyczna jest bezpieczna?</p>
            <div
              className={`${styles.questionBlockItemText} ${
                questionThree ? styles.show : ""
              }`}
            >
              <p>Tak, dane są szyfrowane i zgodne z przepisami RODO.</p>
            </div>
            <img
              src={vector}
              alt="Toggle"
              className={questionThree ? styles.rotate : ""}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Firm;
