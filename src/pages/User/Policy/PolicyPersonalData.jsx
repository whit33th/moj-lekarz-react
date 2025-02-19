import styles from "./Policy.module.css";

function PolicyPersonalData() {
  return (
    <div className={styles.policyBlock}>
      <h1>Polityka przetwarzania danych osobowych</h1>
      <div className={styles.policyText}>
        <p>
          Administratorem danych osobowych użytkowników serwisu MyLekarz jest
          [Nazwa firmy], z siedzibą w [Adres], wpisana do [Rejestr] pod numerem
          [Numer rejestrowy]. Kontakt z administratorem jest możliwy pod adresem
          e-mail [Email kontaktowy].
        </p>
        <p>
          Przetwarzamy dane osobowe niezbędne do świadczenia usług, w tym: imię
          i nazwisko, PESEL, adres e-mail, numer telefonu, dane medyczne (jeśli
          użytkownik korzysta z usług zdrowotnych), historię wizyt oraz dane do
          logowania.
        </p>
        <p>
          Dane osobowe są przetwarzane w celu: realizacji usług świadczonych
          przez serwis (np. umawianie wizyt, wystawianie e-recept), zapewnienia
          bezpieczeństwa i poprawnego funkcjonowania platformy, obsługi zgłoszeń
          i reklamacji, realizacji obowiązków wynikających z przepisów prawa,
          prowadzenia analiz statystycznych i usprawniania działania serwisu.
        </p>
        <p>
          Dane przetwarzane są na podstawie: zgody użytkownika (np. zapis do
          newslettera), konieczności wykonania umowy (np. umawianie wizyt),
          obowiązków prawnych (np. przechowywanie dokumentacji medycznej),
          uzasadnionego interesu administratora (np. poprawa jakości usług).
        </p>
        <p>
          Dane są przechowywane tak długo, jak jest to niezbędne do realizacji
          celów, dla których zostały zebrane, lub zgodnie z obowiązującymi
          przepisami prawa. Po upływie tego okresu dane zostaną usunięte lub
          zanonimizowane.
        </p>
        <p>
          Dane mogą być udostępniane: podmiotom współpracującym (np. placówkom
          medycznym, dostawcom usług IT), organom państwowym, jeśli wynika to z
          przepisów prawa, w ramach rozwiązań technicznych umożliwiających
          świadczenie usług (np. serwery, systemy płatności).
        </p>
        <p>
          Każdy użytkownik ma prawo do: dostępu do swoich danych, sprostowania
          danych, usunięcia danych (prawo do bycia zapomnianym), ograniczenia
          przetwarzania, sprzeciwu wobec przetwarzania, przeniesienia danych,
          wycofania zgody na przetwarzanie danych (jeśli było ono oparte na
          zgodzie). W celu realizacji powyższych praw należy skontaktować się z
          administratorem danych.
        </p>
        <p>
          Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony
          danych przed nieuprawnionym dostępem, utratą czy nieautoryzowaną
          modyfikacją.
        </p>
        <p>
          Administrator ma prawo do aktualizacji polityki przetwarzania danych.
          Zmiany zostaną opublikowane w serwisie, a użytkownicy zostaną o nich
          poinformowani w odpowiedni sposób. W razie pytań dotyczących ochrony
          danych osobowych prosimy o kontakt.
        </p>
      </div>
    </div>
  );
}
export default PolicyPersonalData;
