import home from "../assets/img/sidebar-home.png";
import calendar from "../assets/img/sidebar-calendar.png";
import list from "../assets/img/sidebar-list.png";
import recept from "../assets/img/sidebar-recepy.png";
import notifications from "../assets/img/sidebar-notefictions.png";
import chat from "../assets/img/c.png";
import settings from "../assets/img/sidebar-settings.png";
import { pageConfig } from "../config/config";

const sbLinks = [
  //doctorLinks
  {
    role: "doctor",
    title: "Główna",
    img: home,
    url: "/",
  },
  {
    role: "doctor",
    title: "Kalendarz",
    img: calendar,
    url: "/calendar",
  },
  {
    role: "doctor",
    title: "Lista pacjentów",
    img: list,
    url: "/list",
  },
  {
    role: "doctor",
    title: "Recepty",
    img: recept,
    url: "/recipes",
  },
  {
    role: "doctor",
    title: "Wiadomości",
    img: notifications,
    url: "/notifications",
  },
  {
    role: "doctor",
    title: "Czat",
    img: chat,
    url: "/chat",
  },
  {
    role: "doctor",
    title: "Ustawienia",
    img: settings,
    url: "/settings",
  },

  //adminLinks
  {
    role: "admin",
    title: "Główna",
    img: home,
    url: "/",
  },
  {
    role: "admin",
    title: "Dodanie firmy",
    img: home,
    url: "/add-firm",
  },
  {
    role: "admin",
    title: "Bazy Danych",
    img: list,
    url: "/database",
  },
  {
    role: "admin",
    title: "Generowanie raportów",
    img: recept,
    url: "/reports",
  },
  {
    role: "admin",
    title: "Opinia",
    img: notifications,
    url: "/reviews",
  },

  {
    role: "admin",
    title: "Statystyki",
    img: chat,
    url: "/statistic",
  },
  {
    role: "admin",
    title: "Nowości",
    img: chat,
    url: "/news",
  },
  {
    role: "admin",
    title: "Czat",
    img: chat,
    url: "/chat",
  },
  {
    role: "admin",
    title: "Ustawienia",
    img: settings,
    url: "/settings",
  },

  //firmLinks
  {
    role: "firm",
    title: "Główna",
    img: home,
    url: "/",
  },
  {
    role: "firm",
    title: "Kalendarz",
    img: calendar,
    url: "/calendar",
  },
  {
    role: "firm",
    title: "Zarządzanie grafikiem pracy",
    img: list,
    url: "/graph",
  },
  {
    role: "firm",
    title: "Lista pacjentów",
    img: list,
    url: "/patients",
  },
  {
    role: "firm",
    title: "Pracownicy",
    img: list,
    url: "/workers",
  },
  {
    role: "firm",
    title: "Zarządzanie firmą",
    img: recept,
    url: "/management",
  },

  {
    role: "firm",
    title: "Wiadomości",
    img: notifications,
    url: pageConfig.firm.notifications,
  },
  {
    role: "firm",
    title: "Ustawienia",
    img: settings,
    url: pageConfig.firm.settings,
  },
];

export default sbLinks;
