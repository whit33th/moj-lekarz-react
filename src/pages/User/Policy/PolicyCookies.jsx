import React from "react";
import styles from "./Policy.module.css";

function PolicyCookies() {
  return (
    <div className={styles.policyBlock}>
      <h1>Polityka cookies</h1>
      <div className={styles.policyText}>
        <p>
          Nasz serwis internetowy wykorzystuje pliki cookies, aby zapewnić
          użytkownikom najlepsze doświadczenie podczas korzystania ze strony.
          Pliki cookies to niewielkie pliki tekstowe zapisywane na urządzeniu
          użytkownika, które pomagają w prawidłowym funkcjonowaniu strony,
          analizie ruchu oraz dostosowaniu treści do preferencji użytkownika.
        </p>
        <p>
          W naszym serwisie stosujemy różne rodzaje plików cookies. Niezbędne
          pliki cookies odpowiadają za podstawowe funkcje strony, takie jak
          logowanie czy zapamiętywanie ustawień użytkownika. Analityczne cookies
          pomagają nam monitorować ruch na stronie i ulepszać jej działanie, a
          marketingowe cookies umożliwiają dopasowanie reklam do zainteresowań
          użytkowników.
        </p>
        <p>
          Użytkownik może zarządzać ustawieniami cookies w swojej przeglądarce
          internetowej, blokując ich zapisywanie lub usuwając już zapisane
          pliki. Należy jednak pamiętać, że wyłączenie niektórych cookies może
          wpłynąć na funkcjonalność serwisu. Szczegółowe informacje na temat
          sposobu zarządzania plikami cookies można znaleźć w ustawieniach
          przeglądarki internetowej.
        </p>
        <p>
          Korzystając z naszego serwisu, użytkownik wyraża zgodę na używanie
          plików cookies zgodnie z niniejszą polityką. Jeśli nie wyraża zgody,
          zaleca się zmianę ustawień przeglądarki lub zaprzestanie korzystania z
          serwisu.
        </p>
      </div>
    </div>
  );
}
export default PolicyCookies;
