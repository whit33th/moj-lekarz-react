import home from '../assets/img/sidebar-home.png'
import calendar from '../assets/img/sidebar-calendar.png'
import list from '../assets/img/sidebar-list.png'
import recept from '../assets/img/sidebar-recepy.png'
import notifications from '../assets/img/sidebar-notefictions.png'
import chat from '../assets/img/c.png'
import settings from '../assets/img/sidebar-settings.png'

const sbLinks = [

    //doctorLinks
    {
        role: "doctor",
        title: "Glowna",
        img: home,
        url: "/"
    },
    {
        role: "doctor",
        title: "Kalendarz",
        img: calendar,
        url: "/calendar"
    },
    {
        role: "doctor",
        title: "Lista pacjętów",
        img: list,
        url: "/list"
    },
    {
        role: "doctor",
        title: "Recepty",
        img: recept,
        url: "/recipes"
    },
    {
        role: "doctor",
        title: "Wiadomości",
        img: notifications,
        url: "/notifications"
    },
    {
        role: "doctor",
        title: "Czat",
        img: chat,
        url: "/chat"
    },
    {
        role: "doctor",
        title: "Ustawienia",
        img: settings,
        url: "/settings"
    },

    //adminLinks
    {
        role: "admin",
        title: "Glowna",
        img: home,
        url: "/"
    },
    {
        role: "admin",
        title: "Bazy Danych",
        img: list,
        url: "/database"
    },
    {
        role: "admin",
        title: "Generowanie raportów",
        img: recept,
        url: "/reports"
    },
    {
        role: "admin",
        title: "Opinia",
        img: notifications,
        url: "/feedback"
    },

    {
        role: "admin",
        title: "Statystyki",
        img: chat,
        url: "/database"
    },
    {
        role: "admin",
        title: "Nowości",
        img: chat,
        url: "/news"
    },
    {
        role: "admin",
        title: "Czat",
        img: chat,
        url: "/chat"
    },
    {
        role: "admin",
        title: "Ustawienia",
        img: settings,
        url: "/settings"
    },

    //firmLinks
    {
        role: "firm",
        title: "Glowna",
        img: home,
        url: "/"
    },
    {
        role: "firm",
        title: "Pracowniсy",
        img: list,
        url: "/workers"
    },
    {
        role: "firm",
        title: "Zarządzanie firmą",
        img: recept,
        url: "/firm-management"
    },
    {
        role: "firm",
        title: "Wiadomości",
        img: notifications,
        url: "/notification"
    },
    {
        role: "firm",
        title: "Czat",
        img: chat,
        url: "/"
    },
    {
        role: "firm",
        title: "Ustawienia",
        img: settings,
        url: "/settings"
    },
]

export default sbLinks
