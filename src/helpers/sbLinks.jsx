import addingFirm from "@assets/img/addFirm.png";
import calendarManage from "@assets/img/CalendarManage.png";
import firm from "@assets/img/FirmIco.png";
import list from "@assets/img/list.png";
import news from "@assets/img/NewsIco.png";
import reports from "@assets/img/ReportsIco.png";
import reviews from "@assets/img/ReviewsIco.png";
import calendar from "@assets/img/sidebar-calendar.png";
import home from "@assets/img/sidebar-home.png";
import recept from "@assets/img/sidebar-recepy.png";
import settings from "@assets/img/sidebar-settings.png";
import stetoskop from "@assets/img/stetoskop.png";

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
  // {
  //   role: "doctor",
  //   title: "Wiadomości",
  //   img: notifications,
  //   url: "/notifications",
  // },
  {
    role: "doctor",
    title: "Ustawienia",
    img: settings,
    url: "/settings",
  },

  //firmLinks
  {
    role: "clinic",
    title: "Główna",
    img: home,
    url: "/",
  },
  {
    role: "clinic",
    title: "Kalendarz",
    img: calendar,
    url: "/calendar",
  },
  {
    role: "clinic",
    title: "Grafik pracy",
    img: calendarManage,
    url: "/graph",
  },
  {
    role: "clinic",
    title: "Pracownicy",
    img: stetoskop,
    url: "/workers",
  },
  {
    role: "clinic",
    title: "Lista pacjentów",
    img: list,
    url: "/patients",
  },

  {
    role: "clinic",
    title: "Zarządzanie firmą",
    img: firm,
    url: "/management",
  },

  // {
  //   role: "clinic",
  //   title: "Wiadomości",
  //   img: notifications,
  //   url: pageConfig.firm.notifications,
  // },

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
  // {
  //   role: "admin",
  //   title: "Bazy Danych",
  //   img: table,
  //   url: "/database",
  // },
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

  // {
  //   role: "admin",
  //   title: "Statystyki",
  //   img: stats,
  //   url: "/statistic",
  // },
  {
    role: "admin",
    title: "Nowości",
    img: news,
    url: "/blogs",
  },
  // {
  //   role: "admin",
  //   title: "Czat",
  //   img: chat,
  //   url: "/chat",
  // },
  {
    role: "admin",
    title: "Ustawienia",
    img: settings,
    url: "/settings",
  },
];

export default sbLinks;
