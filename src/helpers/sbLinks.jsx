import home from "../assets/img/sidebar-home.png";
import calendar from "../assets/img/sidebar-calendar.png";
import list from "../assets/img/list.png";
import recept from "../assets/img/sidebar-recepy.png";
import notifications from "../assets/img/sidebar-notefictions.png";
import chat from "../assets/img/chat.png";
import settings from "../assets/img/sidebar-settings.png";
import stetoskop from "../assets/img/stetoskop.png";
import calendarManage from "../assets/img/calendarManage.png";
import firm from "../assets/img/firmIco.png";
import addingFirm from "../assets/img/addFirm.png";
import table from "../assets/img/tableIco.png";
import news from "../assets/img/NewsIco.png";
import stats from "../assets/img/StatsIco.png";
import reports from "../assets/img/ReportsIco.png";
import reviews from "../assets/img/ReviewsIco.png";
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
    img: calendarManage,
    url: "/graph",
  },
  {
    role: "firm",
    title: "Pracownicy",
    img: stetoskop,
    url: "/workers",
  },
  {
    role: "firm",
    title: "Lista pacjentów",
    img: list,
    url: "/patients",
  },

  {
    role: "firm",
    title: "Zarządzanie firmą",
    img: firm,
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
    img: addingFirm,
    url: "/add-firm",
  },
  {
    role: "admin",
    title: "Bazy Danych",
    img: table,
    url: "/database",
  },
  {
    role: "admin",
    title: "Raporty",
    img: reports,
    url: "/reports",
  },
  {
    role: "admin",
    title: "Opinia",
    img: reviews,
    url: "/reviews",
  },

  {
    role: "admin",
    title: "Statystyki",
    img: stats,
    url: "/statistic",
  },
  {
    role: "admin",
    title: "Nowości",
    img: news,
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
];

export default sbLinks;
