import styles from "./Policy.module.css";

function PolicyRegulamin() {
  return (
    <div className={styles.policyBlock}>
      <h1>Regulamin</h1>
      <div className={styles.policyText}>
        <p>
          Serwis MyLekarz to platforma umożliwiająca rejestrację placówek
          medycznych, zarządzanie wizytami oraz dostęp do elektronicznej
          dokumentacji medycznej. Korzystanie z serwisu oznacza akceptację
          niniejszego regulaminu.
        </p>
        <p>
          Korzystanie z serwisu wymaga rejestracji konta. Placówki medyczne mogą
          założyć konto poprzez wypełnienie formularza kontaktowego i
          weryfikację przez administratora serwisu. Użytkownik zobowiązany jest
          do podania prawdziwych danych oraz ich aktualizacji w razie potrzeby.
        </p>
        <p>
          Serwis umożliwia placówkom medycznym zarządzanie harmonogramem pracy,
          rejestrację pacjentów, wystawianie e-recept oraz dostęp do
          elektronicznej dokumentacji medycznej. Pacjenci mogą umawiać wizyty,
          przeglądać historię leczenia oraz otrzymywać powiadomienia o wizytach
          i lekach.
        </p>
        <p>
          MyLekarz zapewnia bezpieczeństwo danych zgodnie z obowiązującymi
          przepisami prawa. Dane użytkowników są przechowywane w sposób zgodny z
          RODO i nie są udostępniane podmiotom trzecim bez zgody użytkownika.
        </p>
        <p>
          Administrator serwisu dokłada wszelkich starań, aby platforma działała
          bez zakłóceń, jednak nie ponosi odpowiedzialności za błędy systemowe,
          przerwy techniczne oraz nieautoryzowany dostęp do kont użytkowników
          wynikający z zaniedbania haseł. Placówki medyczne i lekarze są
          odpowiedzialni za prawidłowe prowadzenie dokumentacji i przestrzeganie
          obowiązujących przepisów prawa.
        </p>
        <p>
          Administrator serwisu zastrzega sobie prawo do wprowadzania zmian w
          regulaminie. Użytkownicy zostaną poinformowani o każdej zmianie z
          odpowiednim wyprzedzeniem. Korzystanie z serwisu po zmianie regulaminu
          oznacza jego akceptację. W przypadku pytań lub problemów użytkownicy
          mogą skontaktować się z działem wsparcia technicznego.
        </p>
        <p>
          Użytkownicy mają prawo do zgłaszania problemów technicznych oraz
          reklamacji dotyczących działania serwisu. Zgłoszenia należy kierować
          do działu wsparcia technicznego poprzez formularz kontaktowy lub czat
          w aplikacji. Administrator serwisu zobowiązuje się do rozpatrzenia
          zgłoszenia w ciągu 14 dni roboczych.
        </p>
        <p>
          Użytkownik zobowiązuje się do korzystania z serwisu zgodnie z
          obowiązującym prawem, regulaminem oraz zasadami etyki zawodowej.
          Zabronione jest umieszczanie w serwisie treści o charakterze
          obraźliwym, niezgodnym z prawem lub naruszającym dobra osobiste innych
          użytkowników.
        </p>
        <p>
          Administrator serwisu ma prawo do usunięcia konta użytkownika w
          przypadku naruszenia regulaminu, w tym podania fałszywych danych,
          niewłaściwego korzystania z serwisu lub podejmowania działań
          zagrażających bezpieczeństwu platformy. Użytkownik może również
          samodzielnie zrezygnować z korzystania z serwisu i zażądać usunięcia
          swojego konta poprzez kontakt z administracją.
        </p>
        <p>
          Wszelkie spory wynikające z korzystania z serwisu MyLekarz podlegają
          przepisom prawa obowiązującego w kraju, w którym zarejestrowana jest
          firma zarządzająca serwisem. W przypadku sporów strony zobowiązują się
          do ich polubownego rozwiązania, a jeśli to niemożliwe, sprawa może
          zostać skierowana do właściwego sądu.
        </p>
      </div>
    </div>
  );
}
export default PolicyRegulamin;
